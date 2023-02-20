import mongoose from "mongoose";
import nanoid from "../utils/nanoid";


const { Schema } = mongoose;


const PaymentsFailedSchema = new Schema({
    uid: {
        type: String,
        default: nanoid(),

    },
    status: {
        type: String,
        required: true,
        enum: ["failure"]
    },
    conversationId: {
        type: String,
    },
    errorCode: {
        type: String,
    },
    errorMessage: {
        type: String,
    },
    log: {
        type: Schema.Types.Mixed,

    }
}, {
    _id: true,
    collection: "payments-failed",
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
const PaymentsFailed = mongoose.model("PaymentsFailed", PaymentsFailedSchema);
export default PaymentsFailed;