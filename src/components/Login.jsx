// src/components/Login.jsx
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState(false);
  const [show, setShow] = useState(false);

  const attempt = () => {
    if (onLogin(pwd.trim())) setErr(false);
    else setErr(true);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: 'var(--surf)', border: '1px solid var(--border2)',
        borderRadius: 14, padding: '32px 26px', width: '100%', maxWidth: 360,
        textAlign: 'center'
      }}>
        <div style={{
          width: 54, height: 54, background: 'var(--accent)', borderRadius: 13,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 20, color: '#000', margin: '0 auto 16px'
        }}>IT</div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>NJHPS Training System</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.6 }}>
          नाथपा झाकड़ी हाइड्रो पावर स्टेशन<br />
          औद्योगिक प्रशिक्षण प्रबंधन प्रणाली
        </div>

        <div className="field" style={{ textAlign: 'left' }}>
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={show ? 'text' : 'password'}
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              onKeyUp={e => e.key === 'Enter' && attempt()}
              placeholder="njhps2024"
              autoComplete="current-password"
              style={{ fontSize: 16, paddingRight: 50 }}
              autoFocus
            />
            <button
              onClick={() => setShow(!show)}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer',
                fontSize: 12, padding: '4px 6px'
              }}
            >{show ? '🙈 Hide' : '👁 Show'}</button>
          </div>
        </div>

        {err && (
          <div style={{ color: 'var(--red)', fontSize: 12, marginBottom: 10 }}>
            Incorrect password
          </div>
        )}

        <button
          className="btn btn-primary btn-block"
          style={{ fontSize: 16, minHeight: 50, marginTop: 4 }}
          onClick={attempt}
        >Login →</button>

        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 14 }}>
          Default: <strong style={{ color: 'var(--accent)' }}>njhps2024</strong>
        </div>
      </div>
    </div>
  );
}
