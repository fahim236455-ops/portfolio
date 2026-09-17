import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

type CursorState = 'default' | 'nav' | 'button' | 'project' | 'external' | 'image';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const OrbitCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth interpolation
  const springConfig1 = { damping: 25, stiffness: 400, mass: 0.5 };
  const springConfig2 = { damping: 30, stiffness: 250, mass: 0.6 }; // Trail 1
  const springConfig3 = { damping: 35, stiffness: 150, mass: 0.8 }; // Trail 2

  const dotX = useSpring(mouseX, springConfig1);
  const dotY = useSpring(mouseY, springConfig1);
  
  const trail1X = useSpring(mouseX, springConfig2);
  const trail1Y = useSpring(mouseY, springConfig2);
  
  const trail2X = useSpring(mouseX, springConfig3);
  const trail2Y = useSpring(mouseY, springConfig3);

  useEffect(() => {
    // Detect touch devices to disable custom cursor
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(isTouchDevice);
    
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);

    if (isTouchDevice) return;

    // Inject cursor:none into document body globally (handled in index.css as well, but this is a fallback)
    document.documentElement.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 500);
    };
    
    const handleMouseUp = () => setIsClicking(false);

    const updateCursorState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isExternal = target.closest('a[target="_blank"]');
      const isImage = target.closest('[data-cursor="image"]');
      const isProject = target.closest('[data-cursor="project"]');
      const isNav = target.closest('nav a, header a, footer a');
      const isButton = target.closest('button, a, input[type="button"], input[type="submit"], [role="button"]');

      // Hierarchy of states
      if (isExternal) setCursorState('external');
      else if (isImage) setCursorState('image');
      else if (isProject) setCursorState('project');
      else if (isNav) setCursorState('nav');
      else if (isButton) setCursorState('button');
      else setCursorState('default');
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousemove', updateCursorState);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.documentElement.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousemove', updateCursorState);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  const getSizes = () => {
    switch (cursorState) {
      case 'external': return { dot: 72, ring: 0 };
      case 'image': return { dot: 80, ring: 0 };
      case 'project': return { dot: 100, ring: 0 };
      case 'button': return { dot: 60, ring: 0 };
      case 'nav': return { dot: 14, ring: 36 };
      default: return { dot: 6, ring: 28 };
    }
  };

  const { dot, ring } = getSizes();
  const showText = ['external', 'image', 'project', 'button'].includes(cursorState);
  const hideTrails = cursorState !== 'default' && cursorState !== 'nav';

  let text = '';
  if (cursorState === 'external') text = 'OPEN ↗';
  else if (cursorState === 'image') text = 'EXPLORE';
  else if (cursorState === 'project') text = 'VIEW PROJECT';
  else if (cursorState === 'button') text = 'VIEW';

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Trails */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute rounded-full border border-white/10"
            style={{
              x: trail2X,
              y: trail2Y,
              width: ring * 0.7,
              height: ring * 0.7,
              marginLeft: -(ring * 0.7) / 2,
              marginTop: -(ring * 0.7) / 2,
              opacity: hideTrails ? 0 : 0.4,
            }}
          />
          <motion.div
            className="absolute rounded-full border border-white/20"
            style={{
              x: trail1X,
              y: trail1Y,
              width: ring * 0.85,
              height: ring * 0.85,
              marginLeft: -(ring * 0.85) / 2,
              marginTop: -(ring * 0.85) / 2,
              opacity: hideTrails ? 0 : 0.7,
            }}
          />
        </>
      )}

      {/* Main Outer Ring */}
      <motion.div
        className="absolute rounded-full border border-white/30 backdrop-blur-[2px]"
        style={{
          x: dotX,
          y: dotY,
          width: ring,
          height: ring,
          marginLeft: -ring / 2,
          marginTop: -ring / 2,
          opacity: hideTrails ? 0 : 1,
        }}
        animate={{ scale: isClicking ? 0.8 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />

      {/* Center Dot / Expanding Circle */}
      <motion.div
        className={`absolute flex items-center justify-center rounded-full transition-colors duration-300 ${
          showText ? 'bg-white/95 text-black backdrop-blur-md shadow-2xl' : 'bg-white'
        }`}
        style={{
          x: dotX,
          y: dotY,
          width: dot,
          height: dot,
          marginLeft: -dot / 2,
          marginTop: -dot / 2,
        }}
        animate={{ scale: isClicking ? 0.9 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {showText && (
            <motion.div
              key={text}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[9px] font-extrabold tracking-widest whitespace-nowrap font-mono-code"
            >
              {text}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border border-white/40"
            initial={{ 
              x: ripple.x, 
              y: ripple.y, 
              width: 20, 
              height: 20, 
              marginLeft: -10, 
              marginTop: -10,
              opacity: 1 
            }}
            animate={{ 
              width: 140, 
              height: 140, 
              marginLeft: -70, 
              marginTop: -70,
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
