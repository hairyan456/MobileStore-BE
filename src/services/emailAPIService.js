require('dotenv').config();
import nodemailer from "nodemailer";

const getBodyHTMLEmail = (dataSend) => {
    return `
<h3>Xin chào ${dataSend.shippingAddress.fullName}!</h3>
<p>Bạn nhận được email này vì đã đặt đơn hàng trên: <a target="_blank " href="http://localhost:3000/">www.mobilestore.vn</a></p>
<p>Thông tin cá nhân:</p>
<div><b>Họ và tên:</b> ${dataSend.shippingAddress.fullName}</div>
<div><b>Số điện thoại:</b> ${dataSend.shippingAddress.phone}</div>
<div><b>Địa chỉ:</b> ${dataSend.shippingAddress.address}</div>
<div><b>Thành phố:</b> ${dataSend.shippingAddress.city}</div>

<br/>
<p>Thông tin đơn hàng của bạn:</p>
<div><b>Số lượng sản phẩm:</b> ${dataSend.orderItems.length}</div>
<div><b>Tổng tiền:</b> ${dataSend.totalPrice} $</div>
<div><b>Phương thức vận chuyển:</b> ${dataSend.shippingPrice === 15 ? 'Giao hàng tiết kiệm' : 'Giao hàng hỏa tốc'}</div>
<div><b>Phương thức thanh toán:</b> ${dataSend.paymentMethod === 'cash' ? 'Thanh toán tiền mặt khi nhận hàng' : 'Thanh toán qua ví điện tử'}</div>
<div><b>Trạng thái:</b> ${dataSend.isPaid === true ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>

<br/>
<div>Xin chân thành cảm ơn.</div>
`;
}

const sendSimpleEmail = async (dataSend) => {
    //create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"MobileStore 👻" <hairyan789@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Thông báo xác nhận đơn hàng - MobileStore", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

// const getBodyHTMLEmailRemedy = (dataSend) => {
//     let result = '';
//     if (dataSend.language === 'vi') {
//         result = `
// <h3>Xin chào ${dataSend.patientName}!</h3>
// <p>Bạn nhận được email này vì đã hoàn tất khám bệnh trên: <a target="_blank " href="http://localhost:3000/">Bookingcare.vn</a></p>
// <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm dưới đây.</p>
// <div>Xin chân thành cảm ơn.</div>
// `
//     }
//     else if (dataSend.language === 'en') {
//         result = `
//         <h3>Dear ${dataSend.patientName}!</h3>
//         <p>You received this email because you made an online medical appointment on: <a target="_blank " href="http://localhost:3000/">Bookingcare.vn</a></p>
//         <p>Information about remedy examinations is attached bellow.</p>
//         <div>Sincerely thank.</div>
//         `
//     }
//     return result;
// }

// const sendAttachment = async (dataSend) => {
//     //create reusable transporter object using the default SMTP transport
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // Use `true` for port 465, `false` for all other ports
//         auth: {
//             user: process.env.EMAIL_APP,
//             pass: process.env.EMAIL_APP_PASSWORD,
//         },
//     });
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//         from: '"Hoàng Hải Vũ 👻" <hairyan789@gmail.com>', // sender address
//         to: dataSend.email, // list of receivers
//         subject: (dataSend.language === 'vi') ? "Kết quả khám bệnh - BookingCare" : 'Notice of examination results - BookingCare', // Subject line
//         html: getBodyHTMLEmailRemedy(dataSend), // html body
//         attachments: [
//             {
//                 filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
//                 content: dataSend.imgBase64.split("base64,")[1],
//                 encoding: 'base64'
//             }
//         ]
//     });
// }

module.exports = { sendSimpleEmail }