import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure:false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

export const verifyemail = async (email, token) => {
    try {
        const emailconfiger = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Email Verification",
            html: `<a href="https://sports-system.vercel.app/verifyemail/${token}">Verify Email</a>`
        };

        const res = await transport.sendMail(emailconfiger);
        console.log("Email sent:", res);
    } catch (error) {
        console.log("Mail failed:", error.message);
    }
};