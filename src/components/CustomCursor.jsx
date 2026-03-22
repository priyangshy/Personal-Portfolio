import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/cursor.css';

const CustomCursor = React.memo(() => {
  const cursorRef = useRef(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const animationFrameRef = useRef(null);

  const updateCursorPosition = useCallback((x, y) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
    }
  }, []);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const animateCursor = () => {
      // Smooth interpolation for cursor following
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      updateCursorPosition(cursorX, cursorY);
      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateCursor);
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
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true, capture: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true, capture: true });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.body.style.cursor = 'auto';
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateCursorPosition]);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHoveringInteractive ? 'active' : ''}`}
    />
  );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
