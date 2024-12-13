import jwt from "jsonwebtoken";

const generateVerifyToken = (userId) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.VERIFICATION_PASS, {
    expiresIn: "5m",
  });

  return token;
};

export { generateVerifyToken };
