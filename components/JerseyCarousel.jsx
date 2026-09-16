'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function JerseyCarousel({ images = [], name = 'Jersey' }) {
  const safeImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80'];
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSwipeLeft = distance > 45;
    const isSwipeRight = distance < -45;

    if (isSwipeLeft) nextSlide();
    if (isSwipeRight) prevSlide();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      {/* Main Image Frame */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}
      >
        <img
          src={safeImages[activeIndex]}
          alt={`${name} - View ${activeIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
        />

        {/* Click Arrows (Desktop / Tablet) */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous image"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(13, 20, 15, 0.75)',
                backdropFilter: 'blur(6px)',
                border: '1px solid var(--border-active)',
                color: 'var(--gold-primary)',
                fontSize: '18px',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 5
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next image"
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(13, 20, 15, 0.75)',
                backdropFilter: 'blur(6px)',
                border: '1px solid var(--border-active)',
                color: 'var(--gold-primary)',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 5
              }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Counter Badge Pill */}
        {safeImages.length > 1 && (
          <div
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              backgroundColor: 'rgba(13, 20, 15, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '999px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--gold-light)',
              letterSpacing: '0.04em',
              zIndex: 5
            }}
          >
            {activeIndex + 1} / {safeImages.length}
          </div>
        )}

        {/* Dot Count Indicators */}
        {safeImages.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              zIndex: 5,
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(13, 20, 15, 0.65)',
              backdropFilter: 'blur(6px)'
            }}
          >
            {safeImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                style={{
                  width: activeIndex === idx ? '22px' : '7px',
                  height: '7px',
                  borderRadius: '999px',
                  backgroundColor: activeIndex === idx ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.35)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.25s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails row if multiple images */}
      {safeImages.length > 1 && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '10px',
                overflow: 'hidden',
                border: activeIndex === idx ? '2px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-surface)',
                padding: 0,
                cursor: 'pointer',
                flexShrink: 0,
                opacity: activeIndex === idx ? 1 : 0.6,
                transition: 'all 0.15s'
              }}
            >
              <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
