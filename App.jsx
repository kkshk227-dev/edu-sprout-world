import React, { useState, useEffect } from 'react';

export default function App() {
  // --- LOAD GOOGLE FONT: SNIGLET ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // --- ANNOUNCEMENT BANNER STATE ---
  const [bannerConfig, setBannerConfig] = useState({
    enabled: true,
    text: '🎉 SPECIAL SALE: Get 20% off all Printable Packs this week! Use code: SPROUT20 🎉',
    bgColor: '#FF8BA7',
    textColor: '#FFFFFF'
  });

  // --- CONTACT INFO STATE ---
  const [contactInfo, setContactInfo] = useState({
    whatsapp: '+91 99999-99999',
    whatsappRaw: '919999999999',
    email: 'support@edusproutworld.com',
    instagram: '@edusproutworld',
    instagramLink: 'https://instagram.com/edusproutworld',
    supportHours: 'Mon–Sat (9 AM – 6 PM)'
  });

  // --- TESTIMONIALS STATE ---
  const testimonials = [
    { name: 'Pooja R.', location: 'Bangalore', text: 'The Multiplication combo booklet made times tables so effortless for my 8-year-old!', rating: 5, role: 'Verified Parent' },
    { name: 'Dr. Meera K.', location: 'Delhi', text: 'As a child psychologist, I love the step-by-step logic puzzles. Highly recommended!', rating: 5, role: 'Child Psychologist' },
    { name: 'Ananya S.', location: 'Mumbai', text: 'Instant PDF downloads are a lifesaver for weekend homeschooling sessions.', rating: 5, role: 'Homeschooling Mom' }
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // --- SUBJECT CATEGORIES STATE ---
  const [subjectList, setSubjectList] = useState([
    { name: 'All', icon: '✨', label: 'All Subjects' },
    { name: 'Alphabet & Phonics', icon: '🔤', label: 'Alphabet & Phonics' },
    { name: 'Reading', icon: '📖', label: 'Reading' },
    { name: 'Writing', icon: '✏️', label: 'Writing' },
    { name: 'Math', icon: '🧮', label: 'Math' },
    { name: 'Logic & Puzzles', icon: '🧩', label: 'Logic & Puzzles' }
  ]);

  const [newSubject, setNewSubject] = useState({ name: '', icon: '📚' });

  // --- DATABASE ---
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'Multiplication Fluency Booklets (Times Tables 2-20 Combo)',
      subjectCategory: 'Math',
      category: 'Printed Worksheets',
      price: 699,
      originalPrice: 998,
      rating: 5.0,
      reviewsCount: 24,
      badge: 'Best Seller',
      img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&auto=format&fit=crop&q=80',
      features: ['120 Pages Spiral Bound', 'High Quality 100 GSM Paper', 'Answer Key Included']
    },
    {
      id: 2,
      title: 'The Advance Phonics Pack (Full Set with Audio Guides)',
      subjectCategory: 'Reading',
      category: 'Printed Worksheets',
      price: 749,
      originalPrice: 999,
      rating: 5.0,
      reviewsCount: 20,
      badge: 'Popular',
      img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
      features: ['Blends & Digraphs Focus', 'Includes QR Codes for Audio', 'Parent Teaching Guide']
    },
    {
      id: 3,
      title: 'Brain Games & Logical Reasoning Puzzles',
      subjectCategory: 'Logic & Puzzles',
      category: 'Digital E-Copies',
      price: 299,
      originalPrice: 499,
      rating: 4.9,
      reviewsCount: 16,
      badge: 'Instant PDF',
      img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&auto=format&fit=crop&q=80',
      features: ['50 Printable PDF Worksheets', 'Critical Thinking Exercises', 'Print Unlimited Times']
    }
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-9832', customer: 'Ananya Sharma', items: 'Advanced Phonics Pack x1', total: 749, status: 'Processing', date: '2026-07-20' }
  ]);

  // --- VIEW MODE TOGGLE ---
  const [viewMode, setViewMode] = useState('buyer');
  
  // --- BUYER STATE ---
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('browse');
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', address: '' });
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);

  // --- ADMIN STATE ---
  const [newProduct, setNewProduct] = useState({ title: '', subjectCategory: 'Alphabet & Phonics', category: 'Printed Worksheets', price: '', originalPrice: '', badge: '', img: '' });

  // --- BUYER LOGIC ---
  const filteredProducts = products.filter(p => {
    return (selectedSubject === 'All' || p.subjectCategory === selectedSubject) && (selectedCategory === 'All' || p.category === selectedCategory);
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      customer: customerDetails.name,
      items: cart.map(i => `${i.title} x${i.quantity}`).join(', '),
      total: cart.reduce((sum, i) => sum + (i.price * i.quantity), 0),
      status: 'Paid & Processing',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([newOrder, ...orders]);
    setLastPlacedOrder(newOrder);
    setCart([]);
    setIsCartOpen(false);
    setCheckoutStep('confirmation');
  };

  const trackOrder = () => {
    const found = orders.find(o => o.id.toLowerCase() === searchOrderId.trim().toLowerCase());
    setTrackedOrder(found || 'not_found');
  };

  // --- ADMIN LOGIC ---
  const addProduct = (e) => {
    e.preventDefault();
    setProducts([...products, { ...newProduct, id: Date.now(), price: Number(newProduct.price), originalPrice: Number(newProduct.originalPrice || newProduct.price), rating: 5.0, reviewsCount: 1, features: ['New Learning Pack'] }]);
    setNewProduct({ title: '', subjectCategory: subjectList[1]?.name || 'Alphabet & Phonics', category: 'Printed Worksheets', price: '', originalPrice: '', badge: '', img: '' });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addCategory = (e) => {
    e.preventDefault();
    if (!newSubject.name.trim()) return;
    setSubjectList([...subjectList, { name: newSubject.name, icon: newSubject.icon || '📚', label: newSubject.name }]);
    setNewSubject({ name: '', icon: '📚' });
  };

  const deleteCategory = (categoryName) => {
    if (categoryName === 'All') return;
    setSubjectList(subjectList.filter(s => s.name !== categoryName));
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#E2EFE0] text-slate-700 pb-12" style={{ fontFamily: "'Sniglet', cursive, sans-serif" }}>
      
      {/* 📣 RUNNING ANNOUNCEMENT BANNER */}
      {bannerConfig.enabled && (
        <div 
          className="overflow-hidden whitespace-nowrap py-2 text-xs sm:text-sm font-bold border-b border-pink-200/50"
          style={{ backgroundColor: bannerConfig.bgColor, color: bannerConfig.textColor }}
        >
          <div className="inline-block animate-marquee pl-full">
            <span className="mx-8">{bannerConfig.text}</span>
            <span className="mx-8">{bannerConfig.text}</span>
            <span className="mx-8">{bannerConfig.text}</span>
          </div>
        </div>
      )}

      {/* Top Bar Switcher */}
      <div className="bg-[#5B7B4B] text-white px-4 sm:px-6 py-2 text-xs font-bold flex justify-between items-center">
        <span className="truncate pr-2">✨ Growing Curiosity, One Page at a Time ✨</span>
        <button 
          onClick={() => setViewMode(viewMode === 'buyer' ? 'admin' : 'buyer')}
          className="bg-[#FF8BA7] hover:bg-[#ff7295] text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition shadow-sm min-h-[48px] flex items-center justify-center shrink-0"
        >
          {viewMode === 'buyer' ? '🔒 Open Admin Panel' : '👋 Return to Storefront'}
        </button>
      </div>

      {/* BUYER MODE */}
      {viewMode === 'buyer' && (
        <>
          {/* HEADER */}
          <header className="bg-white sticky top-0 z-40 border-b border-green-100 shadow-xs py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
              <div onClick={() => setCheckoutStep('browse')} className="cursor-pointer flex items-center space-x-3 sm:space-x-4">
                <div className="w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 bg-pink-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-pink-200">
                  🌱
                </div>

                <div>
                  <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#3d592b] tracking-tight flex items-center gap-1 sm:gap-2">
                    Edu Sprout <span className="text-[#FF8BA7]">World</span>
                  </h1>
                  <p className="text-[10px] sm:text-xs uppercase font-extrabold text-pink-400 tracking-widest mt-0.5">Little Sprouts, Big Minds</p>
                </div>
              </div>
              
              <button onClick={() => setIsCartOpen(true)} className="hidden sm:flex bg-[#5B7B4B] hover:bg-[#4d6a3f] text-white font-bold px-5 py-3 rounded-full text-sm items-center space-x-2 transition shadow-sm min-h-[48px]">
                <span>🛒 Shopping Basket</span>
                <span className="bg-[#FF8BA7] text-white rounded-full px-2.5 py-0.5 text-xs font-black">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
              </button>
            </div>
          </header>

          {/* FLOATING MOBILE STICKY CART BUTTON */}
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="sm:hidden fixed bottom-5 right-5 z-50 bg-[#5B7B4B] text-white p-4 rounded-full shadow-2xl flex items-center justify-center border-2 border-white min-w-[56px] min-h-[56px]"
            aria-label="Shopping Cart"
          >
            <span className="text-xl">🛒</span>
            <span className="absolute -top-1 -right-1 bg-[#FF8BA7] text-white rounded-full w-6 h-6 text-xs font-black flex items-center justify-center border-2 border-white">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </button>

          {checkoutStep === 'confirmation' && (
            <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-3xl shadow-sm text-center border border-pink-100 mx-4">
              <span className="text-5xl block mb-2">🎉</span>
              <h2 className="text-2xl font-black text-slate-800 mb-1">Order Placed Successfully!</h2>
              <p className="text-xs text-slate-500 mb-6">Your materials are getting routed. Confirmation sent.</p>
              <div className="bg-pink-50/50 p-4 rounded-2xl mb-6 text-left text-xs border border-pink-100">
                <p className="font-bold text-slate-400">YOUR ORDER ID</p>
                <p className="text-lg font-black text-[#5B7B4B] mb-1">{lastPlacedOrder?.id}</p>
                <p><strong>Total Paid:</strong> Rs. {lastPlacedOrder?.total}.00</p>
              </div>
              <button onClick={() => setCheckoutStep('browse')} className="bg-[#5B7B4B] text-white text-sm font-bold px-4 py-3 rounded-full w-full hover:bg-[#4d6a3f] transition min-h-[48px]">Continue Browsing</button>
            </div>
          )}

          {checkoutStep === 'browse' && (
            <>
              {/* HERO SECTION */}
              <div className="bg-gradient-to-r from-[#FFC6D9]/50 via-[#FFB3C6]/40 to-[#D0E5CD] py-10 sm:py-14 px-4 sm:px-6 border-b border-green-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-4 text-center md:text-left">
                    <span className="bg-white text-[#FF8BA7] text-xs font-black uppercase px-4 py-1.5 rounded-full shadow-xs border border-pink-100 inline-block">
                      🌸 Loved by 10,000+ Parents
                    </span>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#3a522e] leading-tight">
                      Nurture Young Minds <br />
                      <span className="text-[#FF8BA7]">With Thoughtful Resources</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
                      Discover beautifully crafted printed workbooks and instant digital packs designed to make reading, writing, math, and logic fun for young learners.
                    </p>

                    {/* Proximity Action Button */}
                    <div className="pt-2">
                      <button 
                        onClick={scrollToCatalog} 
                        className="bg-[#5B7B4B] hover:bg-[#4a673c] text-white font-black text-sm px-6 py-3.5 rounded-full shadow-md transition transform hover:-translate-y-0.5 min-h-[48px] w-full sm:w-auto"
                      >
                        📚 Shop All Workbooks 👇
                      </button>
                    </div>
                  </div>

                  {/* EXPERT ENDORSEMENT BADGE */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-3 text-center w-full md:w-auto">
                    <div className="bg-white/90 backdrop-blur-xs p-4 rounded-3xl border border-pink-100 shadow-xs flex items-center space-x-3 text-left">
                      <span className="text-3xl">🎓</span>
                      <div>
                        <p className="text-xs font-black text-slate-800">"Pedagogically Aligned Materials"</p>
                        <p className="text-[10px] text-slate-500">— Dr. Meera K., Child Psychologist</p>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-center">
                      <div className="bg-white/80 backdrop-blur-xs p-4 rounded-3xl border border-pink-100 shadow-xs flex-1">
                        <p className="text-xl font-black text-[#5B7B4B]">100%</p>
                        <p className="text-[10px] font-bold text-slate-500">Kid-Approved</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-xs p-4 rounded-3xl border border-pink-100 shadow-xs flex-1">
                        <p className="text-xl font-black text-[#FF8BA7]">4.9 ★</p>
                        <p className="text-[10px] font-bold text-slate-500">Parent Rating</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HIGH CONTRAST ORDER TRACKER BAR */}
              <div className="bg-[#D8E8D5] border-b border-green-200/60 py-4 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="font-black text-sm text-[#3d592b]">📦 Track Your Order Shipment:</span>
                  <div className="flex w-full sm:w-auto border-2 border-orange-400 rounded-full overflow-hidden bg-white shadow-xs">
                    <input 
                      type="text" 
                      placeholder="Enter Order ID (e.g. ORD-9832)" 
                      value={searchOrderId} 
                      onChange={e => setSearchOrderId(e.target.value)} 
                      className="px-4 py-2.5 outline-none text-xs flex-1 sm:w-56 min-h-[48px]"
                    />
                    {/* ENERGETIC HIGH-CONTRAST ORANGE BUTTON */}
                    <button 
                      onClick={trackOrder} 
                      className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-black px-6 py-2.5 transition min-h-[48px] shrink-0"
                    >
                      Find My Order
                    </button>
                  </div>
                </div>
                {trackedOrder && (
                  <div className="max-w-7xl mx-auto mt-3 p-3 bg-white rounded-2xl border text-xs shadow-xs">
                    {trackedOrder === 'not_found' ? <p className="text-red-500 font-bold">⚠️ Order ID not found. Please recheck your receipt.</p> : <p>Order Identifier <strong>{trackedOrder.id}</strong> status: <span className="bg-green-100 text-[#436132] px-2.5 py-1 rounded-full font-bold">{trackedOrder.status}</span></p>}
                  </div>
                )}
              </div>

              {/* MAIN CATALOG SECTION */}
              <main id="catalog-section" className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
                
                {/* VERTICALLY STACKED MOBILE-RESPONSIVE SIDEBAR */}
                <aside className="w-full md:w-64 bg-white p-5 rounded-3xl border border-pink-100 shrink-0 h-fit space-y-6 shadow-xs">
                  <div>
                    <h4 className="text-xs font-black text-pink-400 uppercase tracking-wider mb-3">Browse Categories</h4>
                    <div className="flex flex-col space-y-2">
                      {subjectList.map(sub => (
                        <button 
                          key={sub.name} 
                          onClick={() => setSelectedSubject(sub.name)} 
                          className={`flex items-center space-x-3 text-left px-4 py-3 rounded-2xl text-xs font-bold transition min-h-[48px] ${selectedSubject === sub.name ? 'bg-[#FF8BA7] text-white shadow-xs' : 'hover:bg-pink-50 text-slate-600 bg-pink-50/30'}`}
                        >
                          <span className="text-lg">{sub.icon}</span>
                          <span>{sub.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-pink-50">
                    <h4 className="text-xs font-black text-pink-400 uppercase tracking-wider mb-3">Format Type</h4>
                    <div className="flex flex-col space-y-2">
                      {['All', 'Printed Worksheets', 'Digital E-Copies'].map(cat => (
                        <button 
                          key={cat} 
                          onClick={() => setSelectedCategory(cat)} 
                          className={`text-left px-4 py-3 rounded-2xl text-xs font-bold transition min-h-[48px] ${selectedCategory === cat ? 'bg-[#5B7B4B] text-white shadow-xs' : 'hover:bg-pink-50 text-slate-600 bg-pink-50/30'}`}
                        >
                          {cat === 'All' ? '📚 All Formats' : cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>

                {/* PRODUCT GRID */}
                <section className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(p => (
                      <div key={p.id} className="bg-white rounded-3xl border border-pink-100 overflow-hidden flex flex-col justify-between hover:shadow-lg transition duration-200">
                        <div className="relative h-48 overflow-hidden bg-slate-50">
                          <img src={p.img} alt={p.title} className="w-full h-full object-cover"/>
                          {p.badge && <span className="absolute top-3 left-3 text-[10px] font-black uppercase bg-[#FF8BA7] text-white px-3 py-1 rounded-full shadow-md">{p.badge}</span>}
                          <span className="absolute bottom-3 right-3 text-xs font-bold bg-white/90 backdrop-blur-xs text-slate-700 px-3 py-1 rounded-full shadow-xs border border-pink-100">{p.subjectCategory || 'General'}</span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <span className="text-xs font-extrabold text-[#436132] bg-[#EAF2E8] px-3 py-1 rounded-full">{p.category}</span>
                            <h4 className="font-bold text-base text-slate-800 mt-2 line-clamp-2 leading-snug">{p.title}</h4>
                            <div className="text-amber-400 text-xs mt-1">⭐⭐⭐⭐⭐ <span className="text-slate-400 font-bold">({p.reviewsCount})</span></div>
                            
                            {p.features && (
                              <ul className="mt-3 space-y-1 text-xs text-slate-500 border-t border-pink-50 pt-2">
                                {p.features.map((feat, idx) => (
                                  <li key={idx} className="flex items-center gap-1.5">
                                    <span className="text-[#FF8BA7] font-bold">🌱</span> {feat}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-pink-50">
                            <div>
                              <span className="text-lg font-black text-slate-800">Rs. {p.price}.00</span>
                              {p.originalPrice > p.price && (
                                <span className="text-xs text-slate-400 line-through ml-2">Rs. {p.originalPrice}.00</span>
                              )}
                            </div>
                            <button onClick={() => addToCart(p)} className="bg-[#5B7B4B] hover:bg-[#4d6a3f] text-white text-xs font-bold px-5 py-3 rounded-full shadow-xs transition min-h-[48px]">Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </main>

              {/* 💬 SOCIAL PROOF: PARENT TESTIMONIALS CAROUSEL */}
              <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xs text-center space-y-4">
                  <span className="text-xs font-black uppercase text-[#FF8BA7] tracking-widest">💬 Verified Parent Reviews</span>
                  <div className="max-w-2xl mx-auto space-y-2">
                    <p className="text-lg sm:text-xl font-bold text-slate-800 italic">"{testimonials[activeTestimonial].text}"</p>
                    <div className="text-amber-400 text-sm">⭐⭐⭐⭐⭐</div>
                    <p className="text-xs font-black text-[#5B7B4B]">
                      {testimonials[activeTestimonial].name} <span className="text-slate-400 font-normal">({testimonials[activeTestimonial].location}) • {testimonials[activeTestimonial].role}</span>
                    </p>
                  </div>
                  <div className="flex justify-center space-x-2 pt-2">
                    {testimonials.map((_, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveTestimonial(idx)}
                        className={`w-3 h-3 rounded-full transition ${activeTestimonial === idx ? 'bg-[#FF8BA7] w-6' : 'bg-slate-200'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* 📸 SOCIAL PROOF: CUSTOMER PHOTOS GALLERY */}
              <section className="max-w-7xl mx-auto px-4 py-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-black text-[#3d592b]">📸 Sprouts in Action</h3>
                  <p className="text-xs text-slate-500">Real photos shared by parents using Edu Sprout learning kits at home!</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&auto=format&fit=crop&q=80', caption: 'Math combo in use! 🧮' },
                    { url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80', caption: 'Phonics audio guide 📖' },
                    { url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=300&auto=format&fit=crop&q=80', caption: 'Morning logic games 🧩' },
                    { url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&auto=format&fit=crop&q=80', caption: 'Happy reader! 🌸' }
                  ].map((item, idx) => (
                    <div key={idx} className="relative rounded-2xl overflow-hidden group border border-pink-100 shadow-xs h-36 sm:h-44">
                      <img src={item.url} alt="Learner using worksheet" className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 flex items-end p-2.5">
                        <span className="text-[10px] font-bold text-white">{item.caption}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FOOTER */}
              <footer className="bg-[#3D5233] text-slate-200 py-12 px-6 mt-12 text-xs">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">🌱 Edu Sprout World</h3>
                    <p className="text-slate-300 leading-relaxed">Providing high-quality physical and digital learning materials to build strong academic foundations with love and care.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-3 text-sm">Why Parents Trust Us</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li>• High-GSM Child-Safe Paper</li>
                      <li>• Instant Download Access</li>
                      <li>• Aligned with Foundational Curriculums</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-3 text-sm">Get in Touch</h4>
                    <div className="space-y-2.5 text-slate-300">
                      <a 
                        href={`https://wa.me/${contactInfo.whatsappRaw}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-2 text-green-300 hover:text-green-200 font-bold transition"
                      >
                        💬 Chat on WhatsApp ({contactInfo.whatsapp})
                      </a>

                      <p className="flex items-center gap-2">
                        ✉️ <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a>
                      </p>

                      <p className="flex items-center gap-2">
                        📸 <a href={contactInfo.instagramLink} target="_blank" rel="noreferrer" className="hover:underline">{contactInfo.instagram}</a>
                      </p>

                      <p className="text-[10px] text-slate-400 pt-1">
                        ⏰ {contactInfo.supportHours}
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </>
          )}

          {checkoutStep === 'details' && (
            <div className="max-w-md mx-auto my-12 bg-white p-6 rounded-3xl border border-pink-100 shadow-sm mx-4">
              <h3 className="text-base font-black text-slate-800 mb-4 flex items-center gap-1.5">💳 Shipping & Order Details</h3>
              <form onSubmit={handleCheckoutSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Parent's Full Name</label>
                  <input type="text" required value={customerDetails.name} onChange={e => setCustomerDetails({...customerDetails, name: e.target.value})} className="w-full border border-pink-100 p-3 rounded-2xl outline-none focus:border-[#FF8BA7] min-h-[48px]" placeholder="e.g. Priya Sharma"/>
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Contact Phone Number</label>
                  <input type="tel" required value={customerDetails.phone} onChange={e => setCustomerDetails({...customerDetails, phone: e.target.value})} className="w-full border border-pink-100 p-3 rounded-2xl outline-none focus:border-[#FF8BA7] min-h-[48px]"/>
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Delivery Address</label>
                  <textarea required rows="2" value={customerDetails.address} onChange={e => setCustomerDetails({...customerDetails, address: e.target.value})} className="w-full border border-pink-100 p-3 rounded-2xl outline-none focus:border-[#FF8BA7]"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#FF8BA7] hover:bg-[#ff7295] transition text-white font-bold py-3.5 rounded-full mt-2 shadow-xs min-h-[48px]">Confirm Order & Payment</button>
              </form>
            </div>
          )}

          {/* CART DRAWER WITH SECURE CHECKOUT BADGES */}
          {isCartOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-xs" onClick={() => setIsCartOpen(false)} />
              <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white p-5 shadow-2xl flex flex-col justify-between border-l border-pink-100">
                <div>
                  <div className="flex justify-between items-center pb-3 border-b border-pink-50 mb-4">
                    <h3 className="font-black text-sm text-slate-800">Your Basket</h3>
                    <button onClick={() => setIsCartOpen(false)} className="text-xl font-bold text-slate-400 p-2 min-h-[48px] min-w-[48px]">&times;</button>
                  </div>
                  {cart.length === 0 ? <p className="text-xs text-slate-400 text-center py-6">Your basket is empty.</p> : (
                    <div className="space-y-2">
                      {cart.map(i => (
                        <div key={i.id} className="flex justify-between items-center p-2.5 bg-pink-50/40 border border-pink-100 rounded-2xl text-xs">
                          <div className="flex-1 min-w-0 pr-2"><h5 className="font-bold text-slate-700 truncate">{i.title}</h5><p className="text-[10px] text-[#5B7B4B] font-bold">Rs. {i.price} x {i.quantity}</p></div>
                          <div className="flex items-center space-x-1.5 bg-white px-2 py-0.5 rounded-xl border border-pink-100"><button onClick={() => updateQuantity(i.id, -1)} className="text-slate-400 font-bold p-1 min-h-[36px]">-</button><span className="text-xs font-bold">{i.quantity}</span><button onClick={() => updateQuantity(i.id, 1)} className="text-slate-400 font-bold p-1 min-h-[36px]">+</button></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-pink-50 pt-3 space-y-3">
                    <div className="flex justify-between font-black text-xs"><span>Total Amount:</span><span>Rs. {cart.reduce((s, i) => s + (i.price * i.quantity), 0)}.00</span></div>
                    
                    {/* TRUST BADGES IN BASKET */}
                    <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">🔒 Guaranteed Safe & Secure Checkout</span>
                      <div className="flex justify-center space-x-2 text-xs text-slate-500 pt-0.5">
                        <span>💳 Visa</span>
                        <span>💳 Mastercard</span>
                        <span>📱 UPI</span>
                        <span>🔒 SSL</span>
                      </div>
                    </div>

                    <button onClick={() => { setIsCartOpen(false); setCheckoutStep('details'); }} className="w-full bg-[#FF8BA7] hover:bg-[#ff7295] transition text-white font-bold py-3 rounded-full text-xs text-center shadow-xs min-h-[48px]">Proceed to Checkout</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* ADMIN MODE */}
      {viewMode === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-green-200">
            <div>
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-1.5">⚙️ Store Control Center <span className="text-[10px] font-bold uppercase bg-[#5B7B4B] text-white px-2.5 py-0.5 rounded-full">Admin Panel</span></h2>
              <p className="text-slate-500">Manage banner sales, products, categories, contact info, and orders.</p>
            </div>
            <button onClick={() => setViewMode('buyer')} className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-full font-bold transition shadow-xs border border-green-100 min-h-[48px]">Exit Admin</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="space-y-6">
              {/* EDIT ANNOUNCEMENT BANNER */}
              <div className="bg-white p-5 rounded-3xl border border-pink-100 space-y-3 shadow-xs">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">📢 Running Announcement Banner</h3>
                  <label className="flex items-center cursor-pointer space-x-1 text-[10px] font-bold text-slate-500">
                    <input 
                      type="checkbox" 
                      checked={bannerConfig.enabled} 
                      onChange={e => setBannerConfig({...bannerConfig, enabled: e.target.checked})}
                      className="accent-[#FF8BA7]"
                    />
                    <span>Show Banner</span>
                  </label>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold text-[10px] mb-0.5">Banner Announcement Text</label>
                  <textarea 
                    rows="2" 
                    value={bannerConfig.text} 
                    onChange={e => setBannerConfig({...bannerConfig, text: e.target.value})} 
                    className="w-full border border-pink-100 p-2.5 rounded-2xl text-xs outline-none focus:border-[#FF8BA7]" 
                    placeholder="e.g. 20% OFF SUMMER SALE..."
                  />
                </div>
              </div>

              {/* Add New Product Form */}
              <div className="bg-white p-5 rounded-3xl border border-pink-100 space-y-3 shadow-xs">
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">➕ Add New Resource</h3>
                <form onSubmit={addProduct} className="space-y-2.5">
                  <input type="text" required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="w-full border border-pink-100 p-2.5 rounded-2xl text-xs outline-none focus:border-[#FF8BA7]" placeholder="Title..."/>
                  <input type="text" value={newProduct.img} onChange={e => setNewProduct({...newProduct, img: e.target.value})} className="w-full border border-pink-100 p-2.5 rounded-2xl text-xs outline-none focus:border-[#FF8BA7]" placeholder="Image URL..."/>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <select value={newProduct.subjectCategory} onChange={e => setNewProduct({...newProduct, subjectCategory: e.target.value})} className="w-full border border-pink-100 p-2 rounded-2xl bg-white text-xs">
                      {subjectList.filter(s => s.name !== 'All').map(sub => (
                        <option key={sub.name} value={sub.name}>{sub.name}</option>
                      ))}
                    </select>

                    <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full border border-pink-100 p-2 rounded-2xl bg-white text-xs">
                      <option value="Printed Worksheets">Printed Worksheets</option>
                      <option value="Digital E-Copies">Digital E-Copies</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border border-pink-100 p-2 rounded-2xl text-xs" placeholder="Sale Price (Rs.)"/>
                    <input type="number" value={newProduct.originalPrice} onChange={e => setNewProduct({...newProduct, originalPrice: e.target.value})} className="w-full border border-pink-100 p-2 rounded-2xl text-xs" placeholder="Original Price"/>
                  </div>
                  <input type="text" value={newProduct.badge} onChange={e => setNewProduct({...newProduct, badge: e.target.value})} className="w-full border border-pink-100 p-2 rounded-2xl text-xs" placeholder="Badge (e.g. Best Seller)"/>
                  <button type="submit" className="w-full bg-[#5B7B4B] hover:bg-[#4d6a3f] text-white font-bold py-3 rounded-full transition min-h-[48px]">Publish Resource</button>
                </form>
              </div>

              {/* EDIT CONTACT DETAILS */}
              <div className="bg-white p-5 rounded-3xl border border-pink-100 space-y-3 shadow-xs">
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">📞 Edit Store Contact Information</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-slate-400 font-bold text-[10px] mb-0.5">WhatsApp Number (Display)</label>
                    <input type="text" value={contactInfo.whatsapp} onChange={e => setContactInfo({...contactInfo, whatsapp: e.target.value})} className="w-full border border-pink-100 p-2 rounded-2xl text-xs"/>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold text-[10px] mb-0.5">WhatsApp Digits (for chat link)</label>
                    <input type="text" value={contactInfo.whatsappRaw} onChange={e => setContactInfo({...contactInfo, whatsappRaw: e.target.value})} className="w-full border border-pink-100 p-2 rounded-2xl text-xs" placeholder="e.g. 919999999999"/>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold text-[10px] mb-0.5">Support Email Address</label>
                    <input type="email" value={contactInfo.email} onChange={e => setContactInfo({...contactInfo, email: e.target.value})} className="w-full border border-pink-100 p-2 rounded-2xl text-xs"/>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold text-[10px] mb-0.5">Instagram Handle</label>
                    <input type="text" value={contactInfo.instagram} onChange={e => setContactInfo({...contactInfo, instagram: e.target.value})} className="w-full border border-pink-100 p-2 rounded-2xl text-xs"/>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-2 space-y-6">
              
              {/* CATEGORIES MANAGER */}
              <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">🏷️ Manage Subject Categories</h3>
                <form onSubmit={addCategory} className="flex gap-2">
                  <input type="text" value={newSubject.icon} onChange={e => setNewSubject({...newSubject, icon: e.target.value})} className="w-16 border border-pink-100 p-2 rounded-2xl text-xs text-center" placeholder="Icon"/>
                  <input type="text" required value={newSubject.name} onChange={e => setNewSubject({...newSubject, name: e.target.value})} className="flex-1 border border-pink-100 p-2 rounded-2xl text-xs" placeholder="New Category Name..."/>
                  <button type="submit" className="bg-[#FF8BA7] text-white px-4 py-2 rounded-full font-bold transition min-h-[48px]">Add Category</button>
                </form>

                <div className="flex flex-wrap gap-2 pt-2">
                  {subjectList.map(sub => (
                    <div key={sub.name} className="flex items-center space-x-1 bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-xl">
                      <span>{sub.icon}</span>
                      <span className="font-bold text-slate-700">{sub.name}</span>
                      {sub.name !== 'All' && (
                        <button onClick={() => deleteCategory(sub.name)} className="ml-1 text-red-500 hover:text-red-700 font-bold p-1">✕</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Manage Existing Products List */}
              <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-xs">
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-3">📦 Manage Store Catalog ({products.length} Products)</h3>
                <div className="space-y-2">
                  {products.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-pink-50/30 border border-pink-100 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <img src={p.img} alt={p.title} className="w-10 h-10 object-cover rounded-xl"/>
                        <div>
                          <h5 className="font-bold text-slate-800 line-clamp-1">{p.title}</h5>
                          <p className="text-[10px] text-slate-400">{p.subjectCategory || 'General'} • Rs. {p.price}.00</p>
                        </div>
                      </div>
                      <button onClick={() => deleteProduct(p.id)} className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[10px] font-bold px-3 py-1.5 rounded-xl transition min-h-[36px]">
                        🗑️ Delete Product
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Pipeline Table */}
              <div className="bg-white p-5 rounded-3xl border border-pink-100 overflow-x-auto shadow-xs">
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-3">📥 Received Customer Orders</h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-pink-50/50 text-slate-400 font-bold uppercase border-b border-pink-100 text-[10px]"><th className="p-2.5">Order ID</th><th className="p-2.5">Customer</th><th className="p-2.5">Products</th><th className="p-2.5">Total</th><th className="p-2.5 text-right">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-pink-50 text-slate-700">
                    {orders.map(o => (
                      <tr key={o.id} className="text-xs">
                        <td className="p-2.5 font-bold text-[#5B7B4B]">{o.id}</td>
                        <td className="p-2.5"><strong>{o.customer}</strong><br/><span className="text-[10px] text-slate-400">{o.date}</span></td>
                        <td className="p-2.5 max-w-[150px] truncate">{o.items}</td>
                        <td className="p-2.5 font-black">Rs. {o.total}.00</td>
                        <td className="p-2.5 text-right">
                          <select value={o.status} onChange={e => setOrders(orders.map(ord => ord.id === o.id ? {...ord, status: e.target.value} : ord))} className="p-1.5 border border-pink-100 rounded-xl bg-white text-[10px] font-bold">
                            <option value="Paid & Processing">Processing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered ✓">Delivered ✓</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
