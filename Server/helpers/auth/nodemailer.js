import { genOTP } from "./otpgen.js";
import nodemailer from "nodemailer";

const sendMail = async (user) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS,
      },
    });

    const otp = await genOTP("verify-email", user._id);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Welcome to MarktPlatz, We are pleased you are opening an account with us, cheers!!!`,
      text: `This is your OTP, ${otp} , use it to verify your account`,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error Sending Generated Email");
  }
};

export { sendMail };
