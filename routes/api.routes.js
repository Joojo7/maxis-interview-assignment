// Packages
const express = require("express");

const router = express.Router();

const offers = require("../controllers/offers");
const transactions = require("../controllers/transactions");

router.get("/user-offers", offers.generateOffersForUser);
router.get("/offers", offers.get);
router.get("/transactions", transactions.get);
router.post("/offers", offers.create);

module.exports = router;
