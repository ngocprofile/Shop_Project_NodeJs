// src/pages/Login.jsx
import { Check, Chrome, Eye, EyeOff, Facebook, Shield } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import useAuth from '../hooks/CheckToken'; // Import hook để gọi login() và update state global

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const [forgotEmail, setForgotEmail] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');

  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');

  const { login } = useAuth(); // Lấy hàm login từ hook
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      
      // Lưu tokens và user vào localStorage (giữ nguyên như cũ)
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // hiển thị console log để kiểm tra dữ liệu nhận về
      console.log('Login response data:', res.data);
      
      // Gọi hàm login từ hook để update state global (isLoggedIn = true, setUser)
      // Lưu ý: Hook hiện tại dùng key 'token', nhưng bạn lưu 'accessToken' → cần cập nhật hook để dùng 'accessToken'
      login(res.data.accessToken, res.data.user); // Truyền accessToken làm token
      
      alert('Đăng nhập thành công!');
      // kiểm tra role (nếu là admin hoặc staff thì chuyển đến /admin) còn lại về trang chủ
      console.log('User role:', res.data.user.role);
      if (res.data.user.role === 'admin' || res.data.user.role === 'staff') {
        navigate('/admin/dashboard');
        return;
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Email hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setLoading(true);
    try {
      await API.post('/auth/forgot-password-otp', { email: forgotEmail });
      setForgotSuccess('Mã OTP đã được gửi về email!');
      setShowOTP(true);
    } catch (err) {
      setForgotError(err.response?.data?.message || 'Không tìm thấy email');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setOtpError('');
    setOtpSuccess('');
    setLoading(true);
    try {
      await API.post('/auth/verify-otp-reset', {
        email: forgotEmail,
        otp,
        newPassword
      });
      setOtpSuccess('Đặt lại mật khẩu thành công! Vui lòng đăng nhập.');
      setTimeout(() => handleBack(), 2000);
    } catch (err) {
      setOtpError(err.response?.data?.message || 'OTP không đúng hoặc đã hết hạn');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowForgot(false);
    setShowOTP(false);
    setForgotEmail('');
    setOtp('');
    setNewPassword('');
    setForgotError('');
    setForgotSuccess('');
    setOtpError('');
    setOtpSuccess('');
  };

  return (
    <div style={pageStyle}>
      <div style={backgroundStyle}>
        <div style={overlayStyle}>
          <h1 style={titleStyle}>Chào mừng đến với Shop</h1>
          <p style={subtitleStyle}>Đăng nhập để nhận ưu đãi đặc biệt!</p>
          <div style={offersStyle}>
            <div style={offerItem}>Giảm 20% đơn đầu</div>
            <div style={offerItem}>Miễn phí vận chuyển</div>
            <div style={offerItem}>Tích điểm đổi quà</div>
          </div>
        </div>
      </div>

      <div style={formContainerStyle}>
        {!showForgot ? (
          <form onSubmit={handleLogin} style={formStyle}>
            <h2 style={formTitle}>Đăng Nhập</h2>
            {error && <div style={errorStyle}>{error}</div>}
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'} placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={eyeButtonStyle}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div style={{ textAlign: 'right', margin: '8px 0' }}>
              <button type="button" onClick={() => setShowForgot(true)} style={linkButton}>Quên mật khẩu?</button>
            </div>
            <button type="submit" disabled={loading} style={{ ...submitButtonStyle, background: isHovered ? '#218838' : '#28a745' }}
              onMouseEnter={() => !loading && setIsHovered(true)} onMouseLeave={() => !loading && setIsHovered(false)}>
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
            <div style={{ textAlign: 'center', margin: '15px 0', color: '#666', fontSize: '14px' }}>Hoặc đăng nhập bằng</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="#" style={socialButtonStyle('#3b5998')}><Facebook size={18} /> Facebook</a>
              <a href="#" style={socialButtonStyle('#db4437')}><Chrome size={18} /> Google</a>
            </div>
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' }}>
              Chưa có tài khoản? <Link to="/register" style={{ color: '#007bff', fontWeight: '600' }}>Đăng ký ngay</Link>
            </p>
          </form>
        ) : !showOTP ? (
          <form onSubmit={handleSendOTP} style={formStyle}>
            <h2 style={formTitle}><Shield size={24} style={{ marginRight: '8px' }} /> Quên Mật Khẩu</h2>
            {forgotError && <div style={errorStyle}>{forgotError}</div>}
            {forgotSuccess && <div style={successStyle}>{forgotSuccess}</div>}
            <input type="email" placeholder="Nhập email của bạn" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required style={inputStyle} />
            <p style={{ fontSize: '12px', color: '#7f8c8d', margin: '8px 0' }}>Chúng tôi sẽ gửi mã OTP 6 số về email.</p>
            <button type="submit" disabled={loading} style={{ ...submitButtonStyle, background: isHovered ? '#0069d9' : '#007bff' }}
              onMouseEnter={() => !loading && setIsHovered(true)} onMouseLeave={() => !loading && setIsHovered(false)}>
              {loading ? 'Đang gửi...' : 'Gửi OTP'}
            </button>
            <button type="button" onClick={handleBack} style={linkButton}>Quay lại đăng nhập</button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} style={formStyle}>
            <h2 style={formTitle}><Check size={24} style={{ marginRight: '8px' }} /> Nhập OTP</h2>
            {otpError && <div style={errorStyle}>{otpError}</div>}
            {otpSuccess && <div style={successStyle}>{otpSuccess}</div>}
            <input type="text" placeholder="Mã OTP (6 số)" value={otp} onChange={e => setOtp(e.target.value)} maxLength="6" required style={inputStyle} />
            <div style={{ position: 'relative' }}>
              <input type={showNewPassword ? 'text' : 'password'} placeholder="Mật khẩu mới" value={newPassword} onChange={e => setNewPassword(e.target.value)} required style={inputStyle} />
              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} style={eyeButtonStyle}>
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit" disabled={loading} style={{ ...submitButtonStyle, background: isHovered ? '#218838' : '#28a745' }}
              onMouseEnter={() => !loading && setIsHovered(true)} onMouseLeave={() => !loading && setIsHovered(false)}>
              {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
            </button>
            <button type="button" onClick={handleBack} style={linkButton}>Hủy</button>
          </form>
        )}
      </div>
    </div>
  );
};

// === STYLES (giữ nguyên như trước) ===
const pageStyle = { minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' };
const backgroundStyle = { position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1441986300917-6467261175d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80")', backgroundSize: 'cover', zIndex: 1 };
const overlayStyle = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', zIndex: 2, maxWidth: '600px' };
const titleStyle = { fontSize: '42px', fontWeight: 'bold', marginBottom: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' };
const subtitleStyle = { fontSize: '20px', marginBottom: '30px' };
const offersStyle = { display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' };
const offerItem = { background: 'rgba(255,255,255,0.2)', padding: '12px 20px', borderRadius: '50px', fontSize: '15px', backdropFilter: 'blur(5px)' };
const formContainerStyle = { zIndex: 10, width: '100%', maxWidth: '420px', padding: '0 20px' };
const formStyle = { background: 'rgba(255,255,255,0.95)', padding: '36px', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' };
const formTitle = { textAlign: 'center', marginBottom: '20px', color: '#2c3e50', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const inputStyle = { display: 'block', width: '100%', padding: '14px 16px', margin: '12px 0', border: '1px solid #ddd', borderRadius: '10px', fontSize: '16px', backgroundColor: '#fafafa' };
const eyeButtonStyle = { position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7f8c8d' };
const submitButtonStyle = { width: '100%', padding: '15px', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: 'all 0.3s' };
const socialButtonStyle = (color) => ({ flex: 1, padding: '12px', background: color, color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', textDecoration: 'none' });
const errorStyle = { background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' };
const successStyle = { background: '#e8f5e8', color: '#2e7d32', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' };
const linkButton = { background: 'none', border: 'none', color: '#007bff', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline', marginTop: '15px', display: 'block', width: '100%', textAlign: 'center' };

export default Login;
