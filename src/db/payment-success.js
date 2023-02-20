import mongoose from "mongoose";
import nanoid from "../utils/nanoid";


const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ItemTransactionSchema = new Schema({
    uid: {
        type: String,
        default: nanoid(),

    },
    ItemId: {
        type: ObjectId,
        ref: "Products",

    },
    paymentTransactionId: {
        type: String,
    },
    price: {
        type: Number,
    },
    paidPrice: {
        type: Number,
    }
})
const PaymentsSuccessSchema = new Schema({
    uid: {
        type: String,
        default: nanoid(),

    },
    status: {
        type: String,
        enum: ["success"]
    },
    cartId: {
        type: ObjectId,
        ref: "Carts",
    },
    conversationId: {
        type: String,
    },
    currency: {
        type: String,
        enum: [
            "TRY",
            "USD",
            "EUR"
        ]
    },
    paymentId: {
        type: String,

    },
    price: {
        type: Number,
    },
    paidPrice: {
        type: Number,
    },
    itemTransactions: {
        type: [ItemTransactionSchema]
    },
    log: {
        type: Schema.Types.Mixed,
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
            }

        }
    }
})
const PaymentsSuccess = mongoose.model("PaymentsSuccess", PaymentsSuccessSchema);
export default PaymentsSuccess;
