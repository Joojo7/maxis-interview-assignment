const { OfferModel } = require("../models/offers");
const RedisClient = require("../helpers/RedisClient");

class Offers {
  static async get(query) {
    const offers = await OfferModel.get(query);

    return offers;
  }

  static async generateOffersForUser(query) {
    if (!Object.keys(query).length) throw "no query feilds";
    let cacheKey = "";
    for (const key in query) {
      cacheKey = cacheKey + `${query[key]}-`;
    }

    await RedisClient.del(cacheKey);
    return OfferModel.generateOffersForUser(query);
  }

  static async create(feilds) {
    const createdFeilds = await OfferModel.create(feilds);
    return createdFeilds;
  }
}

module.exports = Offers;
