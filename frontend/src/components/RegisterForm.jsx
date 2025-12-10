// src/components/RegisterForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Eye, EyeOff } from 'lucide-react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // MỚI: nhập lại mật khẩu
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // MỚI: show/hide nhập lại
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleFocus = (e) => {
    e.target.style.borderColor = '#28a745';
    e.target.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#ddd';
    e.target.style.boxShadow = 'none';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra đầy đủ
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    // KIỂM TRA MẬT KHẨU KHỚP
    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!');
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim() || undefined,
      role: "customer"
    };

    console.log('Gửi đăng ký:', payload);

    try {
      const res = await API.post('/auth/register', payload);
      console.log('Thành công:', res.data);
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (err) {
      console.error('Lỗi:', err.response?.data);
      const errors = err.response?.data?.errors?.map(e => e.msg).join(', ') 
                   || err.response?.data?.message 
                   || 'Lỗi đăng ký';
      setError(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>
        Đăng Ký Tài Khoản
      </h2>

      {error && (
        <div style={{
          background: '#ffebee', color: '#c62828', padding: '12px 16px',
          borderRadius: '8px', margin: '0 0 16px 0', fontSize: '14px',
          border: '1px solid #ffcdd2', textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <input placeholder="Họ và tên" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />

      {/* MẬT KHẨU */}
      <div style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Mật khẩu"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} style={eyeButtonStyle}>
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* NHẬP LẠI MẬT KHẨU */}
      <div style={{ position: 'relative' }}>
        <input
          type={showConfirm ? 'text' : 'password'}
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={eyeButtonStyle}>
          {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#7f8c8d', margin: '8px 0 14px' }}>
        Mật khẩu: ít nhất 8 ký tự, có chữ hoa, số, ký tự đặc biệt (@$!%*?)
      </p>

      <input type="tel" placeholder="Số điện thoại (tùy chọn)" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />

      <button
        type="submit"
        style={{ ...submitButtonStyle, background: isHovered ? '#218838' : '#28a745' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Đăng Ký
      </button>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' }}>
        Đã có tài khoản? <a href="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}>Đăng Nhập ngay</a>
      </p>
    </form>
  );
};

// ==================== STYLES ====================
const formStyle = { 
  maxWidth: '420px', 
  margin: '40px auto', 
  padding: '36px', 
  background: '#fff', 
  borderRadius: '16px', 
  boxShadow: '0 8px 30px rgba(0,0,0,0.12)', 
  fontFamily: 'sans-serif' 
};

const inputStyle = { 
  display: 'block', 
  width: '100%', 
  padding: '14px 16px', 
  margin: '10px 0', 
  border: '1px solid #ddd', 
  borderRadius: '10px', 
  fontSize: '16px', 
  transition: 'border 0.2s, box-shadow 0.2s', 
  outline: 'none', 
  backgroundColor: '#fafafa' 
};

const eyeButtonStyle = { 
  position: 'absolute', 
  right: '14px', 
  top: '50%', 
  transform: 'translateY(-50%)', 
  background: 'none', 
  border: 'none', 
  cursor: 'pointer', 
  color: '#7f8c8d' 
};

const submitButtonStyle = { 
  width: '100%', 
  padding: '15px', 
  color: 'white', 
  border: 'none', 
  borderRadius: '10px', 
  fontSize: '16px', 
  fontWeight: 'bold', 
  cursor: 'pointer', 
  marginTop: '14px', 
  transition: 'background 0.3s ease' 
};

export default RegisterForm;
