import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Transition state
  const [transitionState, setTransitionState] = useState({
    active: false,
    phase: 'idle', // 'idle' | 'anticipation' | 'cover' | 'swap' | 'reveal'
    targetId: null,
    targetUrl: null,
    clickCoords: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  });

  const activeTimelineRef = useRef(null);
  const isNavigatingRef = useRef(false);

  // Kill running timeline safely
  const cancelTransition = useCallback(() => {
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
      activeTimelineRef.current = null;
    }
    setTransitionState({
      active: false,
      phase: 'idle',
      targetId: null,
      targetUrl: null,
      clickCoords: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    });
    isNavigatingRef.current = false;
  }, []);

  // Listen for Escape key to cancel / force instant finish, and popstate for browser back button
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isNavigatingRef.current) {
        cancelTransition();
      }
    };
    const handlePopState = () => {
      cancelTransition();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [cancelTransition]);

  const lastNavTimeRef = useRef(0);
  const lastNavUrlRef = useRef(null);

  // Main imperative navigation trigger
  const startTransition = useCallback((url, charId, event = null) => {
    // If clicking same page, ignore
    if (location.pathname === url) return;

    const now = performance.now();
    // Guard against rapid duplicate clicks (within 400ms to the same url)
    if (lastNavUrlRef.current === url && now - lastNavTimeRef.current < 400) {
      return;
    }
    lastNavTimeRef.current = now;
    lastNavUrlRef.current = url;

    // Interrupt-safety: Kill any currently running animation
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
      activeTimelineRef.current = null;
    }

    // Capture click coordinates if available
    let coords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    if (event && event.clientX !== undefined) {
      coords = { x: event.clientX, y: event.clientY };
    }

    isNavigatingRef.current = true;

    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      navigate(url);
      window.scrollTo(0, 0);
      isNavigatingRef.current = false;
      return;
    }

    setTransitionState({
      active: true,
      phase: 'anticipation',
      targetId: charId,
      targetUrl: url,
      clickCoords: coords
    });
  }, [location.pathname, navigate]);

  return (
    <TransitionContext.Provider
      value={{
        transitionState,
        setTransitionState,
        startTransition,
        cancelTransition,
        activeTimelineRef,
        isNavigatingRef,
        navigate
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionEngine() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error('useTransitionEngine must be used within a TransitionProvider');
  }
  return ctx;
}
