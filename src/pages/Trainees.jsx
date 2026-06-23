// src/pages/Trainees.jsx
import { useState } from 'react';
import { useStore, useTrainees, useOrders } from '../store';
import { fmt, tFrom, tTo, today, uid } from '../utils';
import Modal, { ModalHeader } from '../components/Modal';

const DISC = ['Degree','Diploma','ITI','MBA','Other'];

function TraineeForm({ trainee, nextCard, onSave, onClose }) {
  const t = trainee || {};
  const [form, setForm] = useState({
    name: t.name||'', gender: t.gender||'', fatherName: t.fatherName||'',
    bloodGroup: t.bloodGroup||'', contact: t.contact||'', emergencyContact: t.emergencyContact||'',
    address: t.address||'', email: t.email||'', institution: t.institution||'',
    discipline: t.discipline||'', stream: t.stream||'', trainingPeriod: t.trainingPeriod||'',
    fromDate: tFrom(t)||'', toDate: tTo(t)||'', chqRef: t.chqRef||'',
    chqDate: t.chqDate||'', reportDate: t.reportDate||'',
    cardNo: t.cardNo || nextCard
  });
  const [err, setErr] = useState({});

  const set = (k,v) => setForm(f => ({...f, [k]: v}));

  const save = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.fromDate) e.fromDate = true;
    if (!form.toDate) e.toDate = true;
    if (!form.chqRef) e.chqRef = true;
    if (form.chqRef && !/^\d+$/.test(form.chqRef)) e.chqRef = true;
    if (Object.keys(e).length) { setErr(e); return; }
    onSave({ ...form, id: t.id || uid(), source: t.source||'manual',
      legacyFrom: form.fromDate, legacyTo: form.toDate });
  };

  const F = ({label, k, type='text', placeholder=''}) => (
    <div className="field">
      <label>{label}</label>
      <input type={type} value={form[k]} onChange={e=>set(k,e.target.value)}
        placeholder={placeholder} className={err[k]?'err':''} />
    </div>
  );

  return (
    <Modal onClose={onClose} size="modal-xl">
      <ModalHeader title={t.id ? 'Edit Trainee' : 'Add Trainee'} onClose={onClose} />
      <div className="sec-divider"><span>Personal Details</span></div>
      <div className="g3">
        <F label="Full Name *" k="name" />
        <F label="Father's Name" k="fatherName" />
        <div className="field"><label>Gender *</label>
          <select value={form.gender} onChange={e=>set('gender',e.target.value)}>
            <option value="">Select</option>
            <option value="श्री">श्री (Male)</option>
            <option value="सुश्री">सुश्री (Female)</option>
          </select>
        </div>
      </div>
      <div className="g3">
        <F label="Blood Group" k="bloodGroup" />
        <F label="Contact No." k="contact" type="tel" />
        <F label="Emergency Contact" k="emergencyContact" type="tel" />
      </div>
      <div className="g2">
        <div className="field"><label>Address</label>
          <textarea value={form.address} onChange={e=>set('address',e.target.value)} rows={2} /></div>
        <F label="Email" k="email" type="email" />
      </div>
      <div className="sec-divider"><span>Academic Details</span></div>
      <div className="g3">
        <F label="Institution *" k="institution" />
        <div className="field"><label>Discipline *</label>
          <select value={form.discipline} onChange={e=>set('discipline',e.target.value)}>
            <option value="">Select</option>
            {DISC.map(d=><option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <F label="Stream / Branch *" k="stream" />
      </div>
      <div className="sec-divider"><span>Training Details</span></div>
      <div className="g4">
        <F label="Training Period" k="trainingPeriod" placeholder="4 weeks" />
        <F label="From Date *" k="fromDate" type="date" />
        <F label="To Date *" k="toDate" type="date" />
        <F label="Report Date" k="reportDate" type="date" />
      </div>
      <div className="g3">
        <div className="field"><label>CHQ Reference No. * (numbers only)</label>
          <input type="number" value={form.chqRef} onChange={e=>set('chqRef',e.target.value)}
            placeholder="e.g. 444" className={err.chqRef?'err':''} /></div>
        <F label="CHQ Issue Date *" k="chqDate" type="date" />
        <div className="field"><label>Card No.</label>
          <input type="number" value={form.cardNo} onChange={e=>set('cardNo',parseInt(e.target.value)||nextCard)} /></div>
      </div>
      <div className="flex flex-end mt14" style={{gap:8}}>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={save}>Save Trainee</button>
      </div>
    </Modal>
  );
}

export default function Trainees({ navigate }) {
  const { trainees, addTrainee, updateTrainee, deleteTrainee, nextCard } = useTrainees();
  const { getOrderForTrainee, orders, groups } = useOrders();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  const td = today();
  const unorderedIds = new Set(
    trainees.filter(t => !getOrderForTrainee(t.id)).map(t => t.id)
  );

  const filtered = trainees.filter(t => {
    const matchQ = !q || t.name?.toLowerCase().includes(q) ||
      t.institution?.toLowerCase().includes(q) ||
      (t.cardNo||'').toString().includes(q) ||
      t.stream?.toLowerCase().includes(q);
    const matchF = filter === 'all' ? true :
      filter === 'pending' ? unorderedIds.has(t.id) :
      !unorderedIds.has(t.id);
    return matchQ && matchF;
  });

  const statusOf = (t) => {
    const o = getOrderForTrainee(t.id);
    if (!o) return { label: 'Pending', cls: 'b-orange' };
    const active = (o.rotation?.[t.id]||[]).some(r => r.start && r.end && td >= r.start && td <= r.end);
    if (active) return { label: 'Active ▶', cls: 'b-teal' };
    return { label: 'Issued ✓', cls: 'b-green' };
  };

  const save = (t) => {
    if (editing?.id) updateTrainee(t);
    else addTrainee(t);
    setEditing(null); setAdding(false);
  };

  return (
    <>
      <div className="page-hdr">
        <div>
          <div className="page-title">Trainees</div>
          <div className="page-sub">{trainees.length} registered • {unorderedIds.size} pending orders</div>
        </div>
        <div className="page-actions no-print">
          <button className="btn btn-primary btn-sm" onClick={() => setAdding(true)}>+ Add</button>
        </div>
      </div>

      <div className="flex" style={{gap:8, marginBottom:14}}>
        <input value={q} onChange={e=>setQ(e.target.value.toLowerCase())}
          placeholder="🔍 Search name, institution, card…" style={{flex:1}} />
        <select value={filter} onChange={e=>setFilter(e.target.value)} style={{width:130}}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="ordered">Ordered</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">👥</div><div>No trainees found</div></div>
      ) : (
        <div className="card" style={{padding:'0 0 1px'}}>
          <div className="tbl-wrap">
            <table>
              <thead><tr>
                <th>Card</th><th>Name</th><th>Gender</th><th>Institution</th>
                <th>Discipline/Stream</th><th>From</th><th>To</th><th>CHQ</th><th>Status</th><th></th>
              </tr></thead>
              <tbody>
                {filtered.map(t => {
                  const st = statusOf(t);
                  const o = getOrderForTrainee(t.id);
                  return (
                    <tr key={t.id}>
                      <td className="text-accent" style={{fontWeight:700}}>{t.cardNo||'—'}</td>
                      <td><div className="td-name">{t.name}</div><div className="td-sub">{t.email||''}</div></td>
                      <td>{t.gender||'—'}</td>
                      <td style={{maxWidth:140,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={t.institution}>{t.institution||'—'}</td>
                      <td><span className="badge b-blue">{t.discipline||'—'}</span><br/><span style={{fontSize:10,color:'var(--muted)'}}>{t.stream||''}</span></td>
                      <td>{fmt(tFrom(t))}</td>
                      <td>{fmt(tTo(t))}</td>
                      <td>{t.chqRef?<span className="badge b-orange">{t.chqRef}</span>:'—'}</td>
                      <td><span className={`badge ${st.cls}`}>{st.label}</span></td>
                      <td>
                        <div className="flex" style={{gap:4}}>
                          <button className="btn btn-secondary btn-xs" onClick={()=>setEditing(t)}>✏️</button>
                          {!o && <button className="btn btn-primary btn-xs" onClick={()=>navigate('groups')}>📄</button>}
                          <button className="btn btn-danger btn-xs" onClick={()=>{if(confirm('Delete?'))deleteTrainee(t.id)}}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(adding || editing) && (
        <TraineeForm
          trainee={editing}
          nextCard={nextCard}
          onSave={save}
          onClose={() => { setAdding(false); setEditing(null); }}
        />
      )}
    </>
  );
}
