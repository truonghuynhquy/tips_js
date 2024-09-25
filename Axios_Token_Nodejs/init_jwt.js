import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signAccessToken = async () => {
  const payload = {
    userId: 1,
    name: "Tips JavaScript",
  };

  const token = JWT.sign(payload, process.env.KEY_ACCESSTOKEN, {
    expiresIn: "1m",
  });
  return token;
};

export const signRefreshToken = async () => {
  const payload = {
    userId: 1,
    name: "Tips JavaScript",
  };

  const token = JWT.sign(payload, process.env.KEY_REFRESHTOKEN, {
    expiresIn: "10m",
  });
  return token;
};

export const verifyToken = async (req, res, next) => {
  try {
    if (req.headers["x-token"]) {
      const token = req.headers["x-token"];
      console.log(`Token: ${token}`);
      const payload = await JWT.verify(token, process.env.KEY_ACCESSTOKEN);
      req.user = payload;
      return next();
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(200).json({
        code: 401,
        msg: error.message,
      });
    }
    return res.status(200).json({
      code: 500,
      msg: error,
    });
  }
};
