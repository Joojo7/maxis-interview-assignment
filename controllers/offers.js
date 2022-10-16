const offersHelper = require("../helpers/offers");

class Offers {
  static async get(req, res) {
    try {
      const offers = await offersHelper.get(req.query);
      res.status(200).send(offers);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  static async generateOffersForUser(req, res) {
    try {
      const offers = await offersHelper.generateOffersForUser(req.query);
      res.status(200).send(offers);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }

  static async create(req, res) {
    try {
      const offers = await offersHelper.create(req.body);

      res.status(200).send(offers);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }
}

module.exports = Offers;
