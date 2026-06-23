// src/App.jsx
import { useState } from 'react';
import { useAuth } from './store';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import BottomNav from './components/BottomNav';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Trainees from './pages/Trainees';
import Groups from './pages/Groups';
import Orders from './pages/Orders';
import DeptView from './pages/DeptView';
import Certificates from './pages/Certificates';
import RepStatus from './pages/reports/RepStatus';
import RepDept from './pages/reports/RepDept';
import RepInstitution from './pages/reports/RepInstitution';
import RepCert from './pages/reports/RepCert';
import RepAnnual from './pages/reports/RepAnnual';
import Settings from './pages/Settings';

export const PAGE_TITLES = {
  dashboard: 'Dashboard',
  trainees: 'Trainees',
  groups: 'Groups',
  orders: 'Orders',
  deptview: 'Dept Live View',
  certificates: 'Certificates',
  rep_status: 'Status Report',
  rep_dept: 'Dept Report',
  rep_inst: 'Institution Report',
  rep_cert: 'Cert & Dispatch',
  rep_annual: 'Annual Summary',
  settings: 'Settings'
};

const PAGES = {
  dashboard: Dashboard,
  trainees: Trainees,
  groups: Groups,
  orders: Orders,
  deptview: DeptView,
  certificates: Certificates,
  rep_status: RepStatus,
  rep_dept: RepDept,
  rep_inst: RepInstitution,
  rep_cert: RepCert,
  rep_annual: RepAnnual,
  settings: Settings
};

export default function App() {
  const { authed, login, logout } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authed) return <Login onLogin={login} />;

  const PageComponent = PAGES[page] || Dashboard;

  const navigate = (p) => {
    setPage(p);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      {/* Sidebar overlay for mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar
        page={page}
        navigate={navigate}
        isOpen={sidebarOpen}
        onLogout={logout}
      />

      {/* Mobile header */}
      <MobileHeader
        title={PAGE_TITLES[page] || page}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main content */}
      <div className="main-content">
        <div className="page-wrap">
          <PageComponent navigate={navigate} />
        </div>
      </div>

      {/* Bottom nav (mobile) */}
      <BottomNav page={page} navigate={navigate} />

      {/* FAB */}
      <button
        className="fab no-print"
        onClick={() => {
          if (page === 'trainees') navigate('trainees');
          else if (page === 'groups') navigate('groups');
          else navigate('trainees');
        }}
        title="Quick Add"
      >+</button>
    </div>
  );
}
