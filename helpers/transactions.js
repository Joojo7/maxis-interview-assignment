const { TransactionsModel } = require("../models/transactions");
const RedisClient = require("./RedisClient");

class Transactions {
  static async get(query) {
    try {
      if (!Object.keys(query).length) throw "no query feilds";
      let transactions = [];
      let cacheKey = "";
      for (const key in query) {
        cacheKey = cacheKey + `${query[key]}-`;
      }
      const cachedTransactions = await RedisClient.get(cacheKey);
      transactions = JSON.parse(cachedTransactions);

      if (transactions && transactions.length) {
        return transactions;
      }
      transactions = await TransactionsModel.get(query);
      await RedisClient.set(cacheKey, JSON.stringify(transactions), {
        NX: false,
      });
      if (!transactions.length) return [];
      return transactions;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Transactions;
