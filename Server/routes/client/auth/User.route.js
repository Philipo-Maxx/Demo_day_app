import { Router } from "express";
import {
  loginUser,
  createUser,
  logOutUser,
  verifyOTP,
  authMiddleware,
} from "../../../controllers/client/auth/User.controllers.js";

const authRouter = Router();

authRouter.post("/create-user", createUser);
authRouter.post("/login-user", loginUser);
authRouter.post("/logout-user", logOutUser);
authRouter.post("/verify-user", verifyOTP);
authRouter.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

export { authRouter };
