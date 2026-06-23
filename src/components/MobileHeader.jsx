// src/components/MobileHeader.jsx
export default function MobileHeader({ title, onMenuClick }) {
  return (
    <div id="mobile-header">
      <div className="mh-left">
        <button className="mh-menu" onClick={onMenuClick} aria-label="Menu">☰</button>
        <span className="mh-title">{title}</span>
      </div>
    </div>
  );
}
