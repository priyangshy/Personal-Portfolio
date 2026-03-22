import React, { useEffect, useRef, useState } from 'react';
import '../styles/cursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      // Check if hovering over interactive elements
      if (
        target.matches('a, button, input, textarea, [role="button"]') ||
        target.closest('a, button, input, textarea, [role="button"]')
      ) {
        setIsHoveringInteractive(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHoveringInteractive(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, false);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHoveringInteractive ? 'active' : ''}`}
    />
  );
};

export default CustomCursor;
