import { User } from "../../../models/user/auth/User.model.js";
import { OTP } from "../../../models/user/auth/Otp.model.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../../../helpers/auth/nodemailer.js";
import { generateVerifyToken } from "../../../helpers/auth/gentoken.js";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword, role } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.json({
        success: false,
        message: "User with Email already exists",
      });
    }

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and confirmPassword does not match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const saveUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    if (saveUser) {
      //generate OTP & send OTP to user email
      await sendMail(saveUser);
      console.log("Email sent to User");
      const token = generateVerifyToken(saveUser._id);
      console.log(token);
      return res.status(200).json({
        success: true,
        message: `${token}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured Saving User Credentials",
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    let token = null;
    const authHeaders = req.headers["authorization"];
    if (authHeaders && authHeaders.startsWith("Bearer ")) {
      token = authHeaders.split(" ")[1];
    }
    console.log("token", token);
    if (!token) {
      return res.json({
        success: false,
        message: "Error in Validation, Return to Register page",
      });
    }

    const payload = jwt.verify(token, process.env.VERIFICATION_PASS);

    const saveUserOTP = await OTP.findOne({
      user: payload.id,
      otpType: "verify-email",
    });

    console.log("saveUserOTP", saveUserOTP);
    if (!saveUserOTP) {
      return res.json({
        success: false,
        message: `OTP expired, Return to Register page`,
      });
    }

    if (saveUserOTP.otp === otp) {
      //Update Email, Generate Access Token , and delete OTP entry in db
      const user = await User.findByIdAndUpdate(saveUserOTP.user, {
        isEmailVerified: true,
      });
      await OTP.findByIdAndDelete(saveUserOTP._id);
      console.log("User OTP deleted, successfully");

      const savedPayload = {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      };

      const accessToken = jwt.sign(savedPayload, process.env.ACCESS_PASS, {
        expiresIn: "60m",
      });

      console.log("accessToken derived, from OTP", accessToken);
      return res
        .cookie("token", accessToken, { httpOnly: true, secure: false })
        .status(200)
        .json({
          success: true,
          message: `Logged In Successfully`,
          user: {
            email: user.email,
            role: user.role,
            id: user._id,
            fullName: user.userName,
          },
        });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: `User does not exists`,
      });
    }

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      return res.json({
        success: false,
        message: `Incorrect Password`,
      });
    }

    if (!user.isEmailVerified) {
      await sendMail(user);
      console.log("Email resent to User");
      const token = generateVerifyToken(user._id);
      console.log(token);
      return res.json({
        success: false,
        message: `Email not verified, OTP resent`,
        token: `${token}`,
      });
    }

    const payload = {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_PASS, {
      expiresIn: "60m",
    });
    console.log("accessToken derived, From Login", accessToken);
    res
      .cookie("token", accessToken, { httpOnly: true, secure: false })
      .status(200)
      .json({
        success: true,
        message: `Logged In Successfully`,
        user: {
          email: user.email,
          role: user.role,
          id: user._id,
          fullName: user.userName,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured Saving User Credentials",
    });
  }
};

const logOutUser = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully" });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_PASS);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

export { loginUser, logOutUser, createUser, verifyOTP, authMiddleware };
