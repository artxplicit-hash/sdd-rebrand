import { fetchCategories, fetchProducts } from './api.js';

const STORE_UUID = 'cbcd1a2c-836e-44e5-bb2f-75e29b9e857c';
const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzgzNjk0MTY2LCJqdGkiOiIxOTJkZWE5MjkwOTg0NjBmYWJmYmE5NzRjMzQ1ZDk0NCIsInVzZXJfaWQiOjE5NjYyNDkyLCJoYXNfcGFzc3dvcmRfc2V0Ijp0cnVlLCJlbWFpbCI6ImluZm9Ac3BlY2lhbHR5ZGQuY2EiLCJ1c2VyX2FjdGl2ZSI6dHJ1ZSwidXNlcl9lbWFpbF92ZXJpZmllZCI6bnVsbCwidXNlcm5hbWUiOiJpbmZvQHNwZWNpYWx0eWRkLmNhIiwiYnV5ZXJfaWQiOjE5NTgyNzA3LCJzZWxsZXJfaWQiOjk4NTU4MTgsInBpbG90X2lkIjo1NTMyMzE4LCJ2ZW5kb3JfaWQiOm51bGwsImJ1eWVyX3V1aWQiOiI1ZTdjZjExMC04OGYzLTQ1MWYtYWY1OC0yNWJmM2JlNzk1NTYiLCJzZWxsZXJfdXVpZCI6Ijk2YmJhODRjLTdiNDQtNDY0My1hM2M0LTJkOTQ1ZTZmYjFjZSIsInBpbG90X3V1aWQiOiJkNTVjN2YzZC00ODUzLTQxMmYtOTZjMy0zOWI3OTNjMDdiZmMiLCJ2ZW5kb3JfdXVpZCI6bnVsbCwidmVuZG9yX2RhdGUiOm51bGwsIm11bHRpcGxlX3N0b3JlcyI6ZmFsc2UsInN0b3JlX3V1aWRzIjpbImNiY2QxYTJjLTgzNmUtNDRlNS1iYjJmLTc1ZTI5YjllODU3YyJdLCJzdG9yZV9pZHMiOlsxMDI4NTI4ODBdLCJzdGFmZl9pZCI6bnVsbCwic3RvcmVfdHlwZSI6MCwiY3VzdG9tX2RhdGEiOnt9fQ.r_A13l8A1foHRDf7kNMzhVvDlJXN1yOwnqYNJ01NEZs';

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }
});

async function initStorefront() {
    if (!STORE_UUID || !AUTH_TOKEN) {
        console.warn('Dukaan STORE_UUID and AUTH_TOKEN not provided.');
        return;
    }

    const catContainer = document.getElementById('dukaan-categories');
    const prodContainer = document.getElementById('dukaan-products');

    try {
        const categories = await fetchCategories(STORE_UUID, AUTH_TOKEN);
        if (catContainer && categories.length > 0) {
            catContainer.innerHTML = '';
            categories.slice(0, 3).forEach((category) => {
                const card = createCategoryCard(category);
                catContainer.appendChild(card);
                revealObserver.observe(card);
            });
        }
    } catch (error) {
        console.warn('Unable to load categories.', error);
    }

    try {
        const products = await fetchProducts(STORE_UUID, AUTH_TOKEN);
        if (prodContainer && products.length > 0) {
            prodContainer.innerHTML = '';

            const featured = new Map();
            products.forEach((product) => {
                const categoryId = product.categories_data?.[0]?.id || product.category?.id || product.category_id || product.id;
                if (!featured.has(categoryId)) {
                    featured.set(categoryId, product);
                }
            });

            Array.from(featured.values()).slice(0, 4).forEach((product) => {
                const card = createProductCard(product);
                prodContainer.appendChild(card);
                revealObserver.observe(card);
            });
        }
    } catch (error) {
        console.warn('Unable to load products.', error);
    }
}

function createCategoryCard(category) {
    const div = document.createElement('article');
    div.className = 'category-card reveal';

    const description = category.description?.trim() || 'Custom print solutions for business, personal projects, and easy-apply installs.';
    const imageUrl = category.image || './public/premium-biz-cards.png';

    div.innerHTML = `
        <div class="card-img">
            <img src="${imageUrl}" alt="${category.name}">
        </div>
        <div class="card-info">
            <span class="card-kicker">Custom category</span>
            <h3>${category.name}</h3>
            <p>${description}</p>
            <a href="#products" class="card-link">Explore <span aria-hidden="true">→</span></a>
        </div>
    `;

    return div;
}

function createProductCard(product) {
    const div = document.createElement('article');
    div.className = 'product-card reveal';

    const rawPrice = product.discounted_price ?? product.selling_price ?? product.base_price ?? product.price ?? 0;
    const numericPrice = Number(rawPrice);
    const formattedPrice = Number.isFinite(numericPrice) ? `$${numericPrice.toFixed(2)}` : `${rawPrice}`;
    const imageUrl = product.image || product.images?.[0]?.image || './public/premium-biz-cards.png';
    const productLink = product.slug
        ? `https://specialty-decals-design.mydukaan.io/products/${product.slug}`
        : '#contact';

    div.innerHTML = `
        <div class="prod-img">
            <img src="${imageUrl}" alt="${product.name}">
        </div>
        <div class="prod-info">
            <div class="prod-top">
                <span class="pill">Ready to ship</span>
                <span class="price">${formattedPrice}</span>
            </div>
            <h3>${product.name}</h3>
            <div class="prod-footer">
                <p>${product.short_description || 'Premium vinyl graphics with a clean finish and easy application.'}</p>
                <a href="${productLink}" target="_blank" rel="noopener noreferrer" class="btn-sm btn-primary">View Product</a>
            </div>
        </div>
    `;

    return div;
}

const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const expanded = navLinks.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', String(expanded));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

initStorefront();
