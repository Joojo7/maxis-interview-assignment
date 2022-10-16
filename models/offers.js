const db = require("../databases/database.config");
const { Op, DataTypes } = require("sequelize");
const { TransactionsModel, Transactions } = require("./transactions");

const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  offerName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  elgibileFor: {
    type: DataTypes.ENUM("users", "staff", "all"),
    allowNull: false,
  },
};

const Offer = db.define("Offer", schema, {
  db,
  modelName: "offers",
  underscored: true,
});

(async () => {
  await db.sync({ alter: true });
})();

class OfferModel {
  static async create(fields = {}) {
    try {
      if (!Object.keys(fields).length) {
        throw { name: "no creation feilds" };
      }
      const randomTag = Math.floor(Math.random() * 90000) + 10000;
      fields.id = randomTag;
      fields.offerName = `${fields.offerName}-${randomTag}`;

      return Offer.create(fields);
    } catch (error) {
      throw error;
    }
  }

  static async get(query) {
    try {
      return Offer.findAll(query);
    } catch (error) {
      throw error;
    }
  }

  static async generateOffersForUser(query) {
    try {
      const ids = [];
      const transactions = [];

      // Atomicity: Finding offers, creating transactions and deleting offers are all performed at once.
      // Consistency: The total number of offers and transactions stay the same after the user-offer request
      // Isolation: Finding offers, creating transactions and deleting offers are all invisible to each other
      const transactionResult = await db.transaction(async (t) => {
        const offers = await Offer.findAll(
          {
            limit: query.count,
            attributes: ["id", "offerName", "elgibileFor"],
            order: db.random(),
          },
          { transaction: t }
        );

        for (let i = 0; i < offers.length; i++) {
          ids.push(offers[i].id);
          transactions[i] = {
            id: Math.floor(Math.random() * 90000) + 10000,
            email: query.email,
            offerName: offers[i].offerName,
          };
        }

        await Transactions.bulkCreate(transactions, {
          validate: true,
        });

        await Offer.destroy({
          where: {
            id: {
              [Op.or]: ids,
            },
          },
        });

        return offers;
      });

      return transactionResult;
    } catch (error) {
      throw error;
    }
  }

  static async delete(query = []) {
    try {
      if (!query.length) throw "no query feilds";

      await Offer.destroy({
        where: {
          id: {
            [Op.or]: query,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { OfferModel, Offer };
