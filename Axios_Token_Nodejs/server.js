import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken, signAccessToken, signRefreshToken } from "./init_jwt.js";

// Cấu hình __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

// Route root trả về file HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API login
app.get("/api/refreshToken", async (req, res) => {
  return res.status(200).json({
    status: "success",
    elements: {
      accessToken: await signAccessToken(),
    },
  });
});

app.get("/api/user", verifyToken, (req, res) => {
  return res.status(200).json({
    status: "success",
    elements: [
      {
        name: "anonystick",
      },
      {
        name: "tips javascript",
      },
    ],
  });
});

app.get("/api/login", async (req, res) => {
  return res.status(200).json({
    status: "success",
    elements: {
      accessToken: await signAccessToken(),
      // refreshToken: await signRefreshToken(),
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// }); Danh cho type: commonJS
