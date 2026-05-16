import React, { useEffect, useRef, useState } from 'react';

export default function CursorAura() {
  const auraRef = useRef(null);
  const dotRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setIsDesktop(false);
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Smooth trailing variables
    let auraX = mouseX;
    let auraY = mouseY;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop for smooth trailing
    let animationFrameId;
    const animate = () => {
      // Easing function for aura (follows the mouse with a slight delay)
      auraX += (mouseX - auraX) * 0.1;
      auraY += (mouseY - auraY) * 0.1;

      if (auraRef.current) {
        // Center the 48x48 ring (w-12 h-12 = 48px)
        auraRef.current.style.transform = `translate3d(${auraX - 24}px, ${auraY - 24}px, 0)`;
      }
      
      if (dotRef.current) {
        // Center the 12x12 dot (w-3 h-3 = 12px)
        dotRef.current.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* Solid Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-yellow-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_15px_rgba(250,204,21,1)]"
      ></div>
      
      {/* Trailing Glowing Ring */}
      <div 
        ref={auraRef}
        className="fixed top-0 left-0 w-12 h-12 border-2 border-yellow-400/80 rounded-full pointer-events-none z-[9998] shadow-[0_0_20px_rgba(250,204,21,0.5)] flex items-center justify-center bg-yellow-400/10 backdrop-blur-[2px]"
        style={{ transform: 'translate(-50%, -50%)' }} // To be overridden by js but structurally sound
      >
      </div>
    </>
  );
}
