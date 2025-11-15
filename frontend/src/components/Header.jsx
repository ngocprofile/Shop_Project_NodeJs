import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// 1. IMPORT CSS MODULE
import styles from './Header.module.css';

// 2. IMPORT ICONS (vẫn cần thiết)
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// 3. DỮ LIỆU NAV (Giữ nguyên)
const navItems = [
  { name: 'Trang chủ', href: '/' },
  {
    name: 'Nam',
    href: '/collections/men',
    children: [
      {
        name: 'Hàng Mới Về',
        href: '/collections/men-new',
        children: [
          { name: 'Áo Mới', href: '/collections/men-new-tops' },
          { name: 'Quần Mới', href: '/collections/men-new-bottoms' },
        ],
      },
      {
        name: 'Giày',
        href: '/collections/men-shoes',
        children: [
          { name: 'Giày Thời Trang', href: '/collections/men-sneakers' },
          { name: 'Giày Tây', href: '/collections/men-dress-shoes' },
          { name: 'Giày Chạy Bộ', href: '/collections/men-running' },
        ],
      },
      {
        name: 'Quần Áo',
        href: '/collections/men-clothing',
        children: [
          { name: 'Áo Phông', href: '/collections/men-tshirts' },
          { name: 'Áo Sơ Mi', href: '/collections/men-shirts' },
          { name: 'Quần Jeans', href: '/collections/men-jeans' },
        ],
      },
    ],
  },
  {
    name: 'Nữ',
    href: '/collections/women',
    children: [
      {
        name: 'Váy',
        href: '/collections/women-dresses',
        children: [
            { name: 'Váy Công Sở', href: '/collections/women-office-dress' },
            { name: 'Váy Dạo Phố', href: '/collections/women-casual-dress' },
        ]
      },
      {
        name: 'Phụ Kiện',
        href: '/collections/women-accessories',
      }
    ],
  },
  { name: 'Sale', href: '/collections/sale' },
];


/**
 * == Component 1: MegaMenu (Dùng CSS Module) ==
 */
function MegaMenu({ categories }) {
  return (
    <div className={styles.megaMenu}>
      <div className={styles.megaMenuContent}>
        {categories.map((category) => (
          <div key={category.name} className={styles.megaMenuColumn}>
            <h4>
              <Link to={category.href}>{category.name}</Link>
            </h4>
            {category.children && (
              <ul>
                {category.children.map((subCategory) => (
                  <li key={subCategory.name}>
                    <Link to={subCategory.href}>{subCategory.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * == Component 2: MobileNavLinks (Logic giữ nguyên) ==
 * (Bạn sẽ cần tự style component này trong file Header.module.css)
 */
function MobileNavLinks() {
  const [openMenu, setOpenMenu] = useState(null); // Quản lý item Cấp 1
  const [openSubMenu, setOpenSubMenu] = useState(null); // Quản lý item Cấp 2

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
    setOpenSubMenu(null); 
  };
  
  const toggleSubMenu = (name) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  return (
    // Thêm class cho ul
    <ul className={styles.mobileNavList}> 
      {navItems.map((item) => (
        <li key={item.name} className={styles.mobileNavItem}>
          {!item.children ? (
            // 1. Link thường (ko có con)
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
              }
            >
              {item.name}
            </NavLink>
          ) : (
            // 2. Link có con (Accordion Cấp 1)
            <div>
              <button
                onClick={() => toggleMenu(item.name)}
                className={styles.mobileNavAccordionButton}
              >
                <span>{item.name}</span>
                <ChevronRightIcon
                  className={`${styles.mobileNavAccordionIcon} ${
                    openMenu === item.name ? styles.rotated : ''
                  }`}
                />
              </button>
              {/* Nội dung Cấp 1 */}
              <div
                className={`${styles.mobileNavAccordionPanel} ${
                  openMenu === item.name ? styles.open : ''
                }`}
              >
                <ul>
                    <li>
                        <Link to={item.href} className={styles.mobileNavSubLink}>Xem tất cả "{item.name}"</Link>
                    </li>
                    {item.children.map((subItem) => (
                        <li key={subItem.name}>
                            {!subItem.children ? (
                                <Link to={subItem.href} className={styles.mobileNavSubLink}>{subItem.name}</Link>
                            ) : (
                                // Accordion Cấp 2
                                <div>
                                    <button
                                        onClick={() => toggleSubMenu(subItem.name)}
                                        className={styles.mobileNavAccordionButton}
                                    >
                                        <span>{subItem.name}</span>
                                        <ChevronRightIcon className={`${styles.mobileNavAccordionIcon} ${openSubMenu === subItem.name ? styles.rotated : ''}`} />
                                    </button>
                                    <div className={`${styles.mobileNavAccordionPanel} ${openSubMenu === subItem.name ? styles.open : ''}`}>
                                        <ul style={{paddingLeft: '1rem'}}>
                                            <li>
                                                <Link to={subItem.href} className={styles.mobileNavSubLink}>Xem tất cả "{subItem.name}"</Link>
                                            </li>
                                            {subItem.children.map((grandChild) => (
                                                <li key={grandChild.name}>
                                                    <Link to={grandChild.href} className={styles.mobileNavSubLink}>{grandChild.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}


/**
 * == Component 3: Logo ==
 */
function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      STYLE CODE
    </Link>
  );
}

/**
 * == Component 4: NavLinks (Desktop) ==
 */
function NavLinks() {
  return (
    <ul className={styles.desktopNavList}>
      {navItems.map((item) => (
        <li key={item.name} className={styles.desktopNavItem}>
          <NavLink
            to={item.href}
            // Logic quan trọng: kết hợp class CSS Module và class 'active'
            className={({ isActive }) =>
              `${styles.desktopNavLink} ${isActive ? styles.active : ''}`
            }
          >
            {item.name}
            {item.children && (
              <ChevronDownIcon className={styles.navIcon} />
            )}
          </NavLink>

          {/* MegaMenu vẫn hoạt động vì logic ẩn/hiện đã nằm trong CSS */}
          {item.children && <MegaMenu categories={item.children} />}
        </li>
      ))}
    </ul>
  );
}

/**
 * == Component 5: ActionIcons (ĐÃ SỬA) ==
 * Nhận `itemCount` như một prop
 */
function ActionIcons({ itemCount }) { // <-- SỬA 1: Nhận prop
  return (
    <div className={styles.desktopActions}>
      <button className={styles.actionIcon}>
        <MagnifyingGlassIcon className={styles.iconSvg} />
      </button>
      <Link to="/profile" className={styles.actionIcon}>
        <UserIcon className={styles.iconSvg} />
      </Link>
      <Link to="/cart" className={styles.actionIcon}>
        <ShoppingBagIcon className={styles.iconSvg} />
        {itemCount > 0 && ( // <-- SỬA 2: Dùng prop
          <span className={styles.cartBadge}>
            {itemCount} {/* <-- SỬA 3: Dùng prop */}
          </span>
        )}
      </Link>
    </div>
  );
}

/**
 * == Component Chính: Header (ĐÃ SỬA) ==
 */
export default function Header() { 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // SỬA 4: Khai báo biến ở phạm vi cha (parent scope)
  // Trong tương lai, bạn sẽ lấy số này từ Context hoặc Redux
  const itemCountInCart = 3; 

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        
        {/* === 1. Logo === */}
        <Logo />

        {/* === 2. Điều hướng Desktop === */}
        <div className={styles.desktopNav}>
          <NavLinks />
        </div>

        {/* === 3. Các nút Hành động (Desktop) === */}
        <div className={styles.desktopActions}>
          {/* SỬA 5: Truyền prop 'itemCount' vào */}
          <ActionIcons itemCount={itemCountInCart} />
        </div>

        {/* === 4. Nút bật/tắt Mobile Menu === */}
        <div className={styles.mobileMenuToggle}>
          <Link to="/cart" className={styles.actionIcon}>
              <ShoppingBagIcon className={styles.iconSvg} />
              {/* SỬA 6: Giờ biến này đã hợp lệ */}
              {itemCountInCart > 0 && (
                  <span className={styles.cartBadge}>{itemCountInCart}</span>
              )}
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <XMarkIcon className={styles.iconSvg} />
            ) : (
              <Bars3Icon className={styles.iconSvg} />
            )}
          </button>
        </div>
      </nav>

      {/* === 5. Mobile Menu Drawer === */}
      <div
        className={`${styles.mobileDrawer} ${
          isMobileMenuOpen ? styles.open : ''
        }`}
      >
        <div className={styles.mobileDrawerContent}>
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..."
            className={styles.mobileSearch}
          />
          
          <MobileNavLinks />
          
          <div className={styles.mobileAccountActions}>
            <Link to="/account" className={styles.mobileAccountLink}>
              <UserIcon className={styles.iconSvg} />
              Tài khoản của tôi
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}