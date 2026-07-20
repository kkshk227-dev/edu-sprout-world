import React, { useState } from 'react';

export default function App() {
  // --- MOCK DATABASE (State) ---
  const [products, setProducts] = useState([
    { id: 1, title: 'Multiplication Fluency Booklets (Times Tables 2-20 Combo)', ageGroup: '7-9 years', category: 'Printed Worksheets', price: 699, originalPrice: 998, rating: 5.0, reviewsCount: 24, badge: 'Best Seller', img: '🔢' },
    { id: 2, title: 'The Advance Phonics Pack (Full Set with Audio Guides)', ageGroup: '4-6 years', category: 'Printed Worksheets', price: 749, originalPrice: 749, rating: 5.0, reviewsCount: 20, badge: 'Popular', img: '🗣️' },
    { id: 3, title: 'Brain Games & Logical Reasoning Puzzles', ageGroup: '7-9 years', category: 'Digital E-Copies', price: 299, originalPrice: 399, rating: 4.9, reviewsCount: 16, badge: 'Sale', img: '🧩' }
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-9832', customer: 'Ananya Sharma', items: 'Advanced Phonics Pack x1', total: 749, status: 'Processing', date: '2026-07-20' }
  ]);

  // --- VIEW MODE TOGGLE ---
  const [viewMode, setViewMode] = useState('buyer'); // 'buyer' or 'admin'
  
  // --- BUYER STATE ---
  const [selectedAge, setSelectedAge] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('browse'); // browse, details, confirmation
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', address: '' });
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);

  // --- ADMIN STATE ---
  const [newProduct, setNewProduct] = useState({ title: '', ageGroup: '4-6 years', category: 'Printed Worksheets', price: '', originalPrice: '', badge: '', img: '📚' });

  // --- BUYER LOGIC ---
  const filteredProducts = products.filter(p => {
    return (selectedAge === 'All' || p.ageGroup === selectedAge) && (selectedCategory === 'All' || p.category === selectedCategory);
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
    setProducts([...products, { ...newProduct, id: Date.now(), price: Number(newProduct.price), originalPrice: Number(newProduct.originalPrice || newProduct.price), rating: 5.0, reviewsCount: 1 }]);
    setNewProduct({ title: '', ageGroup: '4-6 years', category: 'Printed Worksheets', price: '', originalPrice: '', badge: '', img: '📚' });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans text-slate-800">
      
      {/* Top Banner & Dashboard Link */}
      <div className="bg-emerald-900 text-white px-6 py-2.5 text-xs font-bold flex justify-between items-center shadow-md">
        <span>✨ Premium Interactive Home Learning Resources ✨</span>
        <button 
          onClick={() => setViewMode(viewMode === 'buyer' ? 'admin' : 'buyer')}
          className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all"
        >
          {viewMode === 'buyer' ? '🔒 Open Admin Panel' : '👋 Return to Storefront'}
        </button>
      </div>

      {/* ================= BUYER MODE ================= */}
      {viewMode === 'buyer' && (
        <>
          <header className="bg-white text-slate-900 sticky top-0 z-40 shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div onClick={() => setCheckoutStep('browse')} className="cursor-pointer flex items-center space-x-3">
                <span className="text-3xl">🌱</span>
                <div>
                  <h1 className="text-xl font-black text-emerald-800 tracking-tight">Edu Sprout World</h1>
                  <p className="text-[10px] uppercase font-bold text-pink-500 tracking-widest">Premium Educational Material</p>
                </div>
              </div>
              <button onClick={() => setIsCartOpen(true)} className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition shadow-sm">
                <span>🛒 Shopping Basket</span>
                <span className="bg-pink-500 text-white rounded-full px-2 py-0.5 text-[11px] font-black">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
              </button>
            </div>
          </header>

          {checkoutStep === 'confirmation' && (
            <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl shadow-sm text-center border">
              <span className="text-5xl block mb-2">🎉</span>
              <h2 className="text-xl font-black text-slate-900 mb-1">Order Placed Successfully!</h2>
              <p className="text-xs text-slate-500 mb-6">Your materials are getting routed. Confirmation sent.</p>
              <div className="bg-slate-50 p-4 rounded-xl mb-6 text-left text-xs border">
                <p className="font-bold text-slate-400">YOUR SYSTEM GENERATED ORDER ID</p>
                <p className="text-base font-black text-emerald-800 mb-1">{lastPlacedOrder?.id}</p>
                <p><strong>Total Final Amount:</strong> Rs. {lastPlacedOrder?.total}.00 (Paid)</p>
              </div>
              <button onClick={() => setCheckoutStep('browse')} className="bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl w-full">Continue Browsing</button>
            </div>
          )}

          {checkoutStep === 'browse' && (
            <>
              {/* Order Tracking Bar */}
              <div className="bg-pink-50 border-b py-3 px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-pink-950">📦 Live Customer Tracking Terminal:</span>
                  <div className="flex border rounded-lg overflow-hidden bg-white shadow-sm">
                    <input type="text" placeholder="Enter Order ID (e.g. ORD-9832)" value={searchOrderId} onChange={e => setSearchOrderId(e.target.value)} className="px-3 py-1.5 outline-none text-xs w-48"/>
                    <button onClick={trackOrder} className="bg-pink-500 text-white font-bold px-4 py-1.5 hover:bg-pink-600 transition">Track</button>
                  </div>
                </div>
                {trackedOrder && (
                  <div className="max-w-7xl mx-auto mt-2 p-2.5 bg-white rounded-lg border text-xs shadow-xs">
                    {trackedOrder === 'not_found' ? <p className="text-red-600 font-bold">⚠️ Order ID system mismatch. Please recheck your digits.</p> : <p>Order Identifier <strong>{trackedOrder.id}</strong> current pipeline status: <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">{trackedOrder.status}</span></p>}
                  </div>
                )}
              </div>

              {/* Main Catalog View */}
              <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
                <aside className="w-full md:w-56 bg-white p-4 rounded-xl border shrink-0 h-fit space-y-4 shadow-xs">
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase mb-2">Age Target</h4>
                    <div className="flex flex-col space-y-1">
                      {['All', '4-6 years', '7-9 years'].map(age => (
                        <button key={age} onClick={() => setSelectedAge(age)} className={`text-left px-3 py-1.5 rounded-lg text-xs font-bold transition ${selectedAge === age ? 'bg-pink-500 text-white shadow-xs' : 'hover:bg-slate-50 text-slate-600'}`}>{age === 'All' ? '🎒 All Ages' : age}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase mb-2">Resource Type</h4>
                    <div className="flex flex-col space-y-1">
                      {['All', 'Printed Worksheets', 'Digital E-Copies'].map(cat => (
                        <button key={cat} onClick={() => setSelectedCategory(cat)} className={`text-left px-3 py-1.5 rounded-lg text-xs font-bold transition ${selectedCategory === cat ? 'bg-emerald-700 text-white shadow-xs' : 'hover:bg-slate-50 text-slate-600'}`}>{cat === 'All' ? '📚 All Formats' : cat}</button>
                      ))}
                    </div>
                  </div>
                </aside>

                <section className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map(p => (
                      <div key={p.id} className="bg-white rounded-xl border overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-200">
                        <div className="bg-slate-50 p-6 text-center text-3xl relative border-b border-slate-100">
                          {p.badge && <span className="absolute top-2 left-2 text-[9px] font-black uppercase bg-pink-500 text-white px-2 py-0.5 rounded shadow-xs">{p.badge}</span>}
                          {p.img}
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{p.category}</span>
                            <h4 className="font-bold text-xs text-slate-800 mt-2 line-clamp-2 min-h-[32px] leading-tight">{p.title}</h4>
                            <div className="text-amber-400 text-[10px] mt-1">⭐⭐⭐⭐⭐ <span className="text-slate-400 font-bold">({p.reviewsCount})</span></div>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-sm font-black text-slate-900">Rs. {p.price}.00</span>
                            <button onClick={() => addToCart(p)} className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xs transition">Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </main>
            </>
          )}

          {checkoutStep === 'details' && (
            <div className="max-w-md mx-auto my-12 bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-1.5">💳 Secure Shipping & Verification</h3>
              <form onSubmit={handleCheckoutSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Parent's Full Name</label>
                  <input type="text" required value={customerDetails.name} onChange={e => setCustomerDetails({...customerDetails, name: e.target.value})} className="w-full border p-2 rounded-lg outline-none focus:border-emerald-700" placeholder="e.g. Priya Sharma"/>
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Contact Phone Number</label>
                  <input type="tel" required value={customerDetails.phone} onChange={e => setCustomerDetails({...customerDetails, phone: e.target.value})} className="w-full border p-2 rounded-lg outline-none focus:border-emerald-700"/>
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Delivery Address</label>
                  <textarea required rows="2" value={customerDetails.address} onChange={e => setCustomerDetails({...customerDetails, address: e.target.value})} className="w-full border p-2 rounded-lg outline-none focus:border-emerald-700"></textarea>
                </div>
                <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 transition text-white font-bold py-2.5 rounded-lg mt-2 shadow">Confirm Secure Payment & Order</button>
              </form>
            </div>
          )}

          {/* Sliding Cart Panel */}
          {isCartOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={() => setIsCartOpen(false)} />
              <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white p-4 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center pb-2 border-b mb-4"><h3 className="font-bold text-sm text-slate-800">Shopping Cart Basket</h3><button onClick={() => setIsCartOpen(false)} className="text-xl font-bold text-slate-400">&times;</button></div>
                  {cart.length === 0 ? <p className="text-xs text-slate-400 text-center py-6">Basket is empty.</p> : (
                    <div className="space-y-2">
                      {cart.map(i => (
                        <div key={i.id} className="flex justify-between items-center p-2 bg-slate-50 border rounded-lg text-xs">
                          <div className="flex-1 min-w-0 pr-2"><h5 className="font-bold text-slate-700 truncate">{i.title}</h5><p className="text-[10px] text-emerald-800 font-bold">Rs. {i.price} x {i.quantity}</p></div>
                          <div className="flex items-center space-x-1.5 bg-white px-1.5 py-0.5 rounded border"><button onClick={() => updateQuantity(i.id, -1)} className="text-slate-400 font-bold">-</button><span className="text-xs font-bold">{i.quantity}</span><button onClick={() => updateQuantity(i.id, 1)} className="text-slate-400 font-bold">+</button></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-black text-xs mb-3"><span>Cart Subtotal:</span><span>Rs. {cart.reduce((s, i) => s + (i.price * i.quantity), 0)}.00</span></div>
                    <button onClick={() => { setIsCartOpen(false); setCheckoutStep('details'); }} className="w-full bg-pink-500 hover:bg-pink-600 transition text-white font-bold py-2 rounded-lg text-xs text-center shadow">Proceed to Checkout</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= ADMIN MODE ================= */}
      {viewMode === 'admin' && (
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs animate-fadeIn">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-1.5">⚙️ Store Control Center <span className="text-[10px] font-bold uppercase bg-emerald-800 text-white px-2 py-0.5 rounded">Secure Admin Mode</span></h2>
              <p className="text-slate-400">Add materials to the public grid and manage order status logic tracking.</p>
            </div>
            <button onClick={() => setViewMode('buyer')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-bold transition">Exit Admin Terminal</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add Resource Item Section */}
            <div className="bg-white p-4 rounded-xl border h-fit space-y-3 shadow-sm">
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">➕ Add New Resource Pack</h3>
              <form onSubmit={addProduct} className="space-y-2">
                <input type="text" required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="w-full border p-2 rounded-lg text-xs outline-none focus:border-emerald-700" placeholder="Resource Title Name..."/>
                <div className="grid grid-cols-2 gap-2">
                  <select value={newProduct.ageGroup} onChange={e => setNewProduct({...newProduct, ageGroup: e.target.value})} className="w-full border p-2 rounded-lg bg-white text-xs"><option value="4-6 years">4-6 years</option><option value="7-9 years">7-9 years</option></select>
                  <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full border p-2 rounded-lg bg-white text-xs"><option value="Printed Worksheets">Printed Worksheets</option><option value="Digital E-Copies">Digital E-Copies</option></select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border p-2 rounded-lg text-xs" placeholder="Sale Price (Rs.)"/>
                  <input type="number" value={newProduct.originalPrice} onChange={e => setNewProduct({...newProduct, originalPrice: e.target.value})} className="w-full border p-2 rounded-lg text-xs" placeholder="Original Price"/>
                </div>
                <input type="text" value={newProduct.badge} onChange={e => setNewProduct({...newProduct, badge: e.target.value})} className="w-full border p-2 rounded-lg text-xs" placeholder="Badge Tag (e.g. Best Seller)"/>
                <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-lg shadow-xs transition">Publish Live Item</button>
              </form>
            </div>

            {/* Admin Order Monitor Grid */}
            <div className="lg:col-span-2 bg-white p-4 rounded-xl border overflow-x-auto shadow-sm">
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-3">📥 Order Pipeline Database ({orders.length})</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-bold uppercase border-b text-[10px]"><th className="p-2">Order ID</th><th className="p-2">Customer Info</th><th className="p-2">Products Selected</th><th className="p-2">Total Received</th><th className="p-2 text-right">Fulfillment Logic</th></tr>
                </thead>
                <tbody className="divide-y text-slate-700">
                  {orders.map(o => (
                    <tr key={o.id} className="text-xs hover:bg-slate-50/50">
                      <td className="p-2 font-bold text-emerald-800">{o.id}</td>
                      <td className="p-2"><strong>{o.customer}</strong><br/><span className="text-[10px] text-slate-400">{o.date}</span></td>
                      <td className="p-2 max-w-[150px] truncate font-medium">{o.items}</td>
                      <td className="p-2 font-black">Rs. {o.total}.00</td>
                      <td className="p-2 text-right">
                        <select value={o.status} onChange={e => setOrders(orders.map(ord => ord.id === o.id ? {...ord, status: e.target.value} : ord))} className="p-1 border rounded bg-white text-[10px] font-bold text-slate-800 outline-none">
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
      )}
    </div>
  );
}
