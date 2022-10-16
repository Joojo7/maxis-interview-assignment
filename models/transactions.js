const db = require("../databases/database.config");
const { DataTypes } = require("sequelize");

const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  offerName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
};

const Transactions = db.define("Transactions", schema, {
  db,
  modelName: "transactions",
  underscored: true,
});

(async () => {
  await db.sync({ alter: true });
})();

class TransactionsModel {
  static async create(transactions = []) {
    try {
      if (!transactions.length) {
        throw { name: "no transactions" };
      }

      for (let i = 0; i < transactions.length; i++) {
        transactions[i].id = Math.floor(Math.random() * 90000) + 10000;
      }

      return Transactions.bulkCreate(transactions, { validate: true });
    } catch (error) {
      throw error;
    }
  }

  static async get(query) {
    const reformedQuery = { ...query };
    delete reformedQuery.count;
    try {
      return Transactions.findAll({
        limit: query.count,
        attributes: ["id", "offerName", "email"],
        where: reformedQuery,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { TransactionsModel, Transactions };
