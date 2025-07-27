import React, { useState, useEffect, useCallback } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const shouldShow = scrollY > 150;

    if (shouldShow && !isMounted) {
      setIsMounted(true);
      setIsVisible(true);
    }

    if (!shouldShow && isVisible) {
      setIsLeaving(true);
      setIsVisible(false);
      setTimeout(() => {
        setIsMounted(false);
        setIsLeaving(false);
      }, 500);
    }

    setAtBottom(scrollY + windowHeight >= docHeight - 20);
  }, [isMounted, isVisible]); 
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]); 

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLeaving(true);
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
      setIsLeaving(false);
    }, 700);
  };

  if (!isMounted && !isLeaving) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-6 z-50
        w-8 h-8 rounded-full flex items-center justify-center
        bg-green-600 text-white shadow-lg
        transition-all duration-500 ease-in-out
        ${isVisible ? 'scroll-btn-animate-in' : ''}
        ${isLeaving ? 'scroll-btn-animate-out' : ''}
        ${atBottom && isVisible ? 'scroll-btn-bounce' : ''}
      `}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

export default ScrollToTopButton;
