const transactionsHelper = require("../helpers/transactions");
class Transactions {
  static async get(req, res) {
    try {
      const transactions = await transactionsHelper.get(req.query);
      res.status(200).send(transactions);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }
}

module.exports = Transactions;
