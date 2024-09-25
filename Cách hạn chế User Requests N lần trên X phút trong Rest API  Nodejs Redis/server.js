const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { incr, expire, ttl } = require("./models/limiter");

app.get("/api", async (req, res, next) => {
  try {
    // Get IP
    const getIpUser = "128.0.0.1";
    // NOTE:
    //req.headers['x-forwarded-for'] || res.connection.remoteAddress; get IP
    // element đầu tiên thì lấy trực tiếp, còn element 2 thì qua proxy.
    // Nếu chạy trên localhost thì 2 cái là undefine. còn chạy trên web thì không sao
    console.log(req.headers["x-forwarded-for"] || res.connection.remoteAddress);

    const numRequest = await incr(getIpUser);
    let _ttl;
    if (numRequest === 1) {
      await expire(getIpUser, 60); // 60 second
      _ttl = 60;
    } else {
      _ttl = await ttl(getIpUser);
    }

    if (numRequest > 20) {
      return res.status(503).json({
        status: "error",
        message: "Server is busy",
        numRequest,
        _ttl,
      });
    }

    res.json({
      status: "success",
      numRequest,
      _ttl,
      elements: [
        { id: 1, name: "Java" },
        { id: 2, name: "Nodejs" },
      ],
    });
  } catch (error) {
    throw new Error(error);
  }

  app.listen(PORT, () => {
    console.log(`The server running at ${PORT}`);
  });
});
