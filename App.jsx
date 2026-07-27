import React, { useState } from 'react';

export default function App() {
  // --- SITE TYPOGRAPHY & COLOR THEME STATE (EDITABLE IN ADMIN) ---
  const [fontFamily, setFontFamily] = useState("'Quicksand', sans-serif");
  const [themeColors, setThemeColors] = useState({
    primary: '#8385A9',      // Main slate blue-purple
    accent: '#D37B9F',       // Soft mauve pink
    bgSoft: '#FAF9F6',       // Off-white paper background
    topBarBg: '#8385A9',     // Top announcement banner background
    heroBg: '#FAF9F6',       // Hero band background
    footerBg: '#8385A9',     // Footer band background
  });

  // --- BRAND LOGO POSITIONING & SIZE CONFIG (EDITABLE IN ADMIN) ---
  const [logoUrl, setLogoUrl] = useState('https://i.ibb.co/jvHcxPt9/no-bg2.png');
  const [logoHeight, setLogoHeight] = useState(85);      // Height in pixels
  const [logoOffsetX, setLogoOffsetX] = useState(-7);     // Left/Right shift
  const [logoOffsetY, setLogoOffsetY] = useState(18);     // Up/Down shift
  const [logoScale, setLogoScale] = useState(2.0);        // Zoom multiplier

  // Function to reset logo alignment back to standard baseline
  const resetLogoAlignment = () => {
    setLogoOffsetX(-7);
    setLogoOffsetY(18);
    setLogoScale(2.0);
    setLogoHeight(85);
  };

  return (
    <div style={{ fontFamily }} className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <div 
        style={{ backgroundColor: themeColors.topBarBg }} 
        className="py-2 px-4 text-white text-center text-sm font-medium transition-colors"
      >
        ✨ SPECIAL SALE: Get 20% off all Printable Packs this week! Use code: BRIDGE20 ✨
      </div>

      {/* 2. HEADER */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Main Logo Container */}
          <div className="flex items-center overflow-hidden py-2">
            <img
              src={logoUrl}
              alt="Paper Bridge Logo"
              style={{
                height: `${logoHeight}px`,
                transform: `translate(${logoOffsetX}px, ${logoOffsetY}px) scale(${logoScale})`,
                objectFit: 'contain',
                transition: 'transform 0.1s ease-out',
              }}
              className="select-none pointer-events-none"
            />
          </div>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#workbooks" className="hover:text-slate-900">Workbooks</a>
            <a href="#printables" className="hover:text-slate-900">Printable Packs</a>
            <a href="#about" className="hover:text-slate-900">About Us</a>
          </nav>
        </div>
      </header>

      {/* 3. HERO & MAIN CONTENT */}
      <main className="flex-1">
        <section style={{ backgroundColor: themeColors.heroBg }} className="py-16 px-6 text-center border-b border-slate-100 transition-colors">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full">
              🌸 LOVED BY 10,000+ PARENTS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Nurture Young Minds With Thoughtful Resources
            </h1>
            <p className="text-slate-600 text-base md:text-lg">
              Discover beautifully crafted printed workbooks and instant digital packs designed to make reading, writing, math, and logic fun for young learners.
            </p>
            <div className="pt-4">
              <button 
                style={{ backgroundColor: themeColors.accent }} 
                className="text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:opacity-95 transition"
              >
                🧮 SHOP ALL WORKBOOKS 👈
              </button>
            </div>
          </div>
        </section>

        {/* 4. ADMIN CONTROL PANEL */}
        <section className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              ⚙️ Admin Control Center
            </h3>
            <button 
              onClick={resetLogoAlignment}
              className="text-xs font-medium px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition"
            >
              🎯 Reset Logo Alignment
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LOGO POSITIONING CONTROLS */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-slate-700 border-b pb-2">🖼️ Logo Position & Scale</h4>
              
              <div>
                <label className="text-xs font-medium text-slate-600 flex justify-between">
                  <span>Up / Down Shift (Y Axis)</span>
                  <span>{logoOffsetY}px</span>
                </label>
                <input 
                  type="range" min="-50" max="50" value={logoOffsetY} 
                  onChange={(e) => setLogoOffsetY(Number(e.target.value))}
                  className="w-full accent-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 flex justify-between">
                  <span>Left / Right Shift (X Axis)</span>
                  <span>{logoOffsetX}px</span>
                </label>
                <input 
                  type="range" min="-50" max="50" value={logoOffsetX} 
                  onChange={(e) => setLogoOffsetX(Number(e.target.value))}
                  className="w-full accent-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 flex justify-between">
                  <span>Zoom / Scale Factor</span>
                  <span>{logoScale}x</span>
                </label>
                <input 
                  type="range" min="0.5" max="3.0" step="0.1" value={logoScale} 
                  onChange={(e) => setLogoScale(Number(e.target.value))}
                  className="w-full accent-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 flex justify-between">
                  <span>Base Image Height</span>
                  <span>{logoHeight}px</span>
                </label>
                <input 
                  type="range" min="40" max="150" value={logoHeight} 
                  onChange={(e) => setLogoHeight(Number(e.target.value))}
                  className="w-full accent-slate-700"
                />
              </div>
            </div>

            {/* BAND & THEME COLOR CONTROLS */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-slate-700 border-b pb-2">🎨 All Band Background Colors</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Top Bar Band</label>
                  <input 
                    type="color" 
                    value={themeColors.topBarBg} 
                    onChange={(e) => setThemeColors({ ...themeColors, topBarBg: e.target.value })}
                    className="h-10 w-full rounded border cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Hero Band</label>
                  <input 
                    type="color" 
                    value={themeColors.heroBg} 
                    onChange={(e) => setThemeColors({ ...themeColors, heroBg: e.target.value })}
                    className="h-10 w-full rounded border cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Footer Band</label>
                  <input 
                    type="color" 
                    value={themeColors.footerBg} 
                    onChange={(e) => setThemeColors({ ...themeColors, footerBg: e.target.value })}
                    className="h-10 w-full rounded border cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Accent Button Color</label>
                  <input 
                    type="color" 
                    value={themeColors.accent} 
                    onChange={(e) => setThemeColors({ ...themeColors, accent: e.target.value })}
                    className="h-10 w-full rounded border cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. FOOTER */}
      <footer style={{ backgroundColor: themeColors.footerBg }} className="py-12 px-6 text-white transition-colors mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="flex flex-col space-y-3">
            <div className="flex items-center overflow-hidden py-2">
              <img
                src={logoUrl}
                alt="Paper Bridge Logo"
                style={{
                  height: `${logoHeight}px`,
                  transform: `translate(${logoOffsetX}px, ${logoOffsetY}px) scale(${logoScale})`,
                  objectFit: 'contain',
                }}
                className="select-none pointer-events-none"
              />
            </div>
            <p className="text-xs text-slate-200 max-w-sm">
              Providing high-quality physical and digital learning materials to build strong academic foundations with love and care.
            </p>
          </div>

          <div className="text-left md:text-right text-xs text-slate-200 space-y-1">
            <p className="font-semibold text-white">Why Parents Trust Us</p>
            <p>• High-GSM Child-Safe Paper Packs</p>
            <p>• Instant Download Access</p>
            <p>• Aligned with Foundational Learning Standards</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
