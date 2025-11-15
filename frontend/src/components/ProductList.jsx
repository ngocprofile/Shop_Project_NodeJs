// src/components/ProductList.jsx
import { useState, useEffect } from 'react';
import API from '../api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data?.message || `Lỗi ${err.response.status}`);
        } else if (err.request) {
          setError('Không kết nối được với server. Kiểm tra backend có đang chạy?');
        } else {
          setError('Lỗi không xác định: ' + err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', padding: '20px' }}>Đang tải sản phẩm...</p>;
  if (error) return <p style={{ color: '#d32f2f', textAlign: 'center', padding: '20px', background: '#ffebee', borderRadius: '8px' }}>{error}</p>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', padding: '20px' }}>
      {products.length === 0 ? (
        <p style={{ color: '#666', fontSize: '16px' }}>Chưa có sản phẩm nào.</p>
      ) : (
        products.map(product => (
          <div
            key={product._id}
            style={{
              border: '1px solid #eee',
              borderRadius: '14px',
              padding: '16px',
              width: '230px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              background: '#fff',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {product.images && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }}
              />
            ) : (
              <div style={{ height: '150px', background: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#aaa' }}>No image</span>
              </div>
            )}
            <h3 style={{ fontSize: '15px', margin: '14px 0 8px', height: '40px', overflow: 'hidden', fontWeight: '600' }}>
              {product.name}
            </h3>
            <p style={{ margin: '6px 0', fontWeight: 'bold', color: '#d32f2f', fontSize: '16px' }}>
              {product.finalPrice?.toLocaleString()}đ
            </p>
            {product.basePrice !== product.finalPrice && (
              <p style={{ margin: '4px 0', textDecoration: 'line-through', color: '#999', fontSize: '13px' }}>
                {product.basePrice?.toLocaleString()}đ
              </p>
            )}
            {product.appliedVoucher && (
              <p style={{ fontSize: '12px', color: '#2e7d32', marginTop: '8px', fontWeight: '500' }}>
                Voucher: {product.appliedVoucher}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;