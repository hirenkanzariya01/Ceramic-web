import React, { useEffect, useRef, useState } from 'react';

// ==================== DATA ====================
const productsData = {
  products: [
    { id: 1, name: "Marble Essence Tile", category: "Tiles", price: 89.99, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", description: "Luxurious marble-inspired porcelain tile with subtle veining. Perfect for contemporary spaces seeking timeless elegance.", dimensions: "24x24 inches", material: "Porcelain" },
    { id: 2, name: "Artisan Washbasin", category: "Washbasins", price: 349.99, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80", description: "Handcrafted ceramic washbasin with organic curves and a premium matte finish. Each piece is unique.", dimensions: "18x6 inches", material: "Ceramic" },
    { id: 3, name: "Terracotta Vase Collection", category: "Decorative", price: 129.99, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80", description: "Elegant terracotta vases with modern geometric silhouettes. Available in various earth tones.", dimensions: "12x8 inches", material: "Terracotta" },
    { id: 4, name: "Minimalist Dinner Set", category: "Tableware", price: 189.99, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80", description: "16-piece stoneware dinner set with a refined matte glaze. Perfect for elegant dining experiences.", dimensions: "Service for 4", material: "Stoneware" },
    { id: 5, name: "Geometric Wall Tiles", category: "Tiles", price: 94.99, image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80", description: "Contemporary hexagonal tiles with a subtle texture. Ideal for feature walls and backsplashes.", dimensions: "8x8 inches", material: "Ceramic" },
    { id: 6, name: "Vessel Sink Basin", category: "Washbasins", price: 429.99, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80", description: "Statement vessel sink with artisanal glazing techniques. A centerpiece for luxury bathrooms.", dimensions: "16x16x6 inches", material: "Porcelain" },
    { id: 7, name: "Sculptural Planter", category: "Decorative", price: 79.99, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80", description: "Contemporary ceramic planter with an architectural design. Elevates any indoor plant display.", dimensions: "10x10 inches", material: "Ceramic" },
    { id: 8, name: "Artisan Tea Set", category: "Tableware", price: 159.99, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", description: "Handcrafted tea set featuring organic shapes and a lustrous finish. Includes teapot and four cups.", dimensions: "Teapot: 6x5 inches", material: "Porcelain" },
    { id: 9, name: "Rustic Bowl Set", category: "Tableware", price: 119.99, image: "https://images.unsplash.com/photo-1490312278390-ab64016b5873?w=800&q=80", description: "Set of 4 handmade rustic bowls with earth-tone glazing. Microwave and dishwasher safe.", dimensions: "6x3 inches each", material: "Stoneware" },
    { id: 10, name: "Mosaic Floor Tile", category: "Tiles", price: 74.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", description: "Intricate mosaic pattern for flooring or accent walls. Adds depth and character to any room.", dimensions: "12x12 inches", material: "Ceramic" },
    { id: 11, name: "Ceramic Wall Art", category: "Decorative", price: 219.99, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80", description: "Hand-sculpted ceramic wall panel with abstract organic forms. A statement piece for living spaces.", dimensions: "24x18 inches", material: "Ceramic" },
    { id: 12, name: "Countertop Basin", category: "Washbasins", price: 389.99, image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80", description: "Sleek countertop basin with a flawless white glaze. Pairs beautifully with modern bathroom vanities.", dimensions: "20x14x5 inches", material: "Porcelain" }
  ]
};

const CATEGORIES = ['All', 'Tiles', 'Washbasins', 'Decorative', 'Tableware'];

// ==================== STYLES ====================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');
  html, body, #root { width: 100%; height: 100%; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Poppins', sans-serif; background: #faf9f7; color: #2c2c2c; overflow-x: hidden; }
  .app { min-height: 100vh; }

  /* NAVBAR */
  .navbar { position: fixed; top: 0; left: 0; right: 0; padding: 1.2rem 5%; display: flex; justify-content: space-between; align-items: center; background: rgba(250,249,247,0.96); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid rgba(0,0,0,0.07); }
  .logo { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #2c2c2c; cursor: pointer; letter-spacing: 1px; }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
  .nav-link { font-size: 0.9rem; font-weight: 400; color: #5a5a5a; cursor: pointer; position: relative; transition: color 0.3s ease; letter-spacing: 0.5px; }
  .nav-link:hover, .nav-link.active { color: #2c2c2c; }
  .nav-link::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: #2c2c2c; transition: width 0.3s ease; }
  .nav-link.active::after, .nav-link:hover::after { width: 100%; }
  .nav-icon-btn { background: none; border: none; cursor: pointer; font-size: 1.1rem; color: #5a5a5a; position: relative; transition: color 0.3s; padding: 0.3rem; }
  .nav-icon-btn:hover { color: #2c2c2c; }
  .badge { background: #2c2c2c; color: #fff; border-radius: 50%; width: 18px; height: 18px; font-size: 0.65rem; display: flex; align-items: center; justify-content: center; position: absolute; top: -6px; right: -6px; font-weight: 600; }
  .menu-toggle { display: none; flex-direction: column; gap: 5px; cursor: pointer; z-index: 1001; background: none; border: none; }
  .menu-toggle span { width: 25px; height: 2px; background: #2c2c2c; transition: all 0.3s ease; display: block; }
  .menu-toggle.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .menu-toggle.open span:nth-child(2) { opacity: 0; }
  .menu-toggle.open span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }

  /* HERO */
  .hero { height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; background: linear-gradient(135deg, #f5f3f0 0%, #e8e6e3 100%); }
  .hero-bg-shape { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: linear-gradient(135deg, rgba(230,225,220,0.3), rgba(200,195,190,0.2)); top: -200px; right: -200px; z-index: 1; }
  .hero-content { text-align: center; z-index: 2; max-width: 900px; padding: 0 2rem; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: 5rem; font-weight: 700; color: #2c2c2c; margin-bottom: 1.5rem; line-height: 1.1; }
  .hero-title > div { overflow: hidden; animation: slideUp 1s ease forwards; opacity: 0; }
  .hero-title > div:nth-child(2) { animation-delay: 0.15s; }
  .hero-subtitle { font-size: 1.2rem; color: #5a5a5a; margin-bottom: 3rem; font-weight: 300; letter-spacing: 1px; line-height: 1.6; animation: fadeIn 1s ease 0.5s forwards; opacity: 0; }
  .hero-btn-group { display: flex; gap: 1rem; justify-content: center; animation: fadeIn 1s ease 0.7s forwards; opacity: 0; flex-wrap: wrap; }
  @keyframes slideUp { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  /* BUTTONS */
  .cta-button { padding: 1rem 2.5rem; background: #2c2c2c; color: #faf9f7; border: none; font-size: 0.9rem; font-weight: 500; cursor: pointer; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s ease; font-family: 'Poppins', sans-serif; }
  .cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); background: #1a1a1a; }
  .cta-button.outline { background: transparent; color: #2c2c2c; border: 2px solid #2c2c2c; }
  .cta-button.outline:hover { background: #2c2c2c; color: #faf9f7; }
  .cta-button.danger { background: #c0392b; }
  .cta-button.sm { padding: 0.6rem 1.4rem; font-size: 0.8rem; }

  /* PRODUCTS */
  .products-section { padding: 7rem 5% 5rem; background: #faf9f7; min-height: 100vh; }
  .section-header { text-align: center; margin-bottom: 3rem; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 3rem; color: #2c2c2c; margin-bottom: 0.5rem; }
  .section-subtitle { color: #5a5a5a; font-size: 1rem; font-weight: 300; }

  /* SEARCH & FILTER */
  .search-filter-bar { display: flex; gap: 1rem; align-items: center; justify-content: center; margin-bottom: 2.5rem; flex-wrap: wrap; }
  .search-input-wrapper { position: relative; flex: 1; max-width: 400px; }
  .search-input { width: 100%; padding: 0.9rem 1rem 0.9rem 2.8rem; border: 1px solid #ddd; background: #fff; font-family: 'Poppins', sans-serif; font-size: 0.9rem; color: #2c2c2c; outline: none; transition: border-color 0.3s; }
  .search-input:focus { border-color: #2c2c2c; }
  .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #999; font-size: 0.9rem; }
  .filter-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; }
  .filter-tab { padding: 0.5rem 1.2rem; border: 1px solid #ddd; background: transparent; font-family: 'Poppins', sans-serif; font-size: 0.82rem; cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px; color: #5a5a5a; }
  .filter-tab:hover, .filter-tab.active { background: #2c2c2c; color: #fff; border-color: #2c2c2c; }

  /* SORT */
  .sort-select { padding: 0.9rem 1rem; border: 1px solid #ddd; background: #fff; font-family: 'Poppins', sans-serif; font-size: 0.85rem; cursor: pointer; outline: none; color: #2c2c2c; }

  /* PRODUCT GRID */
  .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 2.5rem; max-width: 1400px; margin: 0 auto; }
  .product-card { background: #fff; overflow: hidden; cursor: pointer; transition: transform 0.4s ease, box-shadow 0.4s ease; border: 1px solid rgba(0,0,0,0.06); animation: fadeIn 0.5s ease forwards; }
  .product-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
  .product-image-wrapper { width: 100%; height: 300px; overflow: hidden; position: relative; }
  .product-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .product-card:hover .product-image { transform: scale(1.08); }
  .product-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0); display: flex; align-items: center; justify-content: center; gap: 0.8rem; transition: background 0.3s; opacity: 0; }
  .product-card:hover .product-overlay { background: rgba(0,0,0,0.25); opacity: 1; }
  .overlay-btn { padding: 0.6rem 1.2rem; background: #fff; color: #2c2c2c; border: none; font-size: 0.78rem; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; font-family: 'Poppins', sans-serif; font-weight: 500; transition: all 0.2s; }
  .overlay-btn:hover { background: #2c2c2c; color: #fff; }
  .product-info { padding: 1.5rem; }
  .product-category { font-size: 0.78rem; color: #aaa; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.4rem; }
  .product-name { font-family: 'Playfair Display', serif; font-size: 1.35rem; color: #2c2c2c; margin-bottom: 0.5rem; }
  .product-price { font-size: 1.1rem; color: #2c2c2c; font-weight: 600; }
  .wishlist-btn { background: none; border: none; cursor: pointer; font-size: 1.2rem; float: right; margin-top: -0.2rem; transition: transform 0.2s; }
  .wishlist-btn:hover { transform: scale(1.2); }
  .no-results { text-align: center; padding: 4rem; color: #aaa; font-size: 1.1rem; grid-column: 1/-1; }

  /* PRODUCT DETAIL */
  .detail-section { padding: 7rem 5% 5rem; min-height: 100vh; }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; max-width: 1100px; margin: 0 auto; align-items: start; }
  .detail-image { width: 100%; aspect-ratio: 1; object-fit: cover; }
  .detail-info { padding-top: 1rem; }
  .detail-category { font-size: 0.8rem; color: #aaa; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.8rem; }
  .detail-name { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 0.8rem; color: #2c2c2c; }
  .detail-price { font-size: 1.8rem; font-weight: 600; margin-bottom: 1.5rem; color: #2c2c2c; }
  .detail-desc { color: #5a5a5a; line-height: 1.8; margin-bottom: 1.5rem; font-size: 0.95rem; }
  .detail-specs { background: #f5f3f0; padding: 1.5rem; margin-bottom: 2rem; }
  .detail-spec-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #e8e6e3; font-size: 0.9rem; }
  .detail-spec-row:last-child { border-bottom: none; }
  .spec-label { color: #999; font-weight: 300; }
  .spec-value { font-weight: 500; color: #2c2c2c; }
  .qty-selector { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
  .qty-btn { width: 36px; height: 36px; border: 1px solid #ddd; background: #fff; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
  .qty-btn:hover { background: #2c2c2c; color: #fff; border-color: #2c2c2c; }
  .qty-value { font-size: 1.1rem; font-weight: 500; min-width: 30px; text-align: center; }
  .detail-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

  /* CART */
  .cart-section { padding: 7rem 5% 5rem; min-height: 100vh; }
  .cart-layout { display: grid; grid-template-columns: 1fr 350px; gap: 3rem; max-width: 1200px; margin: 0 auto; align-items: start; }
  .cart-item { display: flex; gap: 1.5rem; padding: 1.5rem 0; border-bottom: 1px solid #f0eeeb; }
  .cart-item-img { width: 120px; height: 120px; object-fit: cover; flex-shrink: 0; }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; margin-bottom: 0.3rem; }
  .cart-item-cat { font-size: 0.8rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; }
  .cart-item-price { font-weight: 600; font-size: 1rem; }
  .cart-item-actions { display: flex; align-items: center; gap: 1rem; margin-top: 0.8rem; }
  .cart-summary { background: #f5f3f0; padding: 2rem; position: sticky; top: 100px; }
  .cart-summary h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 1.5rem; }
  .summary-row { display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-size: 0.95rem; color: #5a5a5a; }
  .summary-divider { border: none; border-top: 1px solid #ddd; margin: 1rem 0; }
  .summary-total { display: flex; justify-content: space-between; font-weight: 600; font-size: 1.2rem; color: #2c2c2c; margin-bottom: 1.5rem; }
  .empty-cart { text-align: center; padding: 5rem 2rem; }
  .empty-cart-icon { font-size: 4rem; margin-bottom: 1rem; opacity: 0.3; }
  .empty-cart p { color: #aaa; margin-bottom: 2rem; font-size: 1.1rem; }
  .promo-input-wrapper { display: flex; gap: 0; margin-bottom: 1rem; }
  .promo-input { flex: 1; padding: 0.8rem 1rem; border: 1px solid #ddd; border-right: none; font-family: 'Poppins', sans-serif; font-size: 0.85rem; outline: none; background: #fff; }
  .promo-btn { padding: 0.8rem 1.2rem; background: #2c2c2c; color: #fff; border: none; cursor: pointer; font-size: 0.8rem; font-family: 'Poppins', sans-serif; letter-spacing: 1px; transition: background 0.2s; }
  .promo-btn:hover { background: #1a1a1a; }
  .promo-success { font-size: 0.8rem; color: #27ae60; margin-bottom: 0.5rem; }

  /* WISHLIST */
  .wishlist-section { padding: 7rem 5% 5rem; min-height: 100vh; }

  /* LOGIN */
  .auth-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f5f3f0 0%, #e8e6e3 100%); padding: 2rem; }
  .auth-card { background: #fff; padding: 3.5rem; width: 100%; max-width: 440px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
  .auth-logo { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; text-align: center; margin-bottom: 0.5rem; letter-spacing: 1px; }
  .auth-tagline { text-align: center; color: #aaa; font-size: 0.85rem; margin-bottom: 2.5rem; letter-spacing: 0.5px; }
  .auth-tabs { display: flex; margin-bottom: 2rem; border-bottom: 2px solid #f0eeeb; }
  .auth-tab { flex: 1; padding: 0.8rem; background: none; border: none; font-family: 'Poppins', sans-serif; font-size: 0.9rem; cursor: pointer; color: #aaa; transition: all 0.3s; position: relative; }
  .auth-tab.active { color: #2c2c2c; font-weight: 500; }
  .auth-tab.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: #2c2c2c; }
  .form-group { margin-bottom: 1.4rem; }
  .form-label { display: block; font-size: 0.82rem; color: #5a5a5a; margin-bottom: 0.5rem; letter-spacing: 0.5px; text-transform: uppercase; }
  .form-input { width: 100%; padding: 0.9rem 1rem; border: 1px solid #e0dedd; background: #faf9f7; font-family: 'Poppins', sans-serif; font-size: 0.9rem; color: #2c2c2c; outline: none; transition: border-color 0.3s, background 0.3s; }
  .form-input:focus { border-color: #2c2c2c; background: #fff; }
  .form-error { color: #c0392b; font-size: 0.8rem; margin-top: 0.3rem; }
  .auth-divider { text-align: center; color: #ccc; font-size: 0.85rem; margin: 1.5rem 0; position: relative; }
  .auth-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #e8e6e3; }
  .auth-divider span { background: #fff; padding: 0 1rem; position: relative; }
  .social-btn { width: 100%; padding: 0.9rem; border: 1px solid #e0dedd; background: #fff; font-family: 'Poppins', sans-serif; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.7rem; transition: all 0.2s; color: #2c2c2c; margin-bottom: 0.8rem; }
  .social-btn:hover { border-color: #2c2c2c; background: #faf9f7; }
  .auth-footer-link { text-align: center; font-size: 0.82rem; color: #aaa; margin-top: 1.5rem; cursor: pointer; }
  .auth-footer-link span { color: #2c2c2c; text-decoration: underline; cursor: pointer; }
  .checkbox-wrapper { display: flex; align-items: center; gap: 0.6rem; }
  .checkbox-wrapper input { accent-color: #2c2c2c; }
  .checkbox-wrapper label { font-size: 0.82rem; color: #5a5a5a; cursor: pointer; }

  /* TOAST */
  .toast-container { position: fixed; bottom: 2rem; right: 2rem; z-index: 9999; display: flex; flex-direction: column; gap: 0.8rem; pointer-events: none; }
  .toast { padding: 1rem 1.5rem; background: #2c2c2c; color: #fff; font-size: 0.88rem; min-width: 260px; box-shadow: 0 8px 25px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 0.8rem; animation: toastIn 0.3s ease, toastOut 0.3s ease 2.7s forwards; pointer-events: auto; }
  .toast.success { background: #27ae60; }
  .toast.error { background: #c0392b; }
  .toast.info { background: #2980b9; }
  @keyframes toastIn { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
  @keyframes toastOut { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(100%); } }

  /* ABOUT */
  .about-section { padding: 7rem 5% 5rem; min-height: 100vh; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; max-width: 1100px; margin: 3rem auto 0; align-items: center; }
  .about-img { width: 100%; height: 450px; object-fit: cover; }
  .about-text h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 1.5rem; }
  .about-text p { color: #5a5a5a; line-height: 1.9; margin-bottom: 1rem; font-weight: 300; }
  .about-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1100px; margin: 3rem auto; text-align: center; }
  .stat-card { background: #f5f3f0; padding: 2rem; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #2c2c2c; }
  .stat-label { font-size: 0.82rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.3rem; }
  .values-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; max-width: 1100px; margin: 0 auto; }
  .value-card { padding: 2rem; border: 1px solid #e8e6e3; }
  .value-icon { font-size: 2rem; margin-bottom: 1rem; }
  .value-title { font-family: 'Playfair Display', serif; font-size: 1.2rem; margin-bottom: 0.5rem; }
  .value-desc { font-size: 0.88rem; color: #5a5a5a; line-height: 1.7; }

  /* CONTACT */
  .contact-section { padding: 7rem 5% 5rem; min-height: 100vh; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; max-width: 1100px; margin: 3rem auto 0; align-items: start; }
  .contact-info h3 { font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 1.5rem; }
  .contact-info p { color: #5a5a5a; margin-bottom: 2rem; line-height: 1.8; font-weight: 300; }
  .contact-detail { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.2rem; font-size: 0.9rem; color: #5a5a5a; }
  .contact-detail-icon { width: 40px; height: 40px; background: #f5f3f0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .contact-form { background: #fff; padding: 2.5rem; border: 1px solid #e8e6e3; }
  .contact-form h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 2rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  /* FOOTER */
  .footer { background: #2c2c2c; color: #c8c5c0; padding: 4rem 5% 2rem; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 3rem; margin-bottom: 3rem; }
  .footer-brand .footer-logo { font-family: 'Playfair Display', serif; font-size: 2rem; color: #fff; margin-bottom: 1rem; letter-spacing: 1px; }
  .footer-brand p { font-size: 0.88rem; line-height: 1.8; max-width: 260px; color: #9a9690; font-weight: 300; }
  .footer-social { display: flex; gap: 0.8rem; margin-top: 1.5rem; }
  .social-icon { width: 38px; height: 38px; border: 1px solid #4a4a4a; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; font-size: 0.85rem; color: #9a9690; }
  .social-icon:hover { background: #fff; color: #2c2c2c; border-color: #fff; }
  .footer-col h4 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: #fff; margin-bottom: 1.5rem; }
  .footer-links { list-style: none; }
  .footer-links li { margin-bottom: 0.7rem; font-size: 0.88rem; color: #9a9690; cursor: pointer; transition: color 0.2s; }
  .footer-links li:hover { color: #fff; }
  .newsletter-form { display: flex; gap: 0; margin-top: 0.5rem; }
  .newsletter-input { flex: 1; padding: 0.8rem 1rem; background: #3a3a3a; border: 1px solid #4a4a4a; color: #fff; font-family: 'Poppins', sans-serif; font-size: 0.85rem; outline: none; }
  .newsletter-input::placeholder { color: #6a6a6a; }
  .newsletter-btn { padding: 0.8rem 1.2rem; background: #fff; color: #2c2c2c; border: none; cursor: pointer; font-size: 0.8rem; font-family: 'Poppins', sans-serif; font-weight: 500; letter-spacing: 1px; transition: background 0.2s; }
  .newsletter-btn:hover { background: #e8e6e3; }
  .footer-bottom { border-top: 1px solid #3a3a3a; padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
  .footer-bottom p { font-size: 0.82rem; color: #6a6a6a; }
  .footer-bottom-links { display: flex; gap: 2rem; }
  .footer-bottom-links span { font-size: 0.82rem; color: #6a6a6a; cursor: pointer; transition: color 0.2s; }
  .footer-bottom-links span:hover { color: #fff; }

  /* USER MENU */
  .user-menu-wrapper { position: relative; }
  .user-dropdown { position: absolute; top: calc(100% + 12px); right: 0; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.12); min-width: 180px; z-index: 2000; border: 1px solid #f0eeeb; }
  .user-dropdown-item { padding: 0.8rem 1.2rem; font-size: 0.88rem; color: #5a5a5a; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; gap: 0.6rem; }
  .user-dropdown-item:hover { background: #faf9f7; color: #2c2c2c; }
  .user-dropdown-item.danger { color: #c0392b; }
  .user-avatar { width: 32px; height: 32px; background: #2c2c2c; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.85rem; font-weight: 600; cursor: pointer; }

  /* CHECKOUT SUCCESS */
  .success-page { text-align: center; padding: 8rem 2rem; }
  .success-icon { font-size: 4rem; margin-bottom: 1.5rem; }
  .success-page h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 1rem; }
  .success-page p { color: #5a5a5a; margin-bottom: 2rem; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 1.7; }

  /* SCROLL TO TOP */
  .scroll-top { position: fixed; bottom: 2rem; left: 2rem; width: 44px; height: 44px; background: #2c2c2c; color: #fff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; z-index: 999; transition: all 0.3s; opacity: 0; pointer-events: none; }
  .scroll-top.visible { opacity: 1; pointer-events: auto; }
  .scroll-top:hover { background: #1a1a1a; transform: translateY(-3px); }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .detail-grid, .about-grid, .contact-grid { grid-template-columns: 1fr; }
    .cart-layout { grid-template-columns: 1fr; }
    .cart-summary { position: static; }
  }
  @media (max-width: 768px) {
    .hero-title { font-size: 3rem; }
    .section-title { font-size: 2.2rem; }
    .products-grid { grid-template-columns: 1fr; gap: 1.5rem; }
    .menu-toggle { display: flex; }
    .nav-links { position: fixed; top: 0; right: -100%; height: 100vh; width: 70%; flex-direction: column; padding: 5rem 2rem; gap: 2rem; background: #faf9f7; transition: right 0.4s ease; box-shadow: -5px 0 20px rgba(0,0,0,0.1); z-index: 999; }
    .nav-links.open { right: 0; }
    .nav-icons { display: none; }
    .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
    .about-stats, .values-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .footer-bottom { flex-direction: column; text-align: center; }
  }
`;

// ==================== TOAST ====================
const ToastContainer = ({ toasts }) => (
  <div className="toast-container">
    {toasts.map(t => (
      <div key={t.id} className={`toast ${t.type}`}>
        <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}</span>
        {t.message}
      </div>
    ))}
  </div>
);

// ==================== NAVBAR ====================
const Navbar = ({ activePage, setActivePage, cart, wishlist, user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const handleNavClick = (page) => { setActivePage(page); setMenuOpen(false); window.scrollTo(0, 0); };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => handleNavClick('home')}>CERAMIQUE</div>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {['Home', 'Products', 'About', 'Contact'].map(item => (
          <li key={item} className={`nav-link ${activePage === item.toLowerCase() ? 'active' : ''}`} onClick={() => handleNavClick(item.toLowerCase())}>{item}</li>
        ))}
        {!user && <li className={`nav-link ${activePage === 'login' ? 'active' : ''}`} onClick={() => handleNavClick('login')}>Login</li>}
      </ul>
      <div className="nav-icons" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="nav-icon-btn" onClick={() => handleNavClick('wishlist')} title="Wishlist">
          ♡ {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
        </button>
        <button className="nav-icon-btn" onClick={() => handleNavClick('cart')} title="Cart">
          🛒 {cart.length > 0 && <span className="badge">{cart.reduce((a, i) => a + i.qty, 0)}</span>}
        </button>
        {user ? (
          <div className="user-menu-wrapper">
            <div className="user-avatar" onClick={() => setUserDropdown(!userDropdown)}>{user.name[0].toUpperCase()}</div>
            {userDropdown && (
              <div className="user-dropdown">
                <div className="user-dropdown-item" style={{ borderBottom: '1px solid #f0eeeb', fontWeight: 500, color: '#2c2c2c' }}>👤 {user.name}</div>
                <div className="user-dropdown-item" onClick={() => { handleNavClick('orders'); setUserDropdown(false); }}>📦 My Orders</div>
                <div className="user-dropdown-item" onClick={() => { handleNavClick('wishlist'); setUserDropdown(false); }}>♡ Wishlist ({wishlist.length})</div>
                <div className="user-dropdown-item danger" onClick={() => { onLogout(); setUserDropdown(false); }}>🚪 Sign Out</div>
              </div>
            )}
          </div>
        ) : (
          <button className="cta-button sm" onClick={() => handleNavClick('login')}>Sign In</button>
        )}
      </div>
      <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
};

// ==================== HERO ====================
const Hero = ({ setActivePage }) => (
  <section className="hero">
    <div className="hero-bg-shape"></div>
    <div className="hero-content">
      <h1 className="hero-title"><div>Luxury Ceramic</div><div>Collection</div></h1>
      <p className="hero-subtitle">Handcrafted excellence meets timeless design.<br />Discover our premium collection of artisanal ceramics.</p>
      <div className="hero-btn-group">
        <button className="cta-button" onClick={() => setActivePage('products')}>Explore Collection</button>
        <button className="cta-button outline" onClick={() => setActivePage('about')}>Our Story</button>
      </div>
    </div>
  </section>
);

// ==================== PRODUCTS ====================
const Products = ({ setActivePage, setSelectedProduct, cart, setCart, wishlist, setWishlist, addToast }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  const handleProductClick = (product) => { setSelectedProduct(product); setActivePage('detail'); window.scrollTo(0, 0); };

  const handleAddToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      setCart(cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    addToast(`${product.name} added to cart`, 'success');
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(w => w.id === product.id)) {
      setWishlist(wishlist.filter(w => w.id !== product.id));
      addToast(`Removed from wishlist`, 'info');
    } else {
      setWishlist([...wishlist, product]);
      addToast(`Added to wishlist`, 'success');
    }
  };

  let filtered = productsData.products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="products-section">
      <div className="section-header">
        <h2 className="section-title">Our Collection</h2>
        <p className="section-subtitle">Curated pieces that elevate every space</p>
      </div>
      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input className="search-input" type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>
      <div className="filter-tabs" style={{ marginBottom: '2.5rem' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} className={`filter-tab ${category === cat ? 'active' : ''}`} onClick={() => setCategory(cat)}>{cat}</button>
        ))}
      </div>
      <div className="products-grid">
        {filtered.length === 0 && <div className="no-results">No products found for "{search}"</div>}
        {filtered.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-overlay">
                <button className="overlay-btn" onClick={() => handleProductClick(product)}>View Details</button>
                <button className="overlay-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
            <div className="product-info">
              <p className="product-category">{product.category}</p>
              <h3 className="product-name">{product.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="product-price">${product.price}</p>
                <button className="wishlist-btn" onClick={() => toggleWishlist(product)} title="Add to Wishlist">
                  {wishlist.find(w => w.id === product.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== PRODUCT DETAIL ====================
const ProductDetail = ({ product, setActivePage, cart, setCart, wishlist, setWishlist, addToast }) => {
  const [qty, setQty] = useState(1);
  if (!product) return null;

  const handleAddToCart = () => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      setCart(cart.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i));
    } else {
      setCart([...cart, { ...product, qty }]);
    }
    addToast(`${product.name} (×${qty}) added to cart`, 'success');
  };

  const inWishlist = wishlist.find(w => w.id === product.id);
  const toggleWishlist = () => {
    if (inWishlist) { setWishlist(wishlist.filter(w => w.id !== product.id)); addToast('Removed from wishlist', 'info'); }
    else { setWishlist([...wishlist, product]); addToast('Added to wishlist', 'success'); }
  };

  const related = productsData.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <section className="detail-section">
      <button className="cta-button outline sm" style={{ marginBottom: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setActivePage('products')}>← Back</button>
      <div className="detail-grid">
        <img src={product.image} alt={product.name} className="detail-image" />
        <div className="detail-info">
          <p className="detail-category">{product.category}</p>
          <h2 className="detail-name">{product.name}</h2>
          <p className="detail-price">${product.price}</p>
          <p className="detail-desc">{product.description}</p>
          <div className="detail-specs">
            <div className="detail-spec-row"><span className="spec-label">Material</span><span className="spec-value">{product.material}</span></div>
            <div className="detail-spec-row"><span className="spec-label">Dimensions</span><span className="spec-value">{product.dimensions}</span></div>
            <div className="detail-spec-row"><span className="spec-label">Availability</span><span className="spec-value" style={{ color: '#27ae60' }}>In Stock</span></div>
          </div>
          <div className="qty-selector">
            <span style={{ fontSize: '0.85rem', color: '#5a5a5a', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Quantity</span>
            <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span className="qty-value">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <div className="detail-actions">
            <button className="cta-button" onClick={handleAddToCart}>Add to Cart</button>
            <button className="cta-button outline" onClick={toggleWishlist}>{inWishlist ? '❤️ Saved' : '♡ Wishlist'}</button>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div style={{ maxWidth: '1100px', margin: '4rem auto 0' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '2rem' }}>You May Also Like</h3>
          <div className="products-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {related.map(p => (
              <div key={p.id} className="product-card" onClick={() => { setActivePage('detail'); window.scrollTo(0,0); }} style={{ cursor: 'pointer' }}>
                <div className="product-image-wrapper"><img src={p.image} alt={p.name} className="product-image" /></div>
                <div className="product-info">
                  <p className="product-category">{p.category}</p>
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">${p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// ==================== CART ====================
const Cart = ({ cart, setCart, setActivePage, addToast, user }) => {
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQty = (id, delta) => {
    setCart(cart.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const remove = (id) => { setCart(cart.filter(i => i.id !== id)); addToast('Item removed from cart', 'info'); };

  const subtotal = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = subtotal > 300 ? 0 : 25;
  const discountAmt = subtotal * discount;
  const total = subtotal - discountAmt + shipping;

  const applyPromo = () => {
    if (promo.toUpperCase() === 'CERAMIQUE10') { setDiscount(0.1); setPromoMsg('✓ 10% discount applied!'); }
    else if (promo.toUpperCase() === 'FREESHIP') { setPromoMsg('✓ Free shipping applied!'); }
    else { setPromoMsg(''); addToast('Invalid promo code', 'error'); }
  };

  const handleCheckout = () => {
    if (!user) { addToast('Please sign in to checkout', 'error'); setActivePage('login'); return; }
    setOrderPlaced(true);
    setCart([]);
  };

  if (orderPlaced) return (
    <section className="cart-section">
      <div className="success-page">
        <div className="success-icon">✅</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
        <button className="cta-button" onClick={() => setActivePage('products')}>Continue Shopping</button>
      </div>
    </section>
  );

  return (
    <section className="cart-section">
      <div className="section-header"><h2 className="section-title">Shopping Cart</h2><p className="section-subtitle">{cart.length} item{cart.length !== 1 ? 's' : ''}</p></div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p>Your cart is empty</p>
          <button className="cta-button" onClick={() => setActivePage('products')}>Explore Collection</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <p className="cart-item-cat">{item.category}</p>
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${(item.price * item.qty).toFixed(2)}</p>
                  <div className="cart-item-actions">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="qty-value">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    <button className="cta-button danger sm" onClick={() => remove(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            {discountAmt > 0 && <div className="summary-row" style={{ color: '#27ae60' }}><span>Discount</span><span>-${discountAmt.toFixed(2)}</span></div>}
            <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping}`}</span></div>
            {shipping > 0 && <p style={{ fontSize: '0.78rem', color: '#aaa', marginBottom: '0.8rem' }}>Free shipping on orders over $300</p>}
            <hr className="summary-divider" />
            <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <div className="promo-input-wrapper">
              <input className="promo-input" placeholder="Promo code" value={promo} onChange={e => setPromo(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyPromo()} />
              <button className="promo-btn" onClick={applyPromo}>Apply</button>
            </div>
            {promoMsg && <p className="promo-success">{promoMsg}</p>}
            <p style={{ fontSize: '0.75rem', color: '#bbb', marginBottom: '1rem' }}>Try: CERAMIQUE10</p>
            <button className="cta-button" style={{ width: '100%' }} onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </section>
  );
};

// ==================== WISHLIST ====================
const Wishlist = ({ wishlist, setWishlist, cart, setCart, addToast, setActivePage }) => {
  const moveToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) setCart(cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
    else setCart([...cart, { ...product, qty: 1 }]);
    setWishlist(wishlist.filter(w => w.id !== product.id));
    addToast(`${product.name} moved to cart`, 'success');
  };

  return (
    <section className="wishlist-section">
      <div className="section-header"><h2 className="section-title">Wishlist</h2><p className="section-subtitle">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p></div>
      {wishlist.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">♡</div>
          <p>Your wishlist is empty</p>
          <button className="cta-button" onClick={() => setActivePage('products')}>Explore Collection</button>
        </div>
      ) : (
        <div className="products-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {wishlist.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-overlay">
                  <button className="overlay-btn" onClick={() => moveToCart(product)}>Move to Cart</button>
                </div>
              </div>
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 className="product-name">{product.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <p className="product-price">${product.price}</p>
                  <button className="wishlist-btn" onClick={() => { setWishlist(wishlist.filter(w => w.id !== product.id)); addToast('Removed from wishlist', 'info'); }}>❤️</button>
                </div>
                <button className="cta-button sm" style={{ marginTop: '0.8rem', width: '100%' }} onClick={() => moveToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// ==================== LOGIN ====================
const Login = ({ setUser, setActivePage, addToast }) => {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', remember: false });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (tab === 'register' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (tab === 'register' && form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    const name = tab === 'login' ? form.email.split('@')[0] : form.name;
    setUser({ name, email: form.email });
    addToast(`Welcome${tab === 'login' ? ' back' : ''}, ${name}!`, 'success');
    setActivePage('home');
  };

  const update = (field, val) => setForm({ ...form, [field]: val });

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">CERAMIQUE</div>
        <p className="auth-tagline">Premium Artisan Ceramics</p>
        <div className="auth-tabs">
          <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Sign In</button>
          <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Create Account</button>
        </div>
        {tab === 'register' && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" type="text" placeholder="Your full name" value={form.name} onChange={e => update('name', e.target.value)} />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder={tab === 'register' ? 'Min. 6 characters' : 'Enter password'} value={form.password} onChange={e => update('password', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          {errors.password && <p className="form-error">{errors.password}</p>}
        </div>
        {tab === 'register' && (
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input className="form-input" type="password" placeholder="Repeat your password" value={form.confirm} onChange={e => update('confirm', e.target.value)} />
            {errors.confirm && <p className="form-error">{errors.confirm}</p>}
          </div>
        )}
        {tab === 'login' && (
          <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="checkbox-wrapper">
              <input id="remember" type="checkbox" checked={form.remember} onChange={e => update('remember', e.target.checked)} />
              <label htmlFor="remember">Remember me</label>
            </div>
            <span style={{ fontSize: '0.82rem', color: '#2c2c2c', cursor: 'pointer', textDecoration: 'underline' }}>Forgot password?</span>
          </div>
        )}
        {tab === 'register' && (
          <div className="checkbox-wrapper" style={{ marginBottom: '1.4rem' }}>
            <input id="terms" type="checkbox" />
            <label htmlFor="terms">I agree to the <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms & Conditions</span></label>
          </div>
        )}
        <button className="cta-button" style={{ width: '100%' }} onClick={handleSubmit}>
          {tab === 'login' ? 'Sign In' : 'Create Account'}
        </button>
        <div className="auth-divider"><span>or continue with</span></div>
        <button className="social-btn">🌐 Continue with Google</button>
        <button className="social-btn">𝕏 Continue with X</button>
        <p className="auth-footer-link" onClick={() => setActivePage('home')}>← Back to <span>Home</span></p>
      </div>
    </div>
  );
};

// ==================== ABOUT ====================
const About = ({ setActivePage }) => (
  <section className="about-section">
    <div className="section-header">
      <h2 className="section-title">Our Story</h2>
      <p className="section-subtitle">Passion, craft, and timeless elegance</p>
    </div>
    <div className="about-grid">
      <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80" alt="Ceramique Studio" className="about-img" />
      <div className="about-text">
        <h2>Where Art Meets Function</h2>
        <p>Founded in 2015, Ceramique was born from a belief that everyday objects can and should be beautiful. We work with master artisans across Europe to bring you pieces that transform ordinary spaces into extraordinary ones.</p>
        <p>Each piece in our collection is thoughtfully designed and meticulously crafted using traditional techniques passed down through generations. We believe in slow making, intentional design, and materials that age with grace.</p>
        <p>From our studio in Florence, we curate every tile, basin, and decorative object with an obsessive attention to detail — ensuring that what arrives at your door is nothing short of perfection.</p>
        <button className="cta-button" style={{ marginTop: '1.5rem' }} onClick={() => setActivePage('products')}>Shop Collection</button>
      </div>
    </div>
    <div className="about-stats">
      {[['500+', 'Products Curated'], ['15K+', 'Happy Customers'], ['8', 'Years of Excellence']].map(([num, label]) => (
        <div key={label} className="stat-card"><div className="stat-num">{num}</div><div className="stat-label">{label}</div></div>
      ))}
    </div>
    <div style={{ maxWidth: '1100px', margin: '3rem auto 0' }}>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>Our Values</h3>
      <div className="values-grid">
        {[['🏺', 'Artisanship', 'Every product is handcrafted by skilled artisans who pour their expertise and passion into each piece.'], ['🌿', 'Sustainability', 'We source responsibly, minimize waste, and partner with studios that share our commitment to the planet.'], ['✨', 'Timeless Design', 'We create pieces that transcend trends — objects meant to be cherished for decades, not discarded in seasons.']].map(([icon, title, desc]) => (
          <div key={title} className="value-card"><div className="value-icon">{icon}</div><h4 className="value-title">{title}</h4><p className="value-desc">{desc}</p></div>
        ))}
      </div>
    </div>
  </section>
);

// ==================== CONTACT ====================
const Contact = ({ addToast }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { addToast('Please fill in all required fields', 'error'); return; }
    addToast('Message sent! We\'ll reply within 24 hours.', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact-section">
      <div className="section-header"><h2 className="section-title">Contact Us</h2><p className="section-subtitle">We'd love to hear from you</p></div>
      <div className="contact-grid">
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <p>Whether you have a question about our collection, need design advice, or want to discuss a bespoke project — we're here to help.</p>
          {[['📍', 'Via della Ceramica 12, Florence, Italy'], ['📧', 'info@ceramique.com'], ['📞', '+39 055 123 4567'], ['🕐', 'Mon–Fri: 9:00–18:00 CET']].map(([icon, text]) => (
            <div key={text} className="contact-detail">
              <div className="contact-detail-icon">{icon}</div>
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="contact-form">
          <h3>Send a Message</h3>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Name *</label><input className="form-input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
          </div>
          <div className="form-group"><label className="form-label">Subject</label><input className="form-input" placeholder="How can we help?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Message *</label><textarea className="form-input" rows={5} placeholder="Tell us more..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'vertical' }}></textarea></div>
          <button className="cta-button" style={{ width: '100%' }} onClick={handleSubmit}>Send Message</button>
        </div>
      </div>
    </section>
  );
};

// ==================== FOOTER ====================
const Footer = ({ setActivePage }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email && email.includes('@')) { alert(`Subscribed with ${email}!`); setEmail(''); }
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">CERAMIQUE</div>
          <p>Handcrafted ceramics for spaces that deserve beauty. Artisan-made with love from Florence, Italy.</p>
          <div className="footer-social">
            {['𝕏', 'f', 'in', '📸'].map((s, i) => <div key={i} className="social-icon">{s}</div>)}
          </div>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul className="footer-links">
            {['All Products', 'Tiles', 'Washbasins', 'Decorative', 'Tableware', 'New Arrivals'].map(l => (
              <li key={l} onClick={() => setActivePage('products')}>{l}</li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul className="footer-links">
            {[['About Us', 'about'], ['Contact', 'contact'], ['Careers', 'contact'], ['Press', 'contact']].map(([l, p]) => (
              <li key={l} onClick={() => setActivePage(p)}>{l}</li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p style={{ fontSize: '0.85rem', color: '#9a9690', marginBottom: '1rem', lineHeight: 1.7 }}>Get exclusive offers, new arrivals & design inspiration straight to your inbox.</p>
          <div className="newsletter-form">
            <input className="newsletter-input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubscribe()} />
            <button className="newsletter-btn" onClick={handleSubscribe}>→</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Ceramique. All rights reserved.</p>
        <div className="footer-bottom-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
};

// ==================== SCROLL TO TOP ====================
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <button className={`scroll-top ${visible ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>;
};

// ==================== APP ====================
const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const handleLogout = () => { setUser(null); addToast('Signed out successfully', 'info'); setActivePage('home'); };

  const noFooterPages = ['login'];

  return (
    <div className="app">
      <style>{styles}</style>
      {activePage !== 'login' && <Navbar activePage={activePage} setActivePage={setActivePage} cart={cart} wishlist={wishlist} user={user} onLogout={handleLogout} />}
      {activePage === 'home' && <Hero setActivePage={setActivePage} />}
      {activePage === 'products' && <Products setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} addToast={addToast} />}
      {activePage === 'detail' && <ProductDetail product={selectedProduct} setActivePage={setActivePage} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} addToast={addToast} />}
      {activePage === 'cart' && <Cart cart={cart} setCart={setCart} setActivePage={setActivePage} addToast={addToast} user={user} />}
      {activePage === 'wishlist' && <Wishlist wishlist={wishlist} setWishlist={setWishlist} cart={cart} setCart={setCart} addToast={addToast} setActivePage={setActivePage} />}
      {activePage === 'login' && <Login setUser={setUser} setActivePage={setActivePage} addToast={addToast} />}
      {activePage === 'about' && <About setActivePage={setActivePage} />}
      {activePage === 'contact' && <Contact addToast={addToast} />}
      {activePage === 'orders' && <section className="products-section"><div className="section-header"><h2 className="section-title">My Orders</h2><p className="section-subtitle">Your order history will appear here</p></div></section>}
      {!noFooterPages.includes(activePage) && <Footer setActivePage={setActivePage} />}
      <ToastContainer toasts={toasts} />
      <ScrollToTop />
    </div>
  );
};

export default App;
