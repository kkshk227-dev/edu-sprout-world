import React, { useState } from 'react';

// Mock Product Data for Edu Sprout World
const initialProducts = [
  { id: 1, title: 'Grade 1-3: Intro to Coding & Algorithms', grade: '1-3', subject: 'Coding', price: 499, type: 'Digital (PDF)', img: '💻' },
  { id: 2, title: 'Grade 4-5: Science Wonders Experiment Kit', grade: '4-5', subject: 'Science', price: 1299, type: 'Physical Kit', img: '🔬' },
  { id: 3, title: 'Grade 6-8: AI & Machine Learning Basics', grade: '6-8', subject: 'AI', price: 799, type: 'Digital (PDF)', img: '🤖' },
  { id: 4, title: 'Grade 1-3: Fun Fun Science Activity Book', grade: '1-3', subject: 'Science', price: 350, type: 'Printed Book', img: '🌱' },
  { id: 5, title: 'Grade 4-5: Scratch Coding Workbook', grade: '4-5', subject: 'Coding', price: 450, type: 'Printed Book', img: '👾' },
  { id: 6, title: 'Grade 6-8: Python & Data Science Guide', grade: '6-8', subject: 'Coding', price: 899, type: 'Digital (PDF)', img: '🐍' },
];

export default function App() {
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Dual-Axis Filtering Logic
  const filteredProducts = initialProducts.filter(product => {
    const matchGrade = selectedGrade === 'All' || product.grade === selectedGrade;
    const matchSubject = selectedSubject === 'All' || product.subject === selectedSubject;
    return matchGrade && matchSubject;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
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

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header Banner */}
      <header className="bg-emerald-700 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌱</span>
            <h1 className="text-2xl font-bold tracking-wide">Edu Sprout World</h1>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-full transition shadow flex items-center space-x-2"
          >
            <span>🛒 Cart</span>
            <span className="bg-white text-pink-600 rounded-full px-2 py-0.5 text-xs font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar Filter Section */}
        <aside className="w-full md:w-64 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 shrink-0 h-fit">
          <h2 className="text-lg font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <span>🔍</span> Filters
          </h2>
          
          {/* Grade Axis */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Age / Grade</label>
            <div className="flex flex-col space-y-2">
              {['All', '1-3', '4-5', '6-8'].map(grade => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`text-left px-3 py-2 rounded-lg font-medium transition text-sm ${
                    selectedGrade === grade 
                      ? 'bg-pink-100 text-pink-700 border-l-4 border-pink-500' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {grade === 'All' ? '🎒 All Grades' : `Grade ${grade}`}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Axis */}
          <div>
            <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Subject</label>
            <div className="flex flex-col space-y-2">
              {['All', 'Science', 'Coding', 'AI'].map(subj => (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`text-left px-3 py-2 rounded-lg font-medium transition text-sm ${
                    selectedSubject === subj 
                      ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {subj === 'All' ? '📚 All Subjects' : subj}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Showcase */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-500 font-medium">Showing {filteredProducts.length} materials</p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-dashed border-slate-200">
              <span className="text-4xl block mb-2">🍃</span>
              <p className="text-slate-500 font-medium">No resources found matching these exact criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="text-4xl mb-4 bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center">{product.img}</div>
                    <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md">
                      {product.type}
                    </span>
                    <h3 className="font-bold text-slate-800 mt-2 mb-1 text-base leading-snug">{product.title}</h3>
                    <p className="text-xs text-slate-400 font-medium mb-4">Grade {product.grade} • {product.subject}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <span className="text-lg font-extrabold text-slate-900">₹{product.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2 rounded-xl transition shadow-sm"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col justify-between">
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">🛒 Review Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
              </div>

              {cart.length === 0 ? (
                <p className="text-slate-400 text-center py-12 font-medium">Your shopping cart is currently empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-xl items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-700 text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-400 font-medium">₹{item.price} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2 bg-white rounded-lg border px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-500 font-bold px-1 hover:text-pink-500">-</button>
                        <span className="font-bold text-sm text-slate-700 w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-500 font-bold px-1 hover:text-emerald-600">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Area */}
            {cart.length > 0 && (
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-500 font-semibold">Estimated Total:</span>
                  <span className="text-2xl font-black text-slate-900">₹{cartTotal}</span>
                </div>
                <button 
                  onClick={() => alert('Backend Checkout Initialized!')}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl shadow transition tracking-wide text-center block"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
