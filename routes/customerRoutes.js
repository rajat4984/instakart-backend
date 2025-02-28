const express = require("express");

const {
  deleteCustomer,
  getSingleCustomer,
  getAllCustomer,
  createCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.post("/", createCustomer);
router.get("/", getAllCustomer);
router.get("/search", getSingleCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
