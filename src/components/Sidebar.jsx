// src/components/Sidebar.jsx
import { useOrders } from '../store';

const NAV = [
  { section: 'Main' },
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'trainees', icon: '👥', label: 'Trainees', badge: true },
  { section: 'Orders' },
  { id: 'groups', icon: '📋', label: 'Groups' },
  { id: 'orders', icon: '📄', label: 'Issued Orders' },
  { section: 'Live' },
  { id: 'deptview', icon: '🏭', label: 'Dept Live View' },
  { id: 'certificates', icon: '🎓', label: 'Certificates' },
  { section: 'Reports' },
  { id: 'rep_status', icon: '🔄', label: 'Status' },
  { id: 'rep_dept', icon: '🏗️', label: 'Dept-wise' },
  { id: 'rep_inst', icon: '🏫', label: 'Institution-wise' },
  { id: 'rep_cert', icon: '📜', label: 'Cert & Dispatch' },
  { id: 'rep_annual', icon: '📅', label: 'Annual Summary' },
  { section: 'System' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

export default function Sidebar({ page, navigate, isOpen, onLogout }) {
  const { unordered } = useOrders();
  const pendingCount = unordered.length;

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sb-logo">
        <div className="sb-sq">IT</div>
        <div>
          <div className="sb-title">NJHPS Training</div>
          <div className="sb-sub">Jhakri</div>
        </div>
      </div>

      <nav style={{ padding: '8px 6px', flex: 1 }}>
        {NAV.map((item, i) => {
          if (item.section) {
            return <div key={i} className="nav-section-label">{item.section}</div>;
          }
          return (
            <div
              key={item.id}
              className={`nav-item ${page === item.id ? 'active' : ''}`}
              onClick={() => navigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge && pendingCount > 0 && (
                <span className="nav-badge">{pendingCount}</span>
              )}
            </div>
          );
        })}
        <div className="nav-item" onClick={onLogout}>
          <span className="nav-icon">🚪</span>Logout
        </div>
      </nav>

      <div className="sb-footer" id="sb-sync-info">
        NJHPS Jhakri
      </div>
    </aside>
  );
}
