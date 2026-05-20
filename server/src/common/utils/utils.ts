import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import crypto from "crypto";

const generatePassword = () => {
    return crypto.randomBytes(16).toString("hex");
};

const emailCreds = async (
    data: { email: string; password: string },
): Promise<any> => {
    const TOKEN = process.env.API_TOKEN;

    const transport = Nodemailer.createTransport(
        MailtrapTransport({
            token: TOKEN!,
        })
    );

    const sender = {
        address: "hello@demomailtrap.co",
        name: "Mailtrap Test",
    };

    const info = await transport.sendMail({
        from: sender,
        to: data.email,
        subject: "Login OTP",
        text: `Creds for login:
${data.email}
${data.password}
    `,
    });

    console.log(info);

    return info;
};

const emailOtp = async (
    data: { email: string; otp: string },
): Promise<any> => {
    const TOKEN = process.env.API_TOKEN;

    const transport = Nodemailer.createTransport(
        MailtrapTransport({
            token: TOKEN!,
        })
    );

    const sender = {
        address: "hello@demomailtrap.co",
        name: "Mailtrap Test",
    };

    const info = await transport.sendMail({
        from: sender,
        to: data.email,
        subject: "Login OTP",
        text: `otp:
${data.otp}
    `,
    });

    console.log(info);

    return info;
};

export {
    generatePassword,
    emailCreds,
    emailOtp,
};