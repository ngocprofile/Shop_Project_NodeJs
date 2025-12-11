import {
    Bars3Icon,
    ChevronDownIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    UserIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import api from '../api';
import { useCart } from'../context/CartContext';
import styles from './Header.module.css';

/**
 * == Component 1: MegaMenu (Desktop Dropdown) ==
 * Đã sửa lại cấu trúc để khớp với CSS Grid
 */
function MegaMenu({ categories }) {
    if (!categories || categories.length === 0) return null;

    return (
        <div className={styles.megaMenu}>
            {/* Container này sẽ chịu trách nhiệm chia cột (Grid) */}
            <div className={styles.megaMenuContainer}>
                {categories.map((category) => (
                    <div key={category._id || category.name} className={styles.megaMenuColumn}>
                        {/* Tiêu đề cột (Ví dụ: DÉP NAM) */}
                        <Link to={`/collections/${category.slug}`} className={styles.megaMenuColumnHeader}>
                            {category.name}
                        </Link>
                        
                        {/* Danh sách con (Ví dụ: Dép lê, Dép xỏ ngón...) */}
                        {category.children && category.children.length > 0 && (
                            <ul className={styles.megaMenuSubList}>
                                {category.children.map((sub) => (
                                    <li key={sub._id || sub.name}>
                                        <Link to={`/collections/${sub.slug}`} className={styles.megaMenuSubLink}>
                                            {sub.name}
                                        </Link>
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
 * == Component 2: MobileNavLinks ==
 */
function MobileNavLinks({ items, closeDrawer }) {
    const [openMenu, setOpenMenu] = useState(null);
    const toggle = (name) => setOpenMenu(openMenu === name ? null : name);

    return (
        <ul className={styles.mobileNavList}>
            {items.map((item) => (
                <li key={item.name} className={styles.mobileNavItem}>
                    {(!item.children || item.children.length === 0) ? (
                        <NavLink 
                            to={item.href} 
                            className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                            onClick={closeDrawer}
                        >
                            {item.name}
                        </NavLink>
                    ) : (
                        <>
                            <button onClick={() => toggle(item.name)} className={styles.mobileNavAccordionButton}>
                                <span>{item.name}</span>
                                <ChevronRightIcon className={`${styles.mobileNavAccordionIcon} ${openMenu === item.name ? styles.rotated : ''}`} />
                            </button>
                            <div className={`${styles.mobileNavAccordionPanel} ${openMenu === item.name ? styles.open : ''}`}>
                                <ul style={{ paddingLeft: '1rem' }}>
                                    <li>
                                        <Link to={item.href} className={styles.mobileNavSubLink} onClick={closeDrawer}>
                                            Xem tất cả "{item.name}"
                                        </Link>
                                    </li>
                                    {item.children.map(sub => (
                                        <li key={sub._id || sub.name}>
                                            <Link to={`/collections/${sub.slug}`} className={styles.mobileNavSubLink} onClick={closeDrawer}>
                                                {sub.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}

/**
 * == Component 3: Action Icons ==
 */
function ActionIcons() {
    const{ cartCount } = useCart(); 
    return (  
        <div className={styles.desktopActions}>  
            <button className={styles.actionIcon} title="Tìm kiếm">  
                <MagnifyingGlassIcon className={styles.iconSvg} />  
            </button> 
            <Link to="/profile" className={styles.actionIcon} title="Tài khoản">  
                <UserIcon className={styles.iconSvg} /> 
            </Link>  
            <Link to="/cart" className={styles.actionIcon} title="Giỏ hàng">  
                <div style={{ position: 'relative', display: 'flex' }}> 
                    <ShoppingBagIcon className={styles.iconSvg} />  
                    {cartCount > 0 && (  
                        <span className={styles.cartBadge}>  
                            {cartCount > 99 ? '99+' : cartCount}  
                        </span>   
                    )}  
                </div> 
            </Link> 
        </div> 
    ); 
} 

/**
 * == Component 4: NavLinks (Desktop) ==
 */
function NavLinks({ items }) {
    return (
        <ul className={styles.desktopNavList}>
            {items.map((item) => (
                <li key={item.name} className={styles.desktopNavItem}>
                    <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                            `${styles.desktopNavLink} ${isActive ? styles.active : ''}`
                        }
                    >
                        {item.name}
                        {item.children && item.children.length > 0 && (
                            <ChevronDownIcon className={styles.navIcon} />
                        )}
                    </NavLink>

                    {item.children && item.children.length > 0 && (
                        <MegaMenu categories={item.children} />
                    )}
                </li>
            ))}
        </ul>
    );
}

/**
 * == MAIN HEADER COMPONENT ==
 */
export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [navItems, setNavItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const { cartCount, refreshCartCount } = useCart(); 
    const location = useLocation();

    useEffect(() => {
        const fetchNavData = async () => {
            try {
                const res = await api.get('/categories/nav-tree');
                const categoryNavs = res.data.map(cat => ({
                    name: cat.name,
                    href: `/collections/${cat.slug}`,
                    children: cat.children
                }));

                setNavItems([
                    { name: 'Trang chủ', href: '/' },
                    ...categoryNavs,
                    { name: 'Voucher', href: '/vouchers' },
                ]);
            } catch (error) {
                console.error("Lỗi tải menu:", error);
                // Fallback data
                setNavItems([
                    { name: 'Trang chủ', href: '/' },
                    { name: 'Sản phẩm', href: '/products' },
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNavData();
    }, []);

    useEffect(() => {
        refreshCartCount();  
    }, [location.pathname, refreshCartCount]);  

    const closeMobileMenu = () => setIsMobileMenuOpen(false); 

    if (isLoading) return <header className={styles.header}><div className={styles.nav}>Loading...</div></header>; 

    return ( 
        <header className={styles.header}> 
            <nav className={styles.nav}> 
                <Link to="/" className={styles.logo}>STYLE CODE</Link> 

                <div className={styles.desktopNav}> 
                    <NavLinks items={navItems} /> 
                </div> 
                 
                <ActionIcons /> 

                <div className={styles.mobileMenuToggle}> 
                    <Link to="/cart" className={styles.actionIcon} style={{ marginRight: 10 }}> 
                         <div style={{ position: 'relative', display: 'flex' }}> 
                            <ShoppingBagIcon className={styles.iconSvg} /> 
                            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>} 
                        </div> 
                    </Link> 
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={styles.actionIcon}> 
                        {isMobileMenuOpen ? <XMarkIcon className={styles.iconSvg} /> : <Bars3Icon className={styles.iconSvg} />}
                    </button> 
                </div> 
            </nav> 

            <div className={`${styles.mobileOverlay } ${isMobileMenuOpen ? styles.open : ''}`} onClick={closeMobileMenu} />

            <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.open : ''}`}> 
                <div className={styles.mobileDrawerContent}>
                    <MobileNavLinks items={navItems} closeDrawer={closeMobileMenu} /> 
                </div>
            </div>
        </header>
    );
}