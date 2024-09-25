"use strict";

const signSystem = "xxxx-yyyy-zzzzz";
const ipBlacklist = ["100.001.102.103", "100.001.102.105"];

class ApiController {
  // Utils
  decodingData = (encString) => {
    let buff = new Buffer(encString, "base64");
    return buff.toString("ascii");
  };

  checkAPI = (req, res, next) => {
    try {
      const { sign, ip, numCard, userId } =
        req.method === "POST" ? req.body : req.query;

      // ## 1 - Sign (Chữ ký)
      if (sign !== signSystem) {
        return res.status(401).json({
          code: 10041,
          message: "Invalid Sign!!",
        });
      }

      // ## 2 - IP White List (Danh sách trắng các địa chỉ IP)
      if (ipBlacklist.includes(ip)) {
        return res.status(403).json({
          code: 10043,
          message: "Forbidden!!",
        });
      }

      // ## 3 - Encrypt (Mã hóa dữ liệu cần thiết)
      const deNumCard = this.decodingData(numCard);

      // ## 4 - Validate REST request (Xác minh tham số đầu vào)
      if (userId !== "") {
        return res.json.status(400).json({
          code: 10040,
          message: "BadRequest !!",
        });
      }

      // ## 5 - Rate Limits Rest API

      res.status(200).json({
        code: 100200,
        elements: {
          name: "anonystick",
          blog: "https://anonystick.com",
        },
        message: "ok",
      });

      // ## 6 - Return responses JSON

      res.status(400).json({
        code: 10040,
        message: "BadRequest !!",
        elements: null,
        status: "Error",
        expose: {},
      });

      res.status(200).json({
        code: 10020,
        message: null,
        elements: { name: 1, age: 2 },
        status: "Success",
        expose: {},
      });

      // ## 7 - Return errors
      res.status(403).json({
        code: 10043,
        message: "BadRequest!! or status must be an Array []",
        elements: null,
        status: "Error",
        expose: {},
      });

      // Should not return client.
      res.status(500).json({
        code: 10050,
        message: "Error code and number lines 198 mySQL",
        elements: null,
        status: "error",
        expose: {},
      });
      //Should return
      res.status(500).json({
        code: 10050,
        message: "Error .....",
        elements: null,
        status: "error",
        expose: {},
      });

      // ## 8 - Logs requests
      const traceId = "00001";
      logger.info(traceId, "Hello Word");
      logger.error(traceId, "File not found");

      // ## 9 - Limited records
      const limit = limit > 500 ? 500 : limit;

      // ## 10 - Check QPS tính server chịu được bao nhiêu request trong 1 second or giờ cao điểm

      // ## 11 - Sensitivity data (Data nhạy cảm)
      /*
        Đôi khi, khi nền tảng của bên thứ 3 gọi giao diện APi của chúng tôi, một số dữ liệu 
        thu được là dữ liệu nhạy cảm, chẳng hạn như số điện thoại của người dùng
        số thẻ ngân hàng
      */

      // Lấy số điện thoại di động của ngườ dùng vd: 098*****011
      let numPhone = "0988990011"; // Define the phone number as a string

      // Function to anonymize the phone number for sensitive data
      function sensivityData(phone) {
        return phone.slice(0, 3) + "****" + phone.slice(7); // Replace middle digits with asterisks
      }

      numPhone = sensivityData(numPhone);

      console.log(numPhone); // Output: "098****011"
      // let numPhone = 0988990011;
      // numPhone = sensivityData(0988990011);

      // ## 12 - async request
      utils.sendMQ(sendNotify);
    } catch (error) {}
  };
}
