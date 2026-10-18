import React from 'react';

export function SideDots({ items, activeId, onSelect }) {
  return (
    <nav className="side-dots" aria-label="Jump to scene">
      {items.map((item) => (
        <button
          key={item.id}
          className={activeId === item.id ? 'on' : ''}
          onClick={() => onSelect(item.id)}
          aria-label={`Jump to ${item.name}`}
        >
          <span className="side-dot-tooltip">
            {item.name}
          </span>
        </button>
      ))}
    </nav>
  );
}
