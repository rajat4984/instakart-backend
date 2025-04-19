import Product from "../models/Product.js";
import crypto from "crypto";
import Transaction from "../models/transaction.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// 📌 Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const { transactionType, page = 1, limit = 10 } = req.query;

    // Build the query object
    const query = { storeID: req.user._id };
    if (transactionType) {
      query.transactionType = transactionType;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const transactions = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await Product.countDocuments(query);

    res.status(200).json({
      data: transactions,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
      totalCount,
      statusCode: 200,
      message: "Transactions fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Create a new transaction

export const createPhonePePayment = async (req, res) => {
  const orderId = `ORDER-${Date.now()}`;
  const redirectUrl = "https://yourdomain.com/payment/callback";
  const { phonepeToken } = req;

  let data = JSON.stringify({
    merchantOrderId: orderId,
    amount: 1000,
    // expireAfter:,
    metaInfo: {
      udf1: "extra-info-1",
      udf2: "extra-info-2",
      udf3: "extra-info-3",
      udf4: "extra-info-4",
      udf5: "extra-info-5",
    },
    paymentFlow: {
      type: "PG_CHECKOUT",
      message: "Please proceed to pay",
      merchantUrls: {
        redirectUrl,
      },
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${phonepeToken}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      return res.status(500).json({
        error: "Failed to initiate payment",
        details: error?.response?.data || error.message,
      });
    });
};

export const createTransaction = async (req, res) => {
  const merchantId = "TEST-M22SNF0PTNPQ0_25041"; //clientID
  const saltKey = "MWNiZGRkYjctNjUzZC00YTVlLTg5M2YtOWQ5YWE5NDcwMTI3"; // client secret
  const saltIndex = "1"; // client version
  const callbackUrl = "https://yourdomain.com/payment/callback";
  const uniqueID = `TXN-${Date.now()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  const payload = {
    merchantId,
    merchantTransactionId: uniqueID,
    merchantUserId: "9958109872",
    amount: 10000, // in paise (₹100 = 10000)
    redirectUrl: callbackUrl,
    redirectMode: "POST",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
  const stringToSign = base64Payload + "/pg/v1/pay" + saltKey;
  const xVerify =
    crypto.createHash("sha256").update(stringToSign).digest("hex") +
    "###" +
    saltIndex;

  try {
    const response = await axios.post(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      { request: base64Payload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
          "X-MERCHANT-ID": merchantId,
        },
      }
    );
    console.log(data);
    res.json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Payment init failed", details: err.message });
  }

  //     const transaction = new Transaction({
  //       ...req.body,
  //       transactionID: uniqueID,
  //     });
  //     await transaction.save();
  //     res
  //       .status(201)
  //       .json({ statusCode: 201, message: "Product Created Successfully." });
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
};

// 📌 Edit a product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📌 Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get a single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("variants"); // Populate the variants field
    if (!product) return res.status(404).json({ message: "Product not found" });
    res
      .status(200)
      .json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    console.log("Searchproductq");
    console.log(query, "query");
    const products = await Product.find({
      userId: req.user.id, // Filter by userId
      title: { $regex: query, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
