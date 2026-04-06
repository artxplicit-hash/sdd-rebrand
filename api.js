// Dukaan API Integration
const API_BASE = 'https://api.mydukaan.io/api';

/**
 * Fetches product categories from Dukaan.
 * Requires Store UUID and Auth Token.
 */
export async function fetchCategories(storeUUID, authToken) {
    try {
        const response = await fetch(`${API_BASE}/product/seller/product-category/?v2=true`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Dukaan API Error:', error);
        return [];
    }
}

/**
 * Fetches products for a specific store.
 */
export async function fetchProducts(storeUUID, authToken) {
    try {
        const response = await fetch(`${API_BASE}/seller-front/${storeUUID}/product-list/`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Dukaan API Error:', error);
        return [];
    }
}
