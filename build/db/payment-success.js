"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _nanoid = _interopRequireDefault(require("../utils/nanoid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Schema
} = _mongoose.default;
const {
  ObjectId
} = Schema.Types;
const ItemTransactionSchema = new Schema({
  uid: {
    type: String,
    default: (0, _nanoid.default)()
  },
  ItemId: {
    type: ObjectId,
    ref: "Products"
  },
  paymentTransactionId: {
    type: String
  },
  price: {
    type: Number
  },
  paidPrice: {
    type: Number
  }
});
const PaymentsSuccessSchema = new Schema({
  uid: {
    type: String,
    default: (0, _nanoid.default)()
  },
  status: {
    type: String,
    enum: ["success"]
  },
  cartId: {
    type: ObjectId,
    ref: "Carts"
  },
  conversationId: {
    type: String
  },
  currency: {
    type: String,
    enum: ["TRY", "USD", "EUR"]
  },
  paymentId: {
    type: String
  },
  price: {
    type: Number
  },
  paidPrice: {
    type: Number
  },
  itemTransactions: {
    type: [ItemTransactionSchema]
  },
  log: {
    type: Schema.Types.Mixed
  }
}, {
  _id: true,
  collection: "payments-success",
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      return {
        ...ret
      };
    }
  }
});
const PaymentsSuccess = _mongoose.default.model("PaymentsSuccess", PaymentsSuccessSchema);
var _default = PaymentsSuccess;
exports.default = _default;