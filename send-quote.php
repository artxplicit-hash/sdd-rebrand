<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Honeypot anti-spam check
if (!empty($_POST['_gotcha'])) {
    echo json_encode(['success' => true, 'message' => 'Quote request sent successfully.']);
    exit;
}

// Helper to sanitize single-line text
function clean_line($str) {
    return trim(str_replace(["\r", "\n", "\0"], '', (string)$str));
}

$name  = clean_line($_POST['name'] ?? '');
$email = clean_line($_POST['email'] ?? '');
$phone = clean_line($_POST['phone'] ?? '');
$about = trim((string)($_POST['about_the_job'] ?? ''));
$rawSubject = clean_line($_POST['_subject'] ?? 'New Quote Request');

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $about === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields with a valid email address.']);
    exit;
}

$to = 'info@thegraphicsshop.ca';
$fromEmail = 'info@thegraphicsshop.ca';
$subject = $rawSubject . ' — ' . $name;

// Collect quote-specific fields
$fields = [
    'Name'  => $name,
    'Email' => $email,
    'Phone' => $phone !== '' ? $phone : 'Not provided',
];

if (isset($_POST['substrate']) || isset($_POST['quantity']) || isset($_POST['width']) || isset($_POST['length'])) {
    $fields['Quote Type'] = 'Signage & Decals';
    $fields['Substrate']  = clean_line($_POST['substrate'] ?? 'Not specified');
    $fields['Quantity']   = clean_line($_POST['quantity'] ?? '1');
    $fields['Width']      = clean_line($_POST['width'] ?? '') !== '' ? clean_line($_POST['width']) : 'Not specified';
    $fields['Length']     = clean_line($_POST['length'] ?? '') !== '' ? clean_line($_POST['length']) : 'Not specified';
} elseif (isset($_POST['year']) || isset($_POST['make']) || isset($_POST['model'])) {
    $fields['Quote Type'] = 'Vehicle Graphics';
    $fields['Year']       = clean_line($_POST['year'] ?? '');
    $fields['Make']       = clean_line($_POST['make'] ?? '');
    $fields['Model']      = clean_line($_POST['model'] ?? '');
    $fields['Colour']     = clean_line($_POST['colour'] ?? '') !== '' ? clean_line($_POST['colour']) : 'Not specified';
}

// Build HTML email body
$rowsHtml = '';
$plainLines = [];
foreach ($fields as $label => $value) {
    $safeLabel = htmlspecialchars($label, ENT_QUOTES, 'UTF-8');
    $safeValue = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    $rowsHtml .= "<tr><td style='padding:8px 12px;border-bottom:1px solid #2B3139;font-weight:bold;color:#18C3C8;width:140px;'>{$safeLabel}</td><td style='padding:8px 12px;border-bottom:1px solid #2B3139;color:#FFFFFF;'>{$safeValue}</td></tr>";
    $plainLines[] = "{$label}: {$value}";
}

$safeAbout = nl2br(htmlspecialchars($about, ENT_QUOTES, 'UTF-8'));
$plainLines[] = "\nAbout the Job:\n" . $about;

$htmlBody = "<!DOCTYPE html><html><body style='font-family:Arial,sans-serif;background:#16191E;color:#FFFFFF;padding:24px;'>
<div style='max-width:600px;margin:0 auto;background:#2B3139;border-radius:12px;padding:24px;border:1px solid rgba(24,195,200,0.3);'>
    <h2 style='margin-top:0;color:#18C3C8;'>" . htmlspecialchars($rawSubject, ENT_QUOTES, 'UTF-8') . "</h2>
    <table style='width:100%;border-collapse:collapse;background:#16191E;border-radius:8px;overflow:hidden;margin-bottom:20px;'>
        {$rowsHtml}
    </table>
    <h3 style='color:#18C3C8;margin-bottom:8px;'>About the Job</h3>
    <div style='background:#16191E;padding:14px;border-radius:8px;color:#FFFFFF;line-height:1.6;'>{$safeAbout}</div>
</div>
</body></html>";

// Check for optional artwork attachment
$hasAttachment = false;
$attachmentData = '';
$attachmentName = '';
$attachmentType = 'application/octet-stream';

if (isset($_FILES['artwork']) && $_FILES['artwork']['error'] !== UPLOAD_ERR_NO_FILE) {
    if ($_FILES['artwork']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Error uploading artwork file. Please try a smaller file (max 15MB).']);
        exit;
    }

    $maxBytes = 15 * 1024 * 1024;
    if ($_FILES['artwork']['size'] > $maxBytes) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Artwork file exceeds the 15MB size limit.']);
        exit;
    }

    $origName = basename($_FILES['artwork']['name']);
    $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
    $allowedExts = ['pdf', 'ai', 'eps', 'svg', 'png', 'jpg', 'jpeg', 'psd'];
    if (!in_array($ext, $allowedExts, true)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Unsupported file format. Allowed: PDF, AI, EPS, SVG, PNG, JPG, PSD.']);
        exit;
    }

    $rawContent = file_get_contents($_FILES['artwork']['tmp_name']);
    if ($rawContent !== false) {
        $hasAttachment = true;
        $attachmentData = chunk_split(base64_encode($rawContent));
        $attachmentName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $origName);
        if (!empty($_FILES['artwork']['type'])) {
            $attachmentType = clean_line($_FILES['artwork']['type']);
        }
    }
}

$boundaryMixed = '=_Mixed_' . md5((string)microtime(true));
$boundaryAlt   = '=_Alt_' . md5((string)microtime(true) . 'alt');

$headers = [];
$headers[] = "From: The Graphics Shop <{$fromEmail}>";
$headers[] = "Reply-To: \"{$name}\" <{$email}>";
$headers[] = "MIME-Version: 1.0";

if ($hasAttachment) {
    $headers[] = "Content-Type: multipart/mixed; boundary=\"{$boundaryMixed}\"";

    $message  = "--{$boundaryMixed}\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $htmlBody . "\r\n\r\n";

    $message .= "--{$boundaryMixed}\r\n";
    $message .= "Content-Type: {$attachmentType}; name=\"{$attachmentName}\"\r\n";
    $message .= "Content-Disposition: attachment; filename=\"{$attachmentName}\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $message .= $attachmentData . "\r\n";
    $message .= "--{$boundaryMixed}--\r\n";
} else {
    $headers[] = "Content-Type: text/html; charset=UTF-8";
    $headers[] = "Content-Transfer-Encoding: 8bit";
    $message = $htmlBody;
}

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = @mail($to, $encodedSubject, $message, implode("\r\n", $headers), "-f{$fromEmail}");

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your quote request has been sent to info@thegraphicsshop.ca. We will get back to you shortly.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to send quote request right now. Please email us directly at info@thegraphicsshop.ca or call 902 957 6369.'
    ]);
}
