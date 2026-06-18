import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { setFloatingTrigger } from '../lib/floatingTrigger';

const ARROW_SYMBOLS = ['⬇', '↙', '⬇', '↘', '⬇'];
const ANIM_DURATION = 1800;

export default function FloatingElements() {
  const [elements, setElements] = useState([]);
  const [mounted, setMounted] = useState(false);

  const trigger = useCallback((buttonEl, productName, cartEl) => {
    if (!buttonEl) return;

    const btnRect = buttonEl.getBoundingClientRect();
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    let cartLeft, cartTop, cartW, cartH;
    if (cartEl && cartEl.getBoundingClientRect) {
      const cr = cartEl.getBoundingClientRect();
      cartLeft = cr.left;
      cartTop = cr.top;
      cartW = cr.width;
      cartH = cr.height;
    } else {
      cartLeft = screenW - 60;
      cartTop = 20;
      cartW = 40;
      cartH = 40;
    }

    const now = Date.now();
    const arrows = ARROW_SYMBOLS.map((arrow, i) => {
      const startX = btnRect.left + btnRect.width / 2;
      const startY = btnRect.top;
      const endX = cartLeft + cartW / 2;
      const endY = cartTop + cartH / 2;
      return {
        id: now + i,
        type: 'arrow',
        symbol: arrow,
        startX,
        startY,
        endX,
        endY,
        delay: i * 80,
      };
    });

    const alertStartX = screenW / 2 - 150;
    const alertStartY = screenH - 120;
    const alertEndX = cartLeft + cartW / 2;
    const alertEndY = cartTop + cartH / 2;

    const alertEl = {
      id: now + 99,
      type: 'alert',
      text: productName,
      startX: alertStartX,
      startY: alertStartY,
      endX: alertEndX,
      endY: alertEndY,
    };

    setElements(prev => [...prev, ...arrows, alertEl]);

    arrows.forEach(a => {
      setTimeout(() => setElements(prev => prev.filter(e => e.id !== a.id)), a.delay + ANIM_DURATION);
    });
    setTimeout(() => setElements(prev => prev.filter(e => e.id !== alertEl.id)), ANIM_DURATION);
  }, []);

  useEffect(() => {
    setMounted(true);
    setFloatingTrigger(trigger);
  }, [trigger]);

  if (!mounted) return null;

  return createPortal(
    <>
      {elements.map(el => {
        const tx = el.endX - el.startX;
        const ty = el.endY - el.startY;

        if (el.type === 'arrow') {
          return (
            <div
              key={el.id}
              className="floating-arrow"
              style={{
                left: el.startX,
                top: el.startY,
                '--tx': tx + 'px',
                '--ty': ty + 'px',
                animationDelay: el.delay + 'ms',
              }}
            >
              {el.symbol}
            </div>
          );
        }

        return (
          <div
            key={el.id}
            className="floating-alert"
            style={{
              left: el.startX,
              top: el.startY,
              '--tx': tx + 'px',
              '--ty': ty + 'px',
            }}
          >
            <span className="alert-icon">🎯</span>
            <span>¡{el.text} agregado!</span>
          </div>
        );
      })}
    </>,
    document.body
  );
}