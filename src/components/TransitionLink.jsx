import React from 'react';
import { useTransitionEngine } from '../context/TransitionContext';

export function TransitionLink({ to, charId, className, style, children, onClick, ...props }) {
  const { startTransition } = useTransitionEngine();

  const handleClick = (e) => {
    // If modifier keys pressed, allow normal new tab / window behavior
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick(e);

    // If anchor on the current page, scroll into view immediately
    const isCurrentPageAnchor = (
      (to.startsWith('#')) ||
      (to.startsWith('/#') && window.location.pathname === '/')
    );
    if (isCurrentPageAnchor) {
      const hash = to.replace(/^\/?#/, '');
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Derive charId from "to" if not explicitly provided (e.g. /character/ichigo -> ichigo)
    let derivedId = charId;
    if (!derivedId && to) {
      const match = to.match(/\/character\/([^/]+)/);
      if (match) derivedId = match[1];
    }

    startTransition(to, derivedId, e);
  };

  return (
    <a
      href={to}
      className={className}
      style={style}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
