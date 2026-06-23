// src/components/Modal.jsx
import { useEffect } from 'react';

export default function Modal({ children, onClose, size = '' }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className={`modal ${size}`}>
        <div className="modal-drag" />
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ title, onClose }) {
  return (
    <div className="modal-hdr">
      <div className="modal-title">{title}</div>
      {onClose && (
        <button className="modal-close" onClick={onClose}>✕</button>
      )}
    </div>
  );
}
