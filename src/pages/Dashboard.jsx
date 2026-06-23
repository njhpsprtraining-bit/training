// src/pages/Dashboard.jsx
import { useStore, useOrders } from '../store';
import { fmt, fmtOrderNo, today, tFrom, tTo, orderStatus } from '../utils';

export default function Dashboard({ navigate }) {
  const { state } = useStore();
  const { orders, groups, certs, unordered } = useOrders();
  const td = today();

  // Stats
  const total = state.trainees.length;
  const pending = unordered.length;
  const completed = certs.filter(c => c.certNo).length;

  // Active today
  let activeToday = 0;
  orders.forEach(o => {
    const g = groups.find(x => x.id === o.groupId);
    const tids = g?.traineeIds || [];
    const active = tids.some(tid => (o.rotation?.[tid] || []).some(r => r.start && r.end && td >= r.start && td <= r.end));
    if (active) activeToday += tids.length;
  });

  // Overdue
  let overdue = 0;
  orders.forEach(o => {
    if (orderStatus(o, certs) === 'completed') return;
    const g = groups.find(x => x.id === o.groupId);
    const tids = g?.traineeIds || [];
    const anyOverdue = tids.some(tid => {
      const t = state.trainees.find(x => x.id === tid);
      return t && tTo(t) && tTo(t) < td;
    });
    if (anyOverdue) overdue++;
  });

  // Dept activity today
  const deptMap = {};
  orders.forEach(o => {
    const g = groups.find(x => x.id === o.groupId);
    const tids = g?.traineeIds || [];
    tids.forEach(tid => {
      (o.rotation?.[tid] || []).forEach(r => {
        if (r.dept && r.start && r.end && td >= r.start && td <= r.end) {
          deptMap[r.dept] = (deptMap[r.dept] || 0) + 1;
        }
      });
    });
  });
  const deptActivity = Object.entries(deptMap).sort((a, b) => b[1] - a[1]);
  const maxDept = deptActivity[0]?.[1] || 1;

  // Recent orders
  const recentOrders = [...orders].reverse().slice(0, 5);

  const syncSheet = async () => {
    const id = state.settings.sheetId;
    if (!id) { alert('Set Sheet ID in Settings first'); return; }
    alert('Sync from Settings page or use the Sync button there.');
  };

  return (
    <>
      <div className="page-hdr">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-sub">NJHPS — औद्योगिक प्रशिक्षण अवलोकन • {fmt(td)}</div>
        </div>
        <div className="page-actions no-print">
          <button className="btn btn-secondary btn-sm" onClick={syncSheet}>🔄 Sync</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('groups')}>+ Order</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{ '--c': 'var(--accent)' }}>
          <div className="stat-num">{total}</div>
          <div className="stat-label">Total Trainees</div>
        </div>
        <div className="stat-card" style={{ '--c': 'var(--teal)' }}>
          <div className="stat-num">{activeToday}</div>
          <div className="stat-label">Active Today</div>
        </div>
        <div className="stat-card" style={{ '--c': 'var(--orange)' }}>
          <div className="stat-num">{pending}</div>
          <div className="stat-label">Pending Orders</div>
        </div>
        <div className="stat-card" style={{ '--c': 'var(--green)' }}>
          <div className="stat-num">{completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      {overdue > 0 && (
        <div className="alert alert-warn">
          ⚠️ {overdue} trainee(s) overdue.{' '}
          <a href="#" onClick={e => { e.preventDefault(); navigate('rep_status'); }}
            style={{ color: 'var(--accent)', fontWeight: 700 }}>View →</a>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div className="card">
          <div className="card-title">Dept Activity Today</div>
          {deptActivity.length === 0 ? (
            <div className="text-muted" style={{ fontSize: 12 }}>No active rotations today</div>
          ) : deptActivity.slice(0, 6).map(([dept, count]) => (
            <div key={dept} className="pbar-wrap">
              <div className="pbar-top">
                <span style={{ fontSize: 12 }}>{dept}</span>
                <strong style={{ color: 'var(--teal)' }}>{count}</strong>
              </div>
              <div className="pbar">
                <div className="pbar-fill" style={{ width: `${Math.round(count / maxDept * 100)}%`, background: 'var(--teal)' }} />
              </div>
            </div>
          ))}
          {deptActivity.length > 0 && (
            <button className="btn btn-secondary btn-sm mt8" onClick={() => navigate('deptview')}>
              Full Dept View →
            </button>
          )}
        </div>

        <div className="card">
          <div className="card-title">Recent Orders <span className="ct-count">{recentOrders.length}</span></div>
          {recentOrders.length === 0 ? (
            <div className="text-muted" style={{ fontSize: 12 }}>No orders yet</div>
          ) : recentOrders.map(o => {
            const g = groups.find(x => x.id === o.groupId);
            const tids = g?.traineeIds || [];
            const names = tids.map(id => state.trainees.find(t => t.id === id)?.name || '').filter(Boolean);
            const st = orderStatus(o, certs);
            return (
              <div key={o.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)33' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent)' }}>{fmtOrderNo(o.localOrderNo)}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {names.slice(0, 2).join(', ')}{names.length > 2 ? ` +${names.length - 2}` : ''} • {fmt(o.issueDate)}
                  </div>
                </div>
                <span className={`badge ${st === 'completed' ? 'b-green' : st === 'issued' ? 'b-orange' : 'b-teal'}`}>{st}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card no-print">
        <div className="card-title">Quick Actions</div>
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('trainees')}>+ Trainee</button>
          <button className="btn btn-teal btn-sm" onClick={() => navigate('groups')}>+ Group/Order</button>
          <button className="btn btn-blue btn-sm" onClick={() => navigate('deptview')}>🏭 Depts</button>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('rep_status')}>📊 Reports</button>
        </div>
      </div>
    </>
  );
}
