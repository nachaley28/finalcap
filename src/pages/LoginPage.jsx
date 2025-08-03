import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Figure } from 'react-bootstrap';
import { useAuth } from '../services/AuthContext';
import { useTheme } from '../services/ThemeContext';
import PasswordInput from '../components/forms/PasswordInput';
import {
  ImgDefaultProfile
} from '../components/general/Images';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const { theme } = useTheme();

  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [visible, setVisible] = useState(false);

  
  const colors = theme === 'dark'
    ? {
        primary: '#B3E5FC',
        accent: '#004D4D',
        background: 'rgba(30,30,30,0.9)',
        text: '#FFFFFF'
      }
    : {
        primary: '#004D4D',
        accent: '#B3E5FC',
        background: 'rgba(250, 250, 250, 0.9)',
        text: '#1A1A1A'
      };

 
  useEffect(() => setVisible(true), []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const { success, error } = await login({ email, password });
    if (!success) {
      setStatus({ variant: 'danger', message: error || 'Login failed.' });
    }
  };

  return (
    <div className="position-relative vh-100 vw-100">
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{background: `linear-gradient(135deg, ${colors.accent}55, rgba(0,0,0,0))`}}/>

      <div className="position-relative z-1 d-flex align-items-center justify-content-center h-100">
        <form
          onSubmit={handleLogin}
          className="p-4 p-md-5 rounded-4 shadow-lg w-100"
          style={{
            maxWidth: 400,
            backgroundColor: colors.background,
            border: `3px solid ${colors.accent}`,
            color: colors.text,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease'
          }}
          >
          <Figure
            className="d-flex justify-content-center mb-3"
            style={{
              transform: visible ? 'scale(1)' : 'scale(0.8)',
              transition: 'transform 0.5s ease'
            }}
          >
            <Figure.Image
              width={90}
              height={90}
              src={ImgDefaultProfile}
              alt="logo"
              className="rounded-circle shadow"
              style={{ border: `3px solid ${colors.accent}` }}
            />
          </Figure>

          <h3 className="fw-bold text-center mb-4" style={{ color: colors.primary }}>
            Login
          </h3>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
        </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <PasswordInput value={password} onChangeFunction={(e) => setPass(e.target.value)} />
          </div>

          {status && (
            <Alert variant={status.variant} className="p-2 text-center">
              {status.message}
            </Alert>
          )}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link
              to="/recovery"
              className="text-decoration-none"
              style={{
                color: colors.primary,
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
            >
              Forgot Password
            </Link>

            <button
              type="submit"
              className="btn fw-bold"
              disabled={isLoading}
              style={{
                backgroundColor: colors.primary,
                border: 'none',
                color: '#fff',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = theme === 'dark' ? '#99e2fc' : '#006666')}
              onMouseOut={(e) => (e.target.style.backgroundColor = colors.primary)}
            >
              {isLoading ? 'Logging in…' : 'Login'}
            </button>
          </div>

          <p className="text-muted text-center small mb-0">
            {import.meta.env.VITE_SYSTEM_NAME} : {import.meta.env.VITE_SYSTEM_VERSION}
          </p>
        </form>
      </div>
    </div>
  );
}
