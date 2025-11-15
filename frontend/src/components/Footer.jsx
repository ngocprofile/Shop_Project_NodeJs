import { Link } from "react-router-dom";

// 1. Import file CSS Module
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    // 2. Sử dụng class từ file CSS Module
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Cột 1: Giới thiệu */}
          <div className={styles.column}>
            <h5 className={styles.title}>Fashion Shop</h5>
            <p className={styles.description}>
              Cửa hàng thời trang trực tuyến hàng đầu tại Việt Nam.
            </p>
            <div className={styles.socialIcons}>
              {/* Bạn cần import CSS của Bootstrap Icons ở file index.html để các icon này hoạt động */}
              <a href="#" className={styles.socialIconLink}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className={styles.socialIconLink}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className={styles.socialIconLink}>
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>

          {/* Cột 2: Thông Tin */}
          <div className={styles.column}>
            <h6 className={styles.title}>Thông Tin</h6>
            <ul className={styles.linkList}>
              <li>
                <Link to="/about" className={styles.linkItem}>
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.linkItem}>
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className={styles.linkItem}>
                  Vận chuyển
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Danh Mục */}
          <div className={styles.column}>
            <h6 className={styles.title}>Danh Mục</h6>
            <ul className={styles.linkList}>
              <li>
                <Link to="/men" className={styles.linkItem}>
                  Nam
                </Link>
              </li>
              <li>
                <Link to="/women" className={styles.linkItem}>
                  Nữ
                </Link>
              </li>
              <li>
                <Link to="/kids" className={styles.linkItem}>
                  Trẻ em
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Hỗ Trợ */}
          <div className={styles.column}>
            <h6 className={styles.title}>Hỗ Trợ</h6>
            <ul className={styles.linkList}>
              <li>
                <Link to="/faq" className={styles.linkItem}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/returns" className={styles.linkItem}>
                  Đổi trả
                </Link>
              </li>
              <li>
                <Link to="/payment" className={styles.linkItem}>
                  Thanh toán
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.copyright}>
          &copy; 2025 Fashion Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;