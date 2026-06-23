// src/components/BottomNav.jsx
import { useState } from 'react';
import { useOrders } from '../store';

const MAIN_NAV = [
  { id: 'dashboard', icon: '📊', label: 'Home' },
  { id: 'trainees', icon: '👥', label: 'Trainees', badge: true },
  { id: 'deptview', icon: '🏭', label: 'Depts' },
  { id: 'orders', icon: '📄', label: 'Orders' },
];

const MORE_NAV = [
  { id: 'groups', icon: '📋', label: 'Groups' },
  { id: 'certificates', icon: '🎓', label: 'Certs' },
  { id: 'rep_status', icon: '🔄', label: 'Status' },
  { id: 'rep_dept', icon: '🏗️', label: 'Dept Rpt' },
  { id: 'rep_inst', icon: '🏫', label: 'Inst' },
  { id: 'rep_cert', icon: '📜', label: 'Dispatch' },
  { id: 'rep_annual', icon: '📅', label: 'Annual' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

export default function BottomNav({ page, navigate }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const { unordered } = useOrders();
  const pendingCount = unordered.length;

  const isMorePage = !MAIN_NAV.find(n => n.id === page);

  const goTo = (id) => {
    navigate(id);
    setMoreOpen(false);
  };

  return (
    <>
      {moreOpen && (
        <div
          style={{
            position: 'fixed', bottom: 'calc(var(--nav-h) + var(--safe-b))',
            left: 0, right: 0, background: 'var(--surf)',
            borderTop: '1px solid var(--border2)', padding: '10px 12px',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, zIndex: 47
          }}
        >
          {MORE_NAV.map(item => (
            <div
              key={item.id}
              onClick={() => goTo(item.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 4, padding: '10px 4px', borderRadius: 9, cursor: 'pointer',
                background: page === item.id ? 'var(--accent)22' : 'var(--panel)',
                color: page === item.id ? 'var(--accent)' : 'var(--muted)',
                fontSize: 10, fontWeight: 600, minHeight: 60, justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      )}

      <div id="bottom-nav">
        {MAIN_NAV.map(item => (
          <div
            key={item.id}
            className={`bn-item ${page === item.id ? 'active' : ''}`}
            onClick={() => goTo(item.id)}
          >
            <span className="bn-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && pendingCount > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 'calc(50% - 18px)',
                background: 'var(--red)', color: '#fff', fontSize: 8, fontWeight: 700,
                borderRadius: 8, padding: '1px 4px', minWidth: 14, textAlign: 'center'
              }}>{pendingCount}</span>
            )}
          </div>
        ))}
        <div
          className={`bn-item ${isMorePage || moreOpen ? 'active' : ''}`}
          onClick={() => setMoreOpen(!moreOpen)}
        >
          <span className="bn-icon">⋯</span>
          <span>More</span>
        </div>
      </div>
    </>
  );
}
