import styles from './UserProfile.module.css';

const ChangePassword = () => (
    <div className={styles.card}>
        <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Đổi mật khẩu</h3>
        </div>
        <div className={styles.cardBody}>
            <form className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Mật khẩu hiện tại</label>
                    <input type="password" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Mật khẩu mới</label>
                    <input type="password" className={styles.formInput} />
                </div>
                <div className={styles.formGroupFull}>
                    <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>Cập nhật</button>
                </div>
            </form>
        </div>
    </div>
);

export default ChangePassword;