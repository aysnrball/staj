import iyzipay from "../connection/iyzipay";

export const initialize = (data) => {
    return new Promise((resolve, reject) => {
        iyzipay.checkoutFormInitialize.create(data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

export const getFormPayment = (data) => {
    return new Promise((resolve, reject) => {
        iyzipay.checkoutForm.retrieve(data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}