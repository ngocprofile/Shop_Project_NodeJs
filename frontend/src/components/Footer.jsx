import { Link } from "react-router-dom";
// Import icon từ lucide-react (đồng bộ, nhẹ và hiện đại)
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Cột 1: Thương hiệu */}
          <div className={styles.column}>
            <h3 className={styles.logoTitle}>STYLE CODE</h3>
            <p className={styles.description}>
              Định hình phong cách cá nhân với những xu hướng thời trang mới nhất. Chất lượng tạo nên sự khác biệt.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIconLink} aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className={styles.socialIconLink} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className={styles.socialIconLink} aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className={styles.socialIconLink} aria-label="Youtube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Cột 2: Về chúng tôi */}
          <div className={styles.column}>
            <h6 className={styles.title}>Về Style Code</h6>
            <ul className={styles.linkList}>
              <li><Link to="/about" className={styles.linkItem}>Câu chuyện thương hiệu</Link></li>
              <li><Link to="/careers" className={styles.linkItem}>Tuyển dụng</Link></li>
              <li><Link to="/stores" className={styles.linkItem}>Hệ thống cửa hàng</Link></li>
              <li><Link to="/news" className={styles.linkItem}>Tin tức thời trang</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div className={styles.column}>
            <h6 className={styles.title}>Hỗ Trợ</h6>
            <ul className={styles.linkList}>
              <li><Link to="/faq" className={styles.linkItem}>Hỏi đáp thường gặp</Link></li>
              <li><Link to="/size-guide" className={styles.linkItem}>Hướng dẫn chọn size</Link></li>
              <li><Link to="/shipping" className={styles.linkItem}>Chính sách vận chuyển</Link></li>
              <li><Link to="/returns" className={styles.linkItem}>Đổi trả & Hoàn tiền</Link></li>
            </ul>
          </div>

          {/* Cột 4: Chính sách */}
          <div className={styles.column}>
            <h6 className={styles.title}>Chính Sách</h6>
            <ul className={styles.linkList}>
              <li><Link to="/security" className={styles.linkItem}>Bảo mật thông tin</Link></li>
              <li><Link to="/terms" className={styles.linkItem}>Điều khoản sử dụng</Link></li>
              <li><Link to="/payment" className={styles.linkItem}>Phương thức thanh toán</Link></li>
              <li><Link to="/contact" className={styles.linkItem}>Liên hệ hợp tác</Link></li>
            </ul>
          </div>

        </div>

        <hr className={styles.divider} />

        <div className={styles.copyright}>
          <span>&copy; {new Date().getFullYear()} Style Code Vietnam. All rights reserved.</span>
          <span>Designed for optimal shopping experience.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;