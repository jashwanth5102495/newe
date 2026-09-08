import React, { useState, useEffect, useRef } from 'react';
import StarBorder from './StarBorder.jsx';
import './StarBorder.css';
import { PRODUCTS, findProductBySlug } from './productsData.js';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const videoRef = useRef(null);
  const [currentProduct, setCurrentProduct] = useState(() => {
    const pathname = window.location.pathname.split('/').pop() || '';
    return findProductBySlug(pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname.split('/').pop() || '';
      setCurrentProduct(findProductBySlug(pathname));
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = currentProduct.displayName || currentProduct.brand;
  }, [currentProduct]);

  useEffect(() => {
    if (showIntro && videoRef.current) {
      const video = videoRef.current;
      video.muted = false;
      video.play().catch((error) => {
        console.log('Autoplay with sound failed, but video will play muted:', error);
      });
    }
  }, [showIntro]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Intro overlay */}
      {showIntro && (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            className="max-h-screen w-auto"
            src="/intro take 4.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/new.jpeg"
            controls
            onEnded={() => setShowIntro(false)}
          />
          <button
            className="absolute top-4 right-4 px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white hover:bg-white/20"
            onClick={() => setShowIntro(false)}
          >
            Skip
          </button>
        </div>
      )}

      <img className="fixed inset-0 -z-30 w-full h-full object-cover" src="/try1.png" alt="Background" loading="eager" fetchPriority="high" decoding="async" />

      {/* top spacer */}
      <div className="h-4 sm:h-6" />

      {/* Header box with logo video */}
      <header className="pt-0 sm:pt-0 mt-6 sm:mt-8 pb-6 text-center select-none">
        <div className="mx-auto w-[320px] sm:w-[500px] max-w-[92vw] h-[200px] sm:h-[260px] rounded-2xl bg-white/8 border border-white/20 backdrop-blur-md overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
            <video 
              src="/lo.mp4" 
              className="w-full h-full object-cover rounded-2xl bg-white/8 backdrop-blur-md ring-1 ring-white/20 shadow-inner" 
              autoPlay 
              controls
              loop 
              playsInline 
            />
          </div>
        <div className="mt-2 text-xs sm:text-sm text-white font-semibold tracking-wide">Bio‑Stimulant Registration Details</div>
      </header>

      {/* Main panel */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 pb-16">
        {/* Product Name FIRST */}
        <section className="mx-auto max-w-3xl mt-6">
          <StarBorder as="div" className="w-full" color="cyan" speed="5s" thickness={2}>
            <div className="relative rounded-2xl bg-white/8 border border-white/20 backdrop-blur-md p-4 sm:p-6 flex items-center shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-0.5">
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#e8d8a6]/20 text-[#e8d8a6] mr-4 shadow-inner">
                <span className="text-2xl">🌿</span>
              </div>
              <div className="flex-1">
                <div className="text-[#d9c98f] text-xs sm:text-sm">Product Name:</div>
                <div className="text-white text-xl sm:text-2xl font-semibold tracking-wide">{currentProduct.displayName || currentProduct.brand}</div>
              </div>
            </div>
          </StarBorder>
        </section>

        {/* Product Description */}
        {currentProduct.description && (
          <section className="mt-6">
            <StarBorder as="div" className="w-full" color="cyan" speed="5s" thickness={2}>
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e8d8a6]/25 text-[#e8d8a6] mr-3 shadow-inner">
                  <span className="text-lg">📋</span>
                </div>
                <div className="flex-1">
                  <div className="text-[#d9c98f] text-sm">Product Description</div>
                  <div className="mt-1 text-sm sm:text-base text-white leading-relaxed">{currentProduct.description}</div>
                </div>
              </div>
            </StarBorder>
          </section>
        )}

        {/* Technical content SECOND */}
        {currentProduct.gazette && (
          <section className="mt-6">
            <StarBorder as="div" className="w-full" color="cyan" speed="5s" thickness={2}>
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e8d8a6]/25 text-[#e8d8a6] mr-3 shadow-inner">
                  <span className="text-lg">📰</span>
                </div>
                <div className="flex-1">
                  <div className="text-[#d9c98f] text-sm">Technical content</div>
                  {Array.isArray(currentProduct.gazette) ? (
                    <ul className="mt-1 text-sm sm:text-base text-white list-disc pl-4 space-y-1">
                      {currentProduct.gazette.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-white text-base sm:text-lg">{currentProduct.gazette}</div>
                  )}
                </div>
              </div>
            </StarBorder>
          </section>
        )}

        {/* Benefit THIRD */}
        <section className="mt-6">
          <StarBorder as="div" className="w-full" color="cyan" speed="5s" thickness={2}>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e8d8a6]/25 text-[#e8d8a6] mr-3 shadow-inner">
                <span className="text-lg">⚗️</span>
              </div>
              <div className="flex-1">
                <div className="text-[#d9c98f] text-sm">Mode of Action</div>
                {Array.isArray(currentProduct.specification) ? (
                  <ul className="mt-1 text-sm sm:text-base text-white list-disc pl-4 space-y-1">
                    {currentProduct.specification.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-white text-base sm:text-lg">{currentProduct.specification}</div>
                )}
              </div>
            </div>
          </StarBorder>
        </section>

        {/* Category of Fertilizers FOURTH */}
        {currentProduct.category && (
          <section className="mt-6">
            <StarBorder as="div" className="w-full" color="cyan" speed="5s" thickness={2}>
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e8d8a6]/25 text-[#e8d8a6] mr-3 shadow-inner">
                  <span className="text-lg">🏷️</span>
                </div>
                <div className="flex-1">
                  <div className="text-[#d9c98f] text-sm">Category of Fertilizers:</div>
                  <div className="text-white text-base sm:text-lg">{currentProduct.category}</div>
                </div>
              </div>
            </StarBorder>
          </section>
        )}

        {/* Info grid with StarBorder */}
        <section className="mt-8 grid grid-cols-1 gap-4">
          <StarBorder as="div" className="w-full" color="cyan" speed="5s" thickness={2}>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e8d8a6]/25 text-[#e8d8a6] mr-3 shadow-inner">
                <span className="text-lg">🧪</span>
              </div>
              <div className="flex-1">
                <div className="text-[#d9c98f] text-sm">Suitable Crops</div>
                {(currentProduct.composition || []).length ? (
                  <div className="mt-1 text-sm sm:text-base text-white">
                    {(currentProduct.composition || []).join(', ')}
                  </div>
                ) : (
                  <div className="mt-1 text-sm sm:text-base text-white"></div>
                )}
              </div>
            </div>
          </StarBorder>

          <StarBorder as="div" className="w-full" color="cyan" speed="5s" thickness={2}>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e8d8a6]/25 text-[#e8d8a6] mr-3 shadow-inner">
                <span className="text-lg">🌶️</span>
              </div>
              <div className="flex-1">
                <div className="text-[#d9c98f] text-sm">Target Diseases</div>
                <div className="text-base sm:text-lg">{(currentProduct.crops || []).join(', ')}</div>
              </div>
            </div>
          </StarBorder>

          <StarBorder as="div" className="w-full" color="cyan" speed="5s" thickness={2}>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e8d8a6]/25 text-[#e8d8a6] mr-3 shadow-inner">
                <span className="text-lg">🧴</span>
              </div>
              <div className="flex-1">
                <div className="text-[#d9c98f] text-sm font-semibold tracking-wide">METHOD OF APPLICATION AND DOSAGE</div>
                <ul className="mt-1 text-sm sm:text-base text-white list-disc pl-4 space-y-2">
                  {(currentProduct.dosage || []).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </StarBorder>
          <StarBorder as="div" className="w-full" color="cyan" speed="5s" thickness={2}>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e8d8a6]/25 text-[#e8d8a6] mr-3 shadow-inner">
                <span className="text-lg">🏭</span>
              </div>
              <div className="flex-1">
                <div className="text-[#d9c98f] text-sm">Manufactured and Marketed By:</div>
                <div className="text-white/90 text-sm sm:text-base font-semibold mt-1">Bharati Farming Technologies Private Limited (BFTPL)</div>
                <div className="text-white/90 text-xs sm:text-sm mt-0.5">#14, Opp. SSS Temple, H S Garden, Kelaginathota, Chikkaballapur – 562101, Karnataka, India.</div>
                <div className="text-white/90 text-xs sm:text-sm mt-1">Email: bharatifarmtech@gmail.com</div>
              </div>
            </div>
          </StarBorder>
          <StarBorder as="div" className="w-full" color="cyan" speed="5s" thickness={2}>
            <div className="flex items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e8d8a6]/25 text-[#e8d8a6] mr-3 shadow-inner">
                <span className="text-lg">📞</span>
              </div>
              <div className="flex-1">
                <div className="text-[#d9c98f] text-sm">Customer Care</div>
                <div className="text-white/90 text-sm sm:text-base">+91 85536 97777</div>
              </div>
            </div>
          </StarBorder>
        </section>
      </main>
    </div>
  );
}
