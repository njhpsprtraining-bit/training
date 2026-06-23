// src/utils.js

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

export const today = () => new Date().toISOString().split('T')[0];

export const fmt = (d) => {
  if (!d) return '—';
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const fmtShort = (d) => {
  if (!d) return '—';
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
};

export const fmtHindi = (d) => {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  return `${dd}-${mm}-${dt.getFullYear()}`;
};

export const addDays = (dateStr, n) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};

export const daysBetween = (a, b) => {
  if (!a || !b) return 0;
  return Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000) + 1);
};

export const tFrom = (t) => t?.fromDate || t?.legacyFrom || '';
export const tTo = (t) => t?.toDate || t?.legacyTo || '';

export const fmtOrderNo = (n) => {
  if (!n && n !== 0) return '—';
  const s = String(n);
  if (/^\d+$/.test(s)) return `563-${s}`;
  if (s.startsWith('563-')) return s;
  return s;
};

export const calcChain = (fromDate, rows) => {
  if (!fromDate) return rows.map(r => ({ ...r, start: null, end: null, days: 0 }));
  let cursor = fromDate;
  return rows.map(r => {
    const days = r.unit === 'weeks' ? (parseInt(r.val) || 0) * 7 : (parseInt(r.val) || 0);
    if (!r.dept || !days) return { ...r, start: null, end: null, days: 0 };
    const start = cursor;
    const end = addDays(cursor, days - 1);
    cursor = addDays(end, 1);
    return { ...r, start, end, days };
  });
};

export const parseSheetDate = (s) => {
  if (!s || !s.trim()) return '';
  const m = s.trim().match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})/);
  if (m) {
    let [, a, b, y] = m;
    if (y.length === 2) y = '20' + y;
    if (parseInt(a) > 12) return `${y}-${b.padStart(2, '0')}-${a.padStart(2, '0')}`;
    return `${y}-${a.padStart(2, '0')}-${b.padStart(2, '0')}`;
  }
  const dt = new Date(s);
  return isNaN(dt) ? '' : dt.toISOString().split('T')[0];
};

export const DEPTS = [
  'पीएचईएम', 'ओपीएच', 'पीएसआईटी&सी', 'पीएसआईटी', 'एचसीएफ़',
  'पीएचएमएम', 'ओ&एम (सिविल)', 'ओ&एम डैम', 'एमएमजी', 'स्थापना',
  'आईआर एवं कल्याण', 'जनसंपर्क', 'प्रशासन', 'राजभाषा', 'ट्रेनिंग',
  'सीएसआर', 'हार्डकोटिंग'
];

export const REPORTING = {
  'पीएचईएम': 'विभागाध्यक्ष (पीएचईएम)',
  'ओपीएच': 'विभागाध्यक्ष (ओपीएच)',
  'पीएसआईटी&सी': 'विभागाध्यक्ष (पीएसआईटी&सी)',
  'पीएसआईटी': 'विभागाध्यक्ष (पीएसआईटी)',
  'एचसीएफ़': 'विभागाध्यक्ष (एचसीएफ़)',
  'पीएचएमएम': 'विभागाध्यक्ष (पीएचएमएम)',
  'ओ&एम (सिविल)': 'विभागाध्यक्ष (ओ&एम (सिविल))',
  'ओ&एम डैम': 'विभागाध्यक्ष (ओएंडएम डैम)',
  'एमएमजी': 'विभागाध्यक्ष (एमएमजी)',
  'स्थापना': 'प्रबंधक (स्थापना)',
  'आईआर एवं कल्याण': 'प्रबंधक (आईआर एवं कल्याण)',
  'जनसंपर्क': 'प्रबंधक (जनसंपर्क)',
  'प्रशासन': 'प्रबंधक (प्रशासन)',
  'राजभाषा': 'प्रबंधक (राजभाषा)',
  'ट्रेनिंग': 'प्रबंधक (ट्रेनिंग)',
  'सीएसआर': 'प्रबंधक (सीएसआर)',
  'हार्डकोटिंग': 'विभागाध्यक्ष (हार्डकोटिंग)'
};

export const orderStatus = (order, certs) => {
  const cert = certs?.find(c => c.orderId === order?.id);
  if (cert?.certNo) return 'completed';
  if (order?.historical && !Object.keys(order?.rotation || {}).length) return 'issued';
  return 'active';
};

// CSV export
export const downloadCSV = (rows, filename) => {
  const csv = rows.map(r => r.map(v => `"${(v || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csv);
  a.download = filename;
  a.click();
};
