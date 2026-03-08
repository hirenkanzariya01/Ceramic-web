// import React, { useState, useEffect, useRef } from 'react';
// import { Camera, ShoppingBag, User, Menu, X, Mail, Phone, MapPin, Send, ChevronRight } from 'lucide-react';

// // Product Data
// const productsData = [
//   {
//     id: 1,
//     name: "Midnight Vase Collection",
//     price: "$289",
//     category: "Vases",
//     image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
//     description: "Handcrafted ceramic vase with deep navy glaze, perfect for modern interiors."
//   },
//   {
//     id: 2,
//     name: "Artisan Bowl Set",
//     price: "$145",
//     category: "Bowls",
//     image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
//     description: "Set of three ceramic bowls with matte finish and organic forms."
//   },
//   {
//     id: 3,
//     name: "Sculptural Planter",
//     price: "$198",
//     category: "Planters",
//     image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
//     description: "Contemporary planter with geometric patterns and soft beige tones."
//   },
//   {
//     id: 4,
//     name: "Elegant Tea Set",
//     price: "$325",
//     category: "Tableware",
//     image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
//     description: "Complete tea service featuring delicate porcelain with gold accents."
//   },
//   {
//     id: 5,
//     name: "Textured Wall Plate",
//     price: "$175",
//     category: "Decor",
//     image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
//     description: "Statement wall piece with intricate surface textures."
//   },
//   {
//     id: 6,
//     name: "Minimal Mug Series",
//     price: "$89",
//     category: "Tableware",
//     image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
//     description: "Set of four handmade mugs with smooth ivory finish."
//   }
// ];

// // CSS Styles
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   body {
//     font-family: 'Inter', sans-serif;
//     background: #0B132B;
//     color: #F5F3EE;
//     overflow-x: hidden;
//   }

//   .app {
//     position: relative;
//     min-height: 100vh;
//   }

//   /* Animated Background Blobs */
//   .bg-blobs {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     z-index: 0;
//     overflow: hidden;
//     pointer-events: none;
//   }

//   .blob {
//     position: absolute;
//     border-radius: 50%;
//     filter: blur(80px);
//     opacity: 0.15;
//     animation: float 20s infinite ease-in-out;
//   }

//   .blob1 {
//     width: 500px;
//     height: 500px;
//     background: linear-gradient(135deg, #4B0082, #1C2541, #00CED1);
//     top: -100px;
//     left: -100px;
//     animation-delay: 0s;
//   }

//   .blob2 {
//     width: 400px;
//     height: 400px;
//     background: linear-gradient(135deg, #1C2541, #6A5ACD, #4169E1);
//     bottom: -100px;
//     right: -100px;
//     animation-delay: 7s;
//   }

//   .blob3 {
//     width: 350px;
//     height: 350px;
//     background: linear-gradient(135deg, #00CED1, #4169E1, #1C2541);
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     animation-delay: 14s;
//   }

//   @keyframes float {
//     0%, 100% { transform: translate(0, 0) scale(1); }
//     33% { transform: translate(100px, -100px) scale(1.1); }
//     66% { transform: translate(-100px, 100px) scale(0.9); }
//   }

//   /* Noise Texture Overlay */
//   .noise-overlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
//     pointer-events: none;
//     z-index: 1;
//   }

//   /* Navigation */
//   .navbar {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     z-index: 1000;
//     padding: 1.5rem 5%;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .navbar.scrolled {
//     background: rgba(11, 19, 43, 0.85);
//     backdrop-filter: blur(20px);
//     border-bottom: 1px solid rgba(245, 243, 238, 0.1);
//     padding: 1rem 5%;
//   }

//   .logo {
//     font-family: 'Playfair Display', serif;
//     font-size: 1.8rem;
//     font-weight: 700;
//     letter-spacing: 2px;
//     color: #F5F3EE;
//     text-decoration: none;
//     cursor: pointer;
//   }

//   .nav-links {
//     display: flex;
//     gap: 3rem;
//     list-style: none;
//     align-items: center;
//   }

//   .nav-links a {
//     color: #F5F3EE;
//     text-decoration: none;
//     font-size: 0.95rem;
//     font-weight: 400;
//     letter-spacing: 1px;
//     position: relative;
//     transition: all 0.3s ease;
//     cursor: pointer;
//   }

//   .nav-links a::after {
//     content: '';
//     position: absolute;
//     bottom: -5px;
//     left: 0;
//     width: 0;
//     height: 1px;
//     background: #F5F3EE;
//     transition: width 0.3s ease;
//   }

//   .nav-links a:hover::after,
//   .nav-links a.active::after {
//     width: 100%;
//   }

//   .nav-icons {
//     display: flex;
//     gap: 1.5rem;
//     align-items: center;
//   }

//   .nav-icons svg {
//     cursor: pointer;
//     transition: all 0.3s ease;
//   }

//   .nav-icons svg:hover {
//     color: #D6CFC4;
//     transform: translateY(-2px);
//   }

//   .menu-toggle {
//     display: none;
//     cursor: pointer;
//   }

//   /* Hero Section */
//   .hero {
//     position: relative;
//     height: 100vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     overflow: hidden;
//     z-index: 2;
//   }

//   .hero-content {
//     text-align: center;
//     max-width: 900px;
//     padding: 0 2rem;
//     position: relative;
//     z-index: 3;
//   }

//   .hero h1 {
//     font-family: 'Playfair Display', serif;
//     font-size: 5rem;
//     font-weight: 700;
//     line-height: 1.2;
//     letter-spacing: 2px;
//     margin-bottom: 2rem;
//     opacity: 0;
//     animation: fadeInUp 1s ease forwards 0.3s;
//   }

//   .hero p {
//     font-size: 1.2rem;
//     color: #D6CFC4;
//     margin-bottom: 3rem;
//     letter-spacing: 1px;
//     opacity: 0;
//     animation: fadeInUp 1s ease forwards 0.6s;
//   }

//   .cta-button {
//     display: inline-flex;
//     align-items: center;
//     gap: 0.8rem;
//     padding: 1.2rem 3rem;
//     background: transparent;
//     border: 2px solid #F5F3EE;
//     color: #F5F3EE;
//     font-size: 1rem;
//     letter-spacing: 2px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//     transition: all 0.4s ease;
//     opacity: 0;
//     animation: fadeInUp 1s ease forwards 0.9s;
//   }

//   .cta-button::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 100%;
//     background: #F5F3EE;
//     transition: left 0.4s ease;
//     z-index: -1;
//   }

//   .cta-button:hover::before {
//     left: 0;
//   }

//   .cta-button:hover {
//     color: #0B132B;
//     box-shadow: 0 0 30px rgba(245, 243, 238, 0.4);
//   }

//   @keyframes fadeInUp {
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//     from {
//       opacity: 0;
//       transform: translateY(30px);
//     }
//   }

//   /* Products Grid */
//   .products-section {
//     position: relative;
//     z-index: 2;
//     padding: 8rem 5%;
//     min-height: 100vh;
//   }

//   .section-header {
//     text-align: center;
//     margin-bottom: 5rem;
//   }

//   .section-header h2 {
//     font-family: 'Playfair Display', serif;
//     font-size: 3.5rem;
//     margin-bottom: 1rem;
//     letter-spacing: 2px;
//   }

//   .section-header p {
//     font-size: 1.1rem;
//     color: #D6CFC4;
//     letter-spacing: 1px;
//   }

//   .products-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
//     gap: 3rem;
//     max-width: 1400px;
//     margin: 0 auto;
//   }

//   .product-card {
//     background: rgba(28, 37, 65, 0.3);
//     backdrop-filter: blur(20px);
//     border: 1px solid rgba(245, 243, 238, 0.1);
//     border-radius: 20px;
//     overflow: hidden;
//     cursor: pointer;
//     transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//     opacity: 0;
//     animation: fadeInScale 0.8s ease forwards;
//   }

//   .product-card:nth-child(1) { animation-delay: 0.1s; }
//   .product-card:nth-child(2) { animation-delay: 0.2s; }
//   .product-card:nth-child(3) { animation-delay: 0.3s; }
//   .product-card:nth-child(4) { animation-delay: 0.4s; }
//   .product-card:nth-child(5) { animation-delay: 0.5s; }
//   .product-card:nth-child(6) { animation-delay: 0.6s; }

//   @keyframes fadeInScale {
//     to {
//       opacity: 1;
//       transform: scale(1);
//     }
//     from {
//       opacity: 0;
//       transform: scale(0.9);
//     }
//   }

//   .product-card:hover {
//     transform: translateY(-10px);
//     box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
//     border-color: rgba(245, 243, 238, 0.3);
//   }

//   .product-image {
//     width: 100%;
//     height: 350px;
//     overflow: hidden;
//     position: relative;
//   }

//   .product-image img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .product-card:hover .product-image img {
//     transform: scale(1.1);
//   }

//   .product-info {
//     padding: 2rem;
//   }

//   .product-category {
//     font-size: 0.85rem;
//     color: #D6CFC4;
//     letter-spacing: 2px;
//     margin-bottom: 0.5rem;
//     text-transform: uppercase;
//   }

//   .product-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 1.5rem;
//     margin-bottom: 0.5rem;
//     letter-spacing: 1px;
//   }

//   .product-price {
//     font-size: 1.3rem;
//     color: #F5F3EE;
//     font-weight: 600;
//     margin-bottom: 1rem;
//   }

//   .product-description {
//     font-size: 0.95rem;
//     color: #D6CFC4;
//     line-height: 1.6;
//     margin-bottom: 1.5rem;
//   }

//   .view-details {
//     display: inline-flex;
//     align-items: center;
//     gap: 0.5rem;
//     color: #F5F3EE;
//     font-size: 0.9rem;
//     letter-spacing: 1px;
//     transition: all 0.3s ease;
//   }

//   .product-card:hover .view-details {
//     gap: 1rem;
//   }

//   /* Product Detail */
//   .product-detail {
//     position: relative;
//     z-index: 2;
//     padding: 8rem 5%;
//     min-height: 100vh;
//   }

//   .detail-container {
//     max-width: 1400px;
//     margin: 0 auto;
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 5rem;
//     align-items: center;
//   }

//   .detail-image {
//     width: 100%;
//     height: 600px;
//     border-radius: 20px;
//     overflow: hidden;
//     background: rgba(28, 37, 65, 0.3);
//     backdrop-filter: blur(20px);
//     border: 1px solid rgba(245, 243, 238, 0.1);
//   }

//   .detail-image img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   .detail-info h1 {
//     font-family: 'Playfair Display', serif;
//     font-size: 3rem;
//     margin-bottom: 1rem;
//     letter-spacing: 2px;
//   }

//   .detail-info .product-category {
//     display: block;
//     margin-bottom: 2rem;
//   }

//   .detail-info .product-price {
//     font-size: 2rem;
//     margin-bottom: 2rem;
//   }

//   .detail-info .product-description {
//     font-size: 1.1rem;
//     line-height: 1.8;
//     margin-bottom: 3rem;
//   }

//   /* About Section */
//   .about-section {
//     position: relative;
//     z-index: 2;
//     padding: 8rem 5%;
//     min-height: 100vh;
//   }

//   .about-container {
//     max-width: 1400px;
//     margin: 0 auto;
//   }

//   .about-hero {
//     text-align: center;
//     margin-bottom: 6rem;
//   }

//   .about-hero h2 {
//     font-family: 'Playfair Display', serif;
//     font-size: 4rem;
//     margin-bottom: 2rem;
//     letter-spacing: 2px;
//   }

//   .about-hero p {
//     font-size: 1.3rem;
//     color: #D6CFC4;
//     max-width: 800px;
//     margin: 0 auto;
//     line-height: 1.8;
//   }

//   .about-content {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 5rem;
//     align-items: center;
//     margin-bottom: 6rem;
//   }

//   .about-text h3 {
//     font-family: 'Playfair Display', serif;
//     font-size: 2.5rem;
//     margin-bottom: 2rem;
//     letter-spacing: 1px;
//   }

//   .about-text p {
//     font-size: 1.1rem;
//     line-height: 1.9;
//     color: #D6CFC4;
//     margin-bottom: 1.5rem;
//   }

//   .about-image {
//     width: 100%;
//     height: 500px;
//     border-radius: 20px;
//     overflow: hidden;
//     background: rgba(28, 37, 65, 0.3);
//     backdrop-filter: blur(20px);
//     border: 1px solid rgba(245, 243, 238, 0.1);
//   }

//   .about-image img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   /* Contact Section */
//   .contact-section {
//     position: relative;
//     z-index: 2;
//     padding: 8rem 5%;
//     min-height: 100vh;
//   }

//   .contact-container {
//     max-width: 1200px;
//     margin: 0 auto;
//   }

//   .contact-header {
//     text-align: center;
//     margin-bottom: 5rem;
//   }

//   .contact-header h2 {
//     font-family: 'Playfair Display', serif;
//     font-size: 3.5rem;
//     margin-bottom: 1rem;
//     letter-spacing: 2px;
//   }

//   .contact-header p {
//     font-size: 1.1rem;
//     color: #D6CFC4;
//   }

//   .contact-content {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 5rem;
//   }

//   .contact-info {
//     display: flex;
//     flex-direction: column;
//     gap: 2.5rem;
//   }

//   .contact-item {
//     display: flex;
//     align-items: flex-start;
//     gap: 1.5rem;
//   }

//   .contact-item svg {
//     flex-shrink: 0;
//     margin-top: 0.3rem;
//   }

//   .contact-item h3 {
//     font-size: 1.2rem;
//     margin-bottom: 0.5rem;
//     letter-spacing: 1px;
//   }

//   .contact-item p {
//     color: #D6CFC4;
//     font-size: 1rem;
//   }

//   .contact-form {
//     background: rgba(28, 37, 65, 0.3);
//     backdrop-filter: blur(20px);
//     border: 1px solid rgba(245, 243, 238, 0.1);
//     border-radius: 20px;
//     padding: 3rem;
//   }

//   .form-group {
//     margin-bottom: 2rem;
//   }

//   .form-group label {
//     display: block;
//     margin-bottom: 0.8rem;
//     font-size: 0.95rem;
//     letter-spacing: 1px;
//     color: #D6CFC4;
//   }

//   .form-group input,
//   .form-group textarea {
//     width: 100%;
//     padding: 1rem 1.5rem;
//     background: rgba(11, 19, 43, 0.5);
//     border: 1px solid rgba(245, 243, 238, 0.2);
//     border-radius: 10px;
//     color: #F5F3EE;
//     font-size: 1rem;
//     font-family: 'Inter', sans-serif;
//     transition: all 0.3s ease;
//   }

//   .form-group input:focus,
//   .form-group textarea:focus {
//     outline: none;
//     border-color: #F5F3EE;
//     box-shadow: 0 0 20px rgba(245, 243, 238, 0.2);
//   }

//   .form-group textarea {
//     resize: vertical;
//     min-height: 150px;
//   }

//   .submit-button {
//     width: 100%;
//     padding: 1.2rem;
//     background: transparent;
//     border: 2px solid #F5F3EE;
//     color: #F5F3EE;
//     font-size: 1rem;
//     letter-spacing: 2px;
//     cursor: pointer;
//     border-radius: 10px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 0.8rem;
//     transition: all 0.4s ease;
//     position: relative;
//     overflow: hidden;
//   }

//   .submit-button::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 100%;
//     background: #F5F3EE;
//     transition: left 0.4s ease;
//     z-index: -1;
//   }

//   .submit-button:hover::before {
//     left: 0;
//   }

//   .submit-button:hover {
//     color: #0B132B;
//   }

//   /* Footer */
//   .footer {
//     position: relative;
//     z-index: 2;
//     padding: 3rem 5%;
//     border-top: 1px solid rgba(245, 243, 238, 0.1);
//     text-align: center;
//   }

//   .footer p {
//     color: #D6CFC4;
//     font-size: 0.95rem;
//     letter-spacing: 1px;
//   }

//   /* Responsive */
//   @media (max-width: 968px) {
//     .nav-links {
//       display: none;
//     }

//     .menu-toggle {
//       display: block;
//     }

//     .hero h1 {
//       font-size: 3rem;
//     }

//     .products-grid {
//       grid-template-columns: 1fr;
//     }

//     .detail-container,
//     .about-content,
//     .contact-content {
//       grid-template-columns: 1fr;
//       gap: 3rem;
//     }

//     .section-header h2,
//     .about-hero h2 {
//       font-size: 2.5rem;
//     }
//   }

//   @media (max-width: 568px) {
//     .hero h1 {
//       font-size: 2rem;
//     }

//     .hero p {
//       font-size: 1rem;
//     }

//     .products-grid {
//       grid-template-columns: 1fr;
//     }

//     .product-image {
//       height: 250px;
//     }
//   }
// `;

// // Main App Component
// const App = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navigateTo = (page, product = null) => {
//     setCurrentPage(page);
//     setSelectedProduct(product);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Thank you for your message! We will get back to you soon.');
//     setFormData({ name: '', email: '', message: '' });
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="app">
//         {/* Animated Background */}
//         <div className="bg-blobs">
//           <div className="blob blob1"></div>
//           <div className="blob blob2"></div>
//           <div className="blob blob3"></div>
//         </div>
//         <div className="noise-overlay"></div>

//         {/* Navigation */}
//         <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//           <div className="logo" onClick={() => navigateTo('home')}>LUXE CERAMIC</div>
//           <ul className="nav-links">
//             <li><a className={currentPage === 'home' ? 'active' : ''} onClick={() => navigateTo('home')}>Home</a></li>
//             <li><a className={currentPage === 'products' ? 'active' : ''} onClick={() => navigateTo('products')}>Collection</a></li>
//             <li><a className={currentPage === 'about' ? 'active' : ''} onClick={() => navigateTo('about')}>About</a></li>
//             <li><a className={currentPage === 'contact' ? 'active' : ''} onClick={() => navigateTo('contact')}>Contact</a></li>
//           </ul>
//           <div className="nav-icons">
//             <ShoppingBag size={20} />
//             <User size={20} />
//             <div className="menu-toggle">
//               <Menu size={24} />
//             </div>
//           </div>
//         </nav>

//         {/* Page Content */}
//         {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
//         {currentPage === 'products' && <ProductsPage navigateTo={navigateTo} />}
//         {currentPage === 'product-detail' && selectedProduct && (
//           <ProductDetailPage product={selectedProduct} navigateTo={navigateTo} />
//         )}
//         {currentPage === 'about' && <AboutPage />}
//         {currentPage === 'contact' && (
//           <ContactPage formData={formData} handleFormChange={handleFormChange} handleSubmit={handleSubmit} />
//         )}

//         {/* Footer */}
//         <footer className="footer">
//           <p>Where tradition meets contemporary elegance in every handcrafted piece</p>
//       </div>
//       <div className="about-content">
//         <div className="about-text">
//           <h3>Craftsmanship Since 1987</h3>
//           <p>
//             Our journey began in a small studio with a simple vision: to create ceramic pieces that 
//             transcend time and trends. Each piece is shaped by hand, glazed with care, and fired with 
//             precision to create works of art that enhance daily living.
//           </p>
//           <p>
//             We believe in the beauty of imperfection, the warmth of handmade objects, and the story 
//             that each piece tells. Our artisans bring decades of experience and boundless creativity 
//             to every creation.
//           </p>
//         </div>
//         <div className="about-image">
//           <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80" alt="Artisan at work" />
//         </div>
//       </div>
//       <div className="about-content">
//         <div className="about-image">
//           <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80" alt="Ceramic studio" />
//         </div>
//         <div className="about-text">
//           <h3>Sustainable & Ethical</h3>
//           <p>
//             We are committed to sustainable practices that honor both craft and environment. Our clay 
//             is sourced responsibly, our glazes are non-toxic, and our studio operates with minimal 
//             environmental impact.
//           </p>
//           <p>
//             Every purchase supports fair wages, safe working conditions, and the preservation of 
//             traditional ceramic techniques for future generations.
//           </p>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// // Contact Page
// const ContactPage = ({ formData, handleFormChange, handleSubmit }) => (
//   <section className="contact-section">
//     <div className="contact-container">
//       <div className="contact-header">
//         <h2>Get In Touch</h2>
//         <p>We'd love to hear from you</p>
//       </div>
//       <div className="contact-content">
//         <div className="contact-info">
//           <div className="contact-item">
//             <MapPin size={24} />
//             <div>
//               <h3>Visit Our Studio</h3>
//               <p>123 Artisan Lane, Design District<br />New York, NY 10001</p>
//             </div>
//           </div>
//           <div className="contact-item">
//             <Phone size={24} />
//             <div>
//               <h3>Call Us</h3>
//               <p>+1 (555) 123-4567<br />Mon-Fri: 9AM - 6PM EST</p>
//             </div>
//           </div>
//           <div className="contact-item">
//             <Mail size={24} />
//             <div>
//               <h3>Email Us</h3>
//               <p>hello@luxeceramic.com<br />support@luxeceramic.com</p>
//             </div>
//           </div>
//         </div>
//         <form className="contact-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Full Name</label>
//             <input 
//               type="text" 
//               id="name" 
//               name="name" 
//               value={formData.name}
//               onChange={handleFormChange}
//               required 
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input 
//               type="email" 
//               id="email" 
//               name="email" 
//               value={formData.email}
//               onChange={handleFormChange}
//               required 
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="message">Message</label>
//             <textarea 
//               id="message" 
//               name="message" 
//               value={formData.message}
//               onChange={handleFormChange}
//               required
//             ></textarea>
//           </div>
//           <button type="submit" className="submit-button">
//             Send Message <Send size={18} />
//           </button>
//         </form>
//       </div>
//     </div>
//   </section>
// );

// export default App;© 2026 Luxe Ceramic. Handcrafted with passion.</p>
//         </footer>
//       </div>
//     </>
//   );
// };

// // Home Page
// const HomePage = ({ navigateTo }) => (
//   <section className="hero">
//     <div className="hero-content">
//       <h1>Timeless Ceramic Crafted for Modern Spaces</h1>
//       <p>Discover handcrafted pieces that blend artistry with functionality</p>
//       <button className="cta-button" onClick={() => navigateTo('products')}>
//         Explore Collection <ChevronRight size={20} />
//       </button>
//     </div>
//   </section>
// );

// // Products Page
// const ProductsPage = ({ navigateTo }) => (
//   <section className="products-section">
//     <div className="section-header">
//       <h2>Our Collection</h2>
//       <p>Each piece is meticulously handcrafted by master artisans</p>
//     </div>
//     <div className="products-grid">
//       {productsData.map((product) => (
//         <div key={product.id} className="product-card" onClick={() => navigateTo('product-detail', product)}>
//           <div className="product-image">
//             <img src={product.image} alt={product.name} />
//           </div>
//           <div className="product-info">
//             <div className="product-category">{product.category}</div>
//             <h3 className="product-name">{product.name}</h3>
//             <div className="product-price">{product.price}</div>
//             <p className="product-description">{product.description}</p>
//             <div className="view-details">
//               View Details <ChevronRight size={16} />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </section>
// );

// // Product Detail Page
// const ProductDetailPage = ({ product, navigateTo }) => (
//   <section className="product-detail">
//     <div className="detail-container">
//       <div className="detail-image">
//         <img src={product.image} alt={product.name} />
//       </div>
//       <div className="detail-info">
//         <div className="product-category">{product.category}</div>
//         <h1>{product.name}</h1>
//         <div className="product-price">{product.price}</div>
//         <p className="product-description">
//           {product.description} This exceptional piece represents the pinnacle of ceramic craftsmanship, 
//           combining traditional techniques with contemporary design sensibilities. Each item is carefully 
//           inspected to ensure it meets our exacting standards for quality and beauty.
//         </p>
//         <button className="cta-button">
//           <ShoppingBag size={20} /> Add to Cart
//         </button>
//       </div>
//     </div>
//   </section>
// );

// // About Page
// const AboutPage = () => (
//   <section className="about-section">
//     <div className="about-container">
//       <div className="about-hero">
//         <h2>Our Story</h2>
//         <p></p>


