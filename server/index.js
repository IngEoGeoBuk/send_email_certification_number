const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

require("dotenv").config();

"use strict";

// async..await is not allowed in global scope, must use a wrapper
app.post('/send', (req, res) => {

    const email = req.body.email;
    const value = req.body.value;

    async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Naver',
        host: "smtp.naver.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: `${process.env.USER_EMAIL}`, // generated ethereal user
        pass: `${process.env.USER_PW}`, // generated ethereal password
        },
    });
    
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Nodemailer contact" <you3667@naver.com>', // sender address
        to: `${email}`, // list of receivers
        subject: '회원가입 인증 번호입니다.', // Subject line
        text: "회원가입 인증번호를 입력해주세요", // plain text body
        html: `인증번호는 ${value} 입니다.`, // html body
    });
    
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);
})


const port = 3001;
app.listen(port, () => {
 console.log(`Server is running on port: ${port}`);
});
