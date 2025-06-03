const paypalClient = require("../config/paypal");
const configVNPay = require("../config/vnpay");
const paypal = require("@paypal/checkout-server-sdk");
const crypto = require("crypto");
const moment = require("moment");

exports.createPayment = async (req, res) => {
  const { totalAmount, currency, returnUrl, cancelUrl } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: currency || "USD",
          value: totalAmount,
        },
      },
    ],
    application_context: {
      return_url: returnUrl,
      cancel_url: cancelUrl,
    },
  });

  try {
    const order = await paypalClient.execute(request);
    res.status(200).json({ id: order.result.id });
  } catch (error) {
    console.error("Error creating PayPal payment", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.capturePayment = async (req, res) => {
  const { orderId } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);
    res.status(200).json({ status: "success", data: capture.result });
  } catch (error) {
    console.error("Error capturing PayPal payment", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

exports.createPaymentUrl = (req, res, next) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = configVNPay.vnp_TmnCode;
  let secretKey = configVNPay.vnp_HashSecret;
  let vnpUrl = configVNPay.vnp_Url;
  let returnUrl = configVNPay.vnp_ReturnUrl;
  let orderId = moment(date).format("DDHHmmss");
  let amount = req.body.amount;
  let bankCode = req.body.bankCode;
  const orderInfo = req.body.orderInfo;

  let locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  res.json({
    code: "00",
    data: vnpUrl,
    orderId: orderId,
    amount: amount * 100,
  });
};

exports.vnpayReturn = (req, res) => {
  try {
    let vnp_Params = req.query;
    let secureHash = vnp_Params["vnp_SecureHash"];

    // Xóa hash và signature khỏi params để tạo lại chữ ký
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    // Sắp xếp params
    vnp_Params = sortObject(vnp_Params);

    const secretKey = configVNPay.vnp_HashSecret;

    // Tạo lại chữ ký để verify
    let signData = Object.keys(vnp_Params)
      .map((key) => {
        let value = vnp_Params[key].toString();
        value = value.replace(/ /g, "+");
        return `${key}=${value}`;
      })
      .join("&");

    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      // Xử lý kết quả thanh toán
      const responseCode = vnp_Params["vnp_ResponseCode"];

      if (responseCode === "00") {
        // Thanh toán thành công
        res.json({
          code: "00",
          message: "Thanh toán thành công",
          data: vnp_Params,
        });
      } else {
        // Thanh toán thất bại
        res.json({
          code: responseCode,
          message: "Thanh toán thất bại",
          data: vnp_Params,
        });
      }
    } else {
      res.status(400).json({
        code: "97",
        message: "Chữ ký không hợp lệ",
      });
    }
  } catch (error) {
    console.error("Error processing VNPay return:", error);
    res.status(500).json({
      code: "99",
      message: "Lỗi xử lý kết quả thanh toán",
    });
  }
};
