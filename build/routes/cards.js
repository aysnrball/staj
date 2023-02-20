"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiError = _interopRequireDefault(require("../error/ApiError"));
var Cards = _interopRequireWildcard(require("../services/iyzico/methods/cards"));
var _users = _interopRequireDefault(require("../db/users"));
var _nanoid = _interopRequireDefault(require("../utils/nanoid"));
var _Session = _interopRequireDefault(require("../middlewares/Session"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = router => {
  //KART EKLEME
  router.post("/cards", _Session.default, async (req, res) => {
    const {
      card
    } = req.body;
    let result = await Cards.createUserCard({
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      email: req.user.email,
      externalId: (0, _nanoid.default)(),
      ...(req.user?.cardUserKey && {
        cardUserKey: req.user.cardUserKey
      }),
      card: card
    });
    if (!req.user.cardUserKey) {
      if (result?.status === "success" && result?.cardUserKey) {
        const user = await _users.default.findOne({
          _id: req.user?._id
        });
        user.cardUserKey = result?.cardUserKey;
        await user.save();
      }
    }
    res.json(result);
  });
  // KART OKUMA 
  router.get("/cards", _Session.default, async (req, res) => {
    if (!req.user?.cardUserKey) {
      throw new _ApiError.default("User has no credit card", 403, "userHasNoCard");
    }
    let cards = await Cards.getUserCards({
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      cardUserKey: req.user?.cardUserKey
    });
    res.status(200).json(cards);
  });

  //KART SİLME-TOKEN
  router.delete("/cards/delete-by-token", _Session.default, async (req, res) => {
    const {
      cardToken
    } = req.body;
    if (!cardToken) {
      throw new _ApiError.default("Card token is required", 400, "cardTokenRequired");
    }
    let deleteResult = await Cards.deleteUserCard({
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      cardUserKey: req.user?.cardUserKey,
      cardToken: cardToken
    });
    res.status(200).json(deleteResult);
  });
  //KART SİLME-INDEX
  router.delete("/cards/:cardIndex/delete-by-index", _Session.default, async (req, res) => {
    if (!req.params?.cardIndex) {
      throw new _ApiError.default("Card index is required", 400, "cardIndexRequired");
    }
    let cards = await Cards.getUserCards({
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      cardUserKey: req.user?.cardUserKey
    });
    const index = parseInt(req.params?.cardIndex);
    if (index >= cards?.cardDetails.length) {
      throw new _ApiError.default("Card doesnt exists, check index number", 400, "cardIndexInvalid");
    }
    const {
      cardToken
    } = cards?.cardDetails[index];
    let deleteResult = await Cards.deleteUserCard({
      locale: req.user.locale,
      conversationId: (0, _nanoid.default)(),
      cardUserKey: req.user?.cardUserKey,
      cardToken: cardToken
    });
    res.json(deleteResult);
  });
};
exports.default = _default;