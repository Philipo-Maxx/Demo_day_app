import { OTP } from "../../models/user/auth/Otp.model.js";

const genOTP = async (otpType, userId) => {
  try {
    await OTP.deleteMany({ otpType, user: userId });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({
      user: userId,
      otp: otp,
      otpType: otpType,
      expireAt: new Date(Date.now() + 300 * 1000),
    });

    return otp;
  } catch (error) {
    throw new Error("Error generating and saving OTP");
  }
};

export { genOTP };
