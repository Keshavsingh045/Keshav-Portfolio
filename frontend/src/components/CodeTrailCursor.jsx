import React, { useEffect, useState, useRef } from 'react';

const words = ['{ }', '</>', 'import', '=>', 'React', 'Node.js', 'const', 'async', 'await', '0101', 'API'];
const colors = ['#3b82f6', '#8b5cf6', '#eab308', '#22c55e', '#ef4444', '#06b6d4'];

export default function CodeTrailCursor() {
  const [particles, setParticles] = useState([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const particleId = useRef(0);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setIsDesktop(false);
      return;
    }

    const handleMouseMove = (e) => {
      const now = Date.now();
      // Throttle spawn rate to every 40ms to avoid DOM overload
      if (now - lastSpawnTime.current < 40) return;
      lastSpawnTime.current = now;

      const newParticle = {
        id: particleId.current++,
        x: e.clientX,
        y: e.clientY,
        word: words[Math.floor(Math.random() * words.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * 360, // Random rotation
      };

      setParticles((prev) => [...prev, newParticle]);

      // Remove particle after animation duration (1000ms)
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] overflow-hidden">
      {/* Tiny Core Cursor Dot */}
      <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#3b82f6] fixed top-0 left-0" style={{ transform: 'translate(-50%, -50%)' }}></div>
      
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-sm font-mono font-bold animate-float-fade"
          style={{
            left: p.x,
            top: p.y,
            color: p.color,
            textShadow: `0 0 10px ${p.color}`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
          }}
        >
          {p.word}
        </div>
      ))}

      {/* Global CSS for the floating animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatFade {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -100px) scale(0.5) rotate(45deg);
          }
        }
        .animate-float-fade {
          animation: floatFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}
