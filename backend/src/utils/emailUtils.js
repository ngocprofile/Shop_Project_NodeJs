// backend/utils/emailUtils.js
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

/**
 * Tạo transporter Nodemailer (cấu hình SMTP)
 */
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

/**
 * HÀM CHUNG: GỬI EMAIL – BẮT LỖI, KHÔNG CRASH SERVER
 */
export const sendEmail = async (to, subject, html) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Lỗi: Thiếu EMAIL_USER hoặc EMAIL_PASS trong .env');
        return false;
    }

    const transporter = createTransporter();
    const mailOptions = {
        from: `"Shop API" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}: ${subject}`);
        return true;
    } catch (error) {
        console.error('Lỗi gửi email:', error.message || error);
        return false;
    }
};

/**
 * Gửi email xác thực đăng ký
 */
export const sendWelcomeEmail = async (email, name, verifyLink = '') => {
    const transporter = createTransporter();
    const mailOptions = {
        from: `"Shop API" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Chào mừng bạn đến với Shop API!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #007bff;">Xin chào ${name}!</h1>
                <p>Cảm ơn bạn đã đăng ký tài khoản tại Shop API.</p>
                ${verifyLink ? `<p>Click <a href="${verifyLink}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Xác Thực Email</a> để kích hoạt tài khoản.</p>` : ''}
                <p>Nếu cần hỗ trợ, liên hệ chúng tôi nhé!</p>
                <p>Trân trọng,<br>Team Shop API</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Lỗi gửi welcome email:', error);
        return false;
    }
};

/**
 * Gửi email chứa mã OTP xác thực
 */
export const sendOtpEmail = async (email, otp, name) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"Shop API" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Mã Xác Thực OTP - Shop API',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0d6efd;">Xin chào ${name}!</h2>
                <p>Bạn đã yêu cầu mã xác thực để đặt lại mật khẩu hoặc xác minh tài khoản.</p>
                <p>Mã OTP của bạn là:</p>
                <div style="font-size: 32px; font-weight: bold; color: #0d6efd; letter-spacing: 4px; text-align: center; margin: 20px 0;">
                    ${otp}
                </div>
                <p>Mã này có hiệu lực trong <strong>10 phút</strong>. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
                <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.</p>
                <hr style="margin-top: 30px;">
                <p style="font-size: 14px; color: #555;">Trân trọng,<br>Đội ngũ hỗ trợ Shop API</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Lỗi gửi email OTP:', error);
        return false;
    }
};

/**
 * Gửi email xác nhận đơn hàng (Đã sửa lỗi field name)
 */
export const sendOrderConfirmationEmail = async (email, name, order) => {
    const transporter = createTransporter();

    // 1. Helper format tiền tệ việt nam
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // 2. SỬA LỖI CHÍNH: Lấy đúng field 'orderItems'
    // Dùng toán tử || để fallback nếu lỡ truyền object cũ
    const itemsList = order.orderItems || order.items || [];

    // 3. Tạo HTML danh sách sản phẩm (Lấy thông tin từ Snapshot)
    const itemsHtml = itemsList.map(item => {
        // item.name: Tên sản phẩm (Snapshot)
        // item.variantName: Tên biến thể (Snapshot, VD: Đen / XL)
        const productName = item.name || 'Sản phẩm';
        const variantInfo = item.variantName ? `(${item.variantName})` : '';
        const price = item.totalItemPrice || (item.price * item.quantity);

        return `
            <li style="margin-bottom: 5px;">
                <strong>${productName} ${variantInfo}</strong>
                <br/>
                SL: ${item.quantity} x ${formatCurrency(item.price)} 
                = <span style="color: #e53e3e;">${formatCurrency(price)}</span>
            </li>
        `;
    }).join('');

    // 4. SỬA CÁC FIELD KHÁC (totalPrice, orderStatus)
    const totalPrice = order.totalPrice || order.total || 0;
    const orderStatus = order.orderStatus || order.status || 'Pending';

    const mailOptions = {
        from: `"Shop API" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Xác Nhận Đơn Hàng #${order._id.toString().slice(-6).toUpperCase()} - Shop API`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
                <h2 style="color: #28a745; text-align: center;">Đặt Hàng Thành Công!</h2>
                <p>Xin chào <strong>${name}</strong>,</p>
                <p>Cảm ơn bạn đã mua sắm tại Shop API. Đơn hàng của bạn đã được tiếp nhận và đang chờ xử lý.</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Mã đơn hàng:</strong> #${order._id}</p>
                    <p style="margin: 5px 0;"><strong>Ngày đặt:</strong> ${new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                    <p style="margin: 5px 0;"><strong>Trạng thái:</strong> ${orderStatus}</p>
                    <p style="margin: 5px 0; font-size: 18px;">
                        <strong>Tổng thanh toán:</strong> <span style="color: #d32f2f;">${formatCurrency(totalPrice)}</span>
                    </p>
                </div>

                <h3>Chi tiết đơn hàng:</h3>
                <ul style="padding-left: 20px; line-height: 1.6;">
                    ${itemsHtml}
                </ul>

                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                
                <p style="font-size: 13px; color: #666;">
                    Nếu bạn có bất kỳ câu hỏi nào, vui lòng trả lời email này hoặc liên hệ hotline hỗ trợ.
                </p>
                <p style="font-size: 13px; color: #666;">Trân trọng,<br><strong>Team Shop API</strong></p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email xác nhận đã gửi đến: ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Lỗi gửi email:', error);
        return false;
    }
};

/**
 * Gửi email thông báo thay đổi mật khẩu
 */
export const sendPasswordChangeEmail = async (email, name) => {
    const transporter = createTransporter();
    const mailOptions = {
        from: `"Shop API" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Mật Khẩu Đã Được Thay Đổi - Shop API',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #ffc107;">Xin chào ${name}!</h1>
                <p>Mật khẩu tài khoản của bạn đã được thay đổi thành công.</p>
                <p>Nếu không phải bạn, hãy liên hệ hỗ trợ ngay lập tức để bảo mật tài khoản.</p>
                <p>Trân trọng,<br>Team Shop API</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password change email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Lỗi gửi password change email:', error);
        return false;
    }
};

/**
 * Gửi email thông báo (general)
 */
export const sendNotificationEmail = async (email, title, message, link = '') => {
    const transporter = createTransporter();
    const linkHtml = link ? `<p><a href="${link}" style="color: #007bff;">Xem chi tiết</a></p>` : '';

    const mailOptions = {
        from: `"Shop API" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: title,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #007bff;">Thông Báo Mới</h1>
                <p>${message}</p>
                ${linkHtml}
                <p>Trân trọng,<br>Team Shop API</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent to ${email}: ${title}`);
        return true;
    } catch (error) {
        console.error('Lỗi gửi notification email:', error);
        return false;
    }
};

/**
 * Gửi email voucher mới
 */
export const sendNewVoucherEmail = async (email, name, voucher) => {
    const transporter = createTransporter();
    const voucherLink = `${process.env.CLIENT_URL}/vouchers/${voucher._id}`;

    const mailOptions = {
        from: `"Shop API" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Voucher Mới: ${voucher.title} - Giảm ${voucher.discountValue}%!`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #28a745;">Xin chào ${name}!</h1>
                <p>Voucher mới "${voucher.title}" đã được tạo!</p>
                <ul>
                    <li><strong>Mã:</strong> ${voucher.code}</li>
                    <li><strong>Giảm:</strong> ${voucher.discountValue}%</li>
                    <li><strong>Loại:</strong> ${voucher.discountType}</li>
                </ul>
                <p>Áp dụng ngay tại cửa hàng! Click <a href="${voucherLink}" style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Xem Voucher</a></p>
                <p>Trân trọng,<br>Team Shop API</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`New voucher email sent to ${email}: ${voucher.code}`);
        return true;
    } catch (error) {
        console.error('Lỗi gửi new voucher email:', error);
        return false;
    }
};

/**
 * Gửi email tùy chỉnh
 */
export const sendCustomEmail = async (email, subject, htmlContent) => {
    const transporter = createTransporter();
    const mailOptions = {
        from: `"Shop API" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Custom email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Lỗi gửi custom email:', error);
        return false;
    }
};

/**
 * Test email
 */
export const testEmail = async (toEmail) => {
    return await sendCustomEmail(toEmail, 'Test Email from Shop API', '<h1>Test successful!</h1>');
};

/**
 * GỬI MÃ OTP ĐẶT LẠI MẬT KHẨU
 */
export const sendOTPEmail = async (email, otp, name) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;">
            <h1 style="color: #28a745; text-align: center;">Mã OTP của bạn</h1>
            <p style="font-size: 16px; color: #333;">Xin chào <strong>${name}</strong>,</p>
            <p>Mã OTP để đặt lại mật khẩu là:</p>
            <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #28a745; background: #fff; padding: 10px 20px; border: 2px dashed #28a745; border-radius: 10px;">
                    ${otp}
                </span>
            </div>
            <p>Mã này có hiệu lực trong <strong>10 phút</strong>.</p>
            <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
            <hr>
            <p style="font-size: 12px; color: #777; text-align: center;">
                © 2025 Shop API. All rights reserved.
            </p>
        </div>
    `;

    return await sendEmail(email, 'Mã OTP đặt lại mật khẩu - Shop API', html);
};