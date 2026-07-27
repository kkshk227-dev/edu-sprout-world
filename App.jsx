import React, { useState } from 'react';

export default function App() {
  // --- SITE TYPOGRAPHY & COLOR THEME STATE ---
  const [fontFamily, setFontFamily] = useState("'Quicksand', sans-serif");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [themeColors, setThemeColors] = useState({
    primary: '#4F61C0',      // Main slate blue-purple
    accent: '#D37B9F',       // Soft mauve pink
    heroBg: '#FAF9F6',       // Hero background off-white
    testimonialBg: '#FDF0F5' // Soft pink for parent reviews section
  });

  // --- BRAND LOGO POSITIONING & SIZE CONFIG ---
  const [logoUrl, setLogoUrl] = useState('https://i.ibb.co/jvHcxPt9/no-bg2.png');
  const [logoHeight, setLogoHeight] = useState(85);      // Height in pixels
  const [logoOffsetX, setLogoOffsetX] = useState(-7);     // Left/Right shift
  const [logoOffsetY, setLogoOffsetY] = useState(18);     // Up/Down shift
  const [logoScale, setLogoScale] = useState(2.0);        // Zoom multiplier

  const resetLogoAlignment = () => {
    setLogoOffsetX(-7);
    setLogoOffsetY(18);
    setLogoScale(2.0);
    setLogoHeight(85);
  };

  // Shared Logo Component with uniform wrapper
  const RenderLogo = () => (
    <div className="flex items-center overflow-hidden py-1" style={{ height: `${logoHeight}px` }}>
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
  );

  return (
    <div style={{ fontFamily }} className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      
      {/* 1. TOP ANNOUNCEMENT TICKER */}
      <div className="bg-[#8385A9] py-2 px-4 text-white text-center text-xs md:text-sm font-medium tracking-wide">
        ✨ SPECIAL SALE: Get 20% off all Printable Packs this week! Use code: BRIDGE20 ✨
      </div>

      {/* 2. SUB-BANNER WITH ADMIN PANEL TOGGLE */}
      <div style={{ backgroundColor: themeColors.primary }} className="py-2 px-6 text-white text-xs md:text-sm transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>✨ Bridging Imagination & Learning, One Page at a Time ✨</span>
          <button 
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            style={{ backgroundColor: themeColors.accent }}
            className="text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm hover:opacity-90 transition flex items-center gap-1"
          >
            ⚙️ {isAdminOpen ? 'CLOSE ADMIN PANEL' : 'OPEN ADMIN PANEL'}
          </button>
        </div>
      </div>

      {/* 3. MAIN HEADER */}
      <header className="bg-white border-b border-slate-100 py-4 px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <RenderLogo />

          {/* Right Action: Shopping Basket */}
          <div className="flex items-center gap-4">
            <button 
              style={{ backgroundColor: themeColors.primary }}
              className="text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm hover:opacity-90 transition flex items-center gap-2"
            >
              🛒 Shopping Basket <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px]">0</span>
            </button>
          </div>
        </div>
      </header>

      {/* 4. HERO SECTION */}
      <main className="flex-1">
        <section style={{ backgroundColor: themeColors.heroBg }} className="py-14 px-8 border-b border-slate-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block bg-pink-100/80 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full border border-pink-200/50">
                🌸 LOVED BY 10,000+ PARENTS
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 leading-[1.15]">
                Nurture Young Minds <br />
                <span style={{ color: themeColors.accent }}>With Thoughtful Resources</span>
              </h1>
              
              <p className="text-slate-600 text-sm md:text-base max-w-xl leading-relaxed">
                Discover beautifully crafted printed workbooks and instant digital packs designed to make reading, writing, math, and logic fun for young learners.
              </p>
              
              <div className="pt-2">
                <button 
                  style={{ backgroundColor: themeColors.accent }} 
                  className="text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-md hover:opacity-95 transition flex items-center gap-2"
                >
                  🧮 SHOP ALL WORKBOOKS 🛍️
                </button>
              </div>
            </div>

            {/* Right Column: Rating & Psychologist Badge */}
            <div className="lg:col-span-5 flex flex-col gap-4 items-center lg:items-end">
              
              {/* Psychologist Endorsement Card */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/80 w-full max-w-xs flex items-center gap-3">
                <div className="text-2xl">🎓</div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">"Pedagogically Aligned Materials"</p>
                  <p className="text-[11px] text-slate-500">— Dr. Meera K., Child Psychologist</p>
                </div>
              </div>

              {/* Approval & Rating Badges */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                <div className="bg-white/80 p-3.5 rounded-2xl shadow-sm border border-slate-100 text-center">
                  <p className="text-lg font-bold text-slate-800">100%</p>
                  <p className="text-[11px] text-slate-500 font-medium">Kid-Approved</p>
                </div>
                <div className="bg-white/80 p-3.5 rounded-2xl shadow-sm border border-slate-100 text-center">
                  <p className="text-lg font-bold text-slate-800 flex items-center justify-center gap-1">
                    4.9 <span className="text-amber-400 text-sm">★</span>
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">Parent Rating</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 5. VERIFIED REVIEWS SECTION (SOFT PINK BACKGROUND) */}
        <section style={{ backgroundColor: themeColors.testimonialBg }} className="py-12 px-6 text-center border-y border-pink-100">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-bold tracking-wider text-pink-500 uppercase flex items-center justify-center gap-1">
              💬 VERIFIED PARENT REVIEWS
            </span>
            <blockquote className="text-slate-800 italic text-base md:text-lg font-medium leading-relaxed">
              “Instant PDF downloads are a lifesaver for weekend homeschooling sessions.”
            </blockquote>
            <div className="flex justify-center gap-1 text-amber-400 text-xs">
              ★★★★★
            </div>
            <p className="text-xs text-slate-500">
              Ananya S. (Mumbai) • Homeschooling Mom
            </p>
          </div>
        </section>

        {/* 6. ADMIN CONTROL PANEL (TOGGLED ON/OFF) */}
        {isAdminOpen && (
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
              {/* LOGO CONTROLS */}
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

              {/* COLOR CONTROLS */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-slate-700 border-b pb-2">🎨 Theme Colors</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Primary Theme Color</label>
                    <input 
                      type="color" 
                      value={themeColors.primary} 
                      onChange={(e) => setThemeColors({ ...themeColors, primary: e.target.value })}
                      className="h-10 w-full rounded border cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Accent Pink Color</label>
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
        )}
      </main>

      {/* 7. FOOTER (CLEAN WHITE THEME & 3 COLUMNS) */}
      <footer className="bg-white border-t border-slate-200 py-12 px-8 text-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Identical Logo + Description */}
          <div className="flex flex-col space-y-2">
            <RenderLogo />
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
              Providing high-quality physical and digital learning materials to build strong academic foundations with love and care.
            </p>
          </div>

          {/* Column 2: Why Parents Trust Us */}
          <div className="text-xs text-slate-600 space-y-2">
            <p className="font-bold text-sm text-slate-900 mb-2">Why Parents Trust Us</p>
            <p>• High-GSM Child-Safe Paper</p>
            <p>• Instant Download Access</p>
            <p>• Aligned with Foundational Curriculums</p>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="text-xs text-slate-600 space-y-2">
            <p className="font-bold text-sm text-slate-900 mb-2">Get in Touch</p>
            <p>💬 Chat on WhatsApp (+91 99...)</p>
            <p>✉️ support@paperbridge.co</p>
            <p>📷 @paperbridge</p>
            <p className="pt-1">⏰ Mon–Sat (9 AM – 6 PM)</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
