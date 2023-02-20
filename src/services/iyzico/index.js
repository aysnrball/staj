import Iyzipay from "iyzipay";
import * as Cards from "./methods/cards";
import * as Installments from "./methods/installments";
import * as Payments from "./methods/payments";
import * as PaymentsThreeDS from "./methods/threeds-payments";
import * as Checkouts from "./methods/checkouts";
import * as CancelPayments from "./methods/cancel-payments";
import * as RefundPayments from "./methods/refund-payments";
import nanoid from "../../utils/nanoid";
import * as Logs from "../../utils/logs";


/*-------------------------------------------*/
/* a)Cards */
/*-------------------------------------------*/

//Bir kullanıcı ve kart oluştur
const createUserAndCards = () => {
    Cards.createUserCard({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        email: "email@email.com",
        externalId: nanoid(),
        card: {
            cardAlias: "Kredi Kartım",
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030"

        }

    }).then((result) => {
        console.log(result)
        Logs.logFile("1-cards-kullanıcı-ve-kart-oluştur", result)
    }).catch((err) => {
        console.log(err);
        Logs.logFile("1-cards-kullanıcı-ve-kart-oluştur-hata", err)

    })

}
//createUserAndCards();
//bir kullanıcıya ait yeni bir kart ekle
const createACardForAUser = () => {
    Cards.createUserCard({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        email: "email@email.com",
        externalId: nanoid(),
        cardUserKey: "JrWNyYCmi/UFXdaXwJHrjqt/pok=",
        card: {
            cardAlias: "Kredi Kartım",
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030"

        }

    }).then((result) => {
        console.log(result)
        Logs.logFile("2-cards-bir-kullanıya-kart-ekle", result)
    }).catch((err) => {
        console.log(err);
        Logs.logFile("2-cards-bir-kullanıcıya-kart-ekle-hata", err)

    })
}
//createACardForAUser()

//Bir kullanıcının kartlarını oku
const readCardsOfAUser = () => {
    Cards.getUserCards({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        cardUserKey: "JrWNyYCmi/UFXdaXwJHrjqt/pok=",

    }).then((result) => {
        console.log(result)
        Logs.logFile("3-cards-bir-kullanicinin-kartlarini-oku", result)
    }).catch((err) => {
        console.log(err);
        Logs.logFile("3-cards-bir-kullanicinin-kartlarini-oku-hata", err)

    })

}
//readCardsOfAUser()

//Bir kullanıcıya ait kartı silme

const deleteCardOfAUser = () => {
    Cards.deleteUserCard({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        cardUserKey: "JrWNyYCmi/UFXdaXwJHrjqt/pok=",
        cardToken: "75HAPAT36paU8srw4G24Q3jSUB8=",

    }).then((result) => {
        console.log(result)
        Logs.logFile("4-cards-bir-kullanicinin-kartini-sil", result)
    }).catch((err) => {
        console.log(err);
        Logs.logFile("4-cards-bir-kullanicinin-kartini-sil-hata", err)

    })

}
//deleteCardOfAUser()



/*-------------------------------------------*/
/* b)Installments */
/*-------------------------------------------*/


//Bir kart ve ücretle ilgili gerçekleşebilecek tasitlerin kontrolü

const checkInstallments = () => {
    return Installments.checkInstallment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        binNumber: "55287900",
        price: "1000"

    }).then((result) => {
        console.log(result)
        Logs.logFile("5-installments-bir-kart-ve-ucret-taksit-kontrolu", result)
    }).catch((err) => {
        console.log(err);
        Logs.logFile("5-installments-bir-kart-ve-ucret-taksit-kontrolu-hata", err)

    })
}
//checkInstallments()



/*-------------------------------------------*/
/* c)Normal Payments */
/*-------------------------------------------*/

//Kayıtlı olmayan kartla ödeme yap ve kartı kaydetme

const createPayment = () => {
    return Payments.createPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",
        paidPrice: "300",
        currency: Iyzipay.CURRENCY.TRY,
        installment: "1",
        basketId: "B67DJL",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard: {
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030",
            cvc: '123',
            registerCard: '0'

        },
        buyer: {
            id: "SDFJKG",
            name: "John",
            surname: "Doe",
            gsmNumber: "+905350000000",
            email: "email@email.com",
            identityNumber: "743008664791",
            lastLoginDate: "2020-10-05 12:43:35",
            registrationDate: "2020-10-04 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        billingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        basketItems: [
            {
                id: "BT101",
                name: "Samsung S20",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 90
            },
            {
                id: "BT102",
                name: "Iphone 12",
                category1: "Telefonlar",
                category2: "İOS Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 150
            },
            {
                id: "BT103",
                name: "Samsung S10",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 60
            }

        ]

    }).then((result) => {
        console.log(result)
        Logs.logFile("6-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydetme", result)
    }).catch((err) => {
        console.log(err);
        Logs.logFile("6-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydetme-hata", err)

    })
}
//createPayment();

//Kayıtlı olmayan bir kartla ödeme yap ve kartı kaydet

const createPaymentAndSaveCard = () => {
    return Payments.createPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",
        paidPrice: "300",
        currency: Iyzipay.CURRENCY.TRY,
        installment: "1",
        basketId: "B67DJL",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard: {
            cardUserKey: "JrWNyYCmi/UFXdaXwJHrjqt/pok=",
            cardAlias: "Kredi Kartım Ödemeden Sonra",
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030",
            cvc: '123',
            registerCard: '1'

        },
        buyer: {
            id: "SDFJKG",
            name: "John",
            surname: "Doe",
            gsmNumber: "+905350000000",
            email: "email@email.com",
            identityNumber: "743008664791",
            lastLoginDate: "2020-10-05 12:43:35",
            registrationDate: "2020-10-04 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        billingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        basketItems: [
            {
                id: "BT101",
                name: "Samsung S20",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 90
            },
            {
                id: "BT102",
                name: "Iphone 12",
                category1: "Telefonlar",
                category2: "İOS Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 150
            },
            {
                id: "BT103",
                name: "Samsung S10",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 60
            }

        ]


    }).then((result) => {
        console.log(result)
        Logs.logFile("7-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydet", result)
    }).catch((err) => {
        console.log(err);
        Logs.logFile("7-payments-yeni-bir-kartla-odeme-al-ve-kartı-kaydet-hata", err)

    })
}
//createPaymentAndSaveCard()
//readCardsOfAUser()

//Kayıtlı bir kart ile ödeme yap
const createPaymentWithSavedCard = () => {
    return Payments.createPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",
        paidPrice: "300",
        currency: Iyzipay.CURRENCY.TRY,
        installment: "1",
        basketId: "B67DJL",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard: {
            cardUserKey: "JrWNyYCmi/UFXdaXwJHrjqt/pok=",
            cardToken: "1TIzt59ItXpGeYzKwkFYr28giJc="

        },
        buyer: {
            id: "SDFJKG",
            name: "John",
            surname: "Doe",
            gsmNumber: "+905350000000",
            email: "email@email.com",
            identityNumber: "743008664791",
            lastLoginDate: "2020-10-05 12:43:35",
            registrationDate: "2020-10-04 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        billingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        basketItems: [
            {
                id: "BT101",
                name: "Samsung S20",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 90
            },
            {
                id: "BT102",
                name: "Iphone 12",
                category1: "Telefonlar",
                category2: "İOS Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 150
            },
            {
                id: "BT103",
                name: "Samsung S10",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 60
            }

        ]


    }).then((result) => {
        console.log(result)
        Logs.logFile("8-payments-kayıtlı-bir-kartla-odeme-al", result)
    }).catch((err) => {
        console.log(err);
        Logs.logFile("8-payments-kayıtlı-bir-kartla-odeme-al-hata", err)

    })
}
//createPaymentWithSavedCard()


/*-------------------------------------------*/
/* d) 3D Secure Payments */
/*-------------------------------------------*/

const initializeThreeDSPayments = () => {
    PaymentsThreeDS.initializePayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",
        paidPrice: "300",
        currency: Iyzipay.CURRENCY.TRY,
        installment: "1",
        basketId: "B67DJL",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: "https://localhost/api/payment/3ds/completee",
        paymentCard: {
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030",
            cvc: '123',
            registerCard: '0'

        },
        buyer: {
            id: "SDFJKG",
            name: "John",
            surname: "Doe",
            gsmNumber: "+905350000000",
            email: "email@email.com",
            identityNumber: "743008664791",
            lastLoginDate: "2020-10-05 12:43:35",
            registrationDate: "2020-10-04 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        billingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        basketItems: [
            {
                id: "BT101",
                name: "Samsung S20",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 90
            },
            {
                id: "BT102",
                name: "Iphone 12",
                category1: "Telefonlar",
                category2: "İOS Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 150
            },
            {
                id: "BT103",
                name: "Samsung S10",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 60
            }
        ]

    }).then((result) => {
        console.log(result)
        Logs.logFile("9-threeds-payments-yeni-bir-kartla-odeme-al", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("9-threeds-payments-yeni-bir-kartla-odeme-al-hata", err)

    })
}
//initializeThreeDSPayments();

//3DS ödemesini tamamla
const completeThreeDSPayment = () => {
    PaymentsThreeDS.completePayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        paymentId: "18887546",
        conversationData: "conversation data"
    }).then((result) => {
        console.log(result)
        Logs.logFile("10-threeds-payments-odeme-tamamla", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("10-threeds-payments-odeme-tamamla-hata", err)

    })
}
//completeThreeDSPayment()

// 3ds odemesini kayıtlı kartla gerçekleştir
const initializeThreeDSPaymentsWithRegisteredCard = () => {
    PaymentsThreeDS.initializePayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",
        paidPrice: "300",
        currency: Iyzipay.CURRENCY.TRY,
        installment: "1",
        basketId: "B67DJL",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: "https://localhost/api/payment/3ds/completee",
        paymentCard: {
            cardUserKey: "JrWNyYCmi/UFXdaXwJHrjqt/pok=",
            cardToken: "1TIzt59ItXpGeYzKwkFYr28giJc="

        },
        buyer: {
            id: "SDFJKG",
            name: "John",
            surname: "Doe",
            gsmNumber: "+905350000000",
            email: "email@email.com",
            identityNumber: "743008664791",
            lastLoginDate: "2020-10-05 12:43:35",
            registrationDate: "2020-10-04 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        billingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        basketItems: [
            {
                id: "BT101",
                name: "Samsung S20",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 90
            },
            {
                id: "BT102",
                name: "Iphone 12",
                category1: "Telefonlar",
                category2: "İOS Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 150
            },
            {
                id: "BT103",
                name: "Samsung S10",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 60
            }
        ]

    }).then((result) => {
        console.log(result)
        Logs.logFile("11-threeds-payments-kayıtlı-bir-kart", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("11-threeds-payments-kayıtlı-bir-kart-hata", err)

    })
}

//initializeThreeDSPaymentsWithRegisteredCard()

// 3DS ile yeni bir kartla kartı kaydederek ödeme yap

const initializeThreeDSPaymentsWithNewCardAndRegister = () => {
    PaymentsThreeDS.initializePayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",
        paidPrice: "300",
        currency: Iyzipay.CURRENCY.TRY,
        installment: "1",
        basketId: "B67DJL",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: "https://localhost/api/payment/3ds/completee",
        paymentCard: {
            cardUserKey: "JrWNyYCmi/UFXdaXwJHrjqt/pok=",
            cardAlias: "Kredi Kartım Ödemeden Sonra",
            cardHolderName: "John Doe",
            cardNumber: "5528790000000008",
            expireMonth: "12",
            expireYear: "2030",
            cvc: '123',
            registerCard: '1'
        },
        buyer: {
            id: "SDFJKG",
            name: "John",
            surname: "Doe",
            gsmNumber: "+905350000000",
            email: "email@email.com",
            identityNumber: "743008664791",
            lastLoginDate: "2020-10-05 12:43:35",
            registrationDate: "2020-10-04 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        billingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        basketItems: [
            {
                id: "BT101",
                name: "Samsung S20",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 90
            },
            {
                id: "BT102",
                name: "Iphone 12",
                category1: "Telefonlar",
                category2: "İOS Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 150
            },
            {
                id: "BT103",
                name: "Samsung S10",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 60
            }
        ]

    }).then((result) => {
        console.log(result)
        Logs.logFile("12-threeds-payments-kayıtlı-bir-kart", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("12-threeds-payments-kayıtlı-bir-kart-hata", err)

    })
}
//initializeThreeDSPaymentsWithNewCardAndRegister()
//readCardsOfAUser();


/*-------------------------------------------*/
/* e) Checkout Form  */
/*-------------------------------------------*/

//Checckout form içerisinde ödeme başlat
const initializeCheckOutForm = () => {
    Checkouts.initialize({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",
        paidPrice: "300",
        currency: Iyzipay.CURRENCY.TRY,
        installment: "1",
        basketId: "B67DJL",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: "https://localhost/api/checkout/completee/payment",
        cardUserKey: "JrWNyYCmi/UFXdaXwJHrjqt/pok=",
        enabledInstallments: [1, 2, 3, 6, 9],
        buyer: {
            id: "SDFJKG",
            name: "John",
            surname: "Doe",
            gsmNumber: "+905350000000",
            email: "email@email.com",
            identityNumber: "743008664791",
            lastLoginDate: "2020-10-05 12:43:35",
            registrationDate: "2020-10-04 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        billingAddress: {
            contactName: "John Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy mah. Bora sok. No:1",
            zipCode: "34732",
        },
        basketItems: [
            {
                id: "BT101",
                name: "Samsung S20",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 90
            },
            {
                id: "BT102",
                name: "Iphone 12",
                category1: "Telefonlar",
                category2: "İOS Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 150
            },
            {
                id: "BT103",
                name: "Samsung S10",
                category1: "Telefonlar",
                category2: "Android Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: 60
            }
        ]

    }).then((result) => {
        console.log(result)
        Logs.logFile("13-checkout-form-payments", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("13-checkout-form-payments-hata", err)

    })

}

//initializeCheckOutForm();

//Tamamlanmış veya tamamlanmammış checkhout ödeme bilgisini gösterir
const getFormPayment = () => {
    Checkouts.getFormPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        token: "85a1c238-2a94-40eb-88fe-175bf0468e12"
    }).then((result) => {
        console.log(result)
        Logs.logFile("14-checkout-form-payments-get-details", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("14-checkout-form-payments-get-details-hata", err)

    })

}
//getFormPayment()



/*-------------------------------------------*/
/* f)Cancel Payments */
/*-------------------------------------------*/

//ÖDEME İPTAL ETME TESTİ

const cancelPayments = () => {
    CancelPayments.cancelPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        paymentId: "18887174",
        ip: "85.34.78.112"
    }).then((result) => {
        console.log(result)
        Logs.logFile("15-cancel-payments", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("15-cancel-payments-hata", err)

    })
}
//cancelPayments()

const cancelPaymentsWithReason = () => {
    CancelPayments.cancelPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        paymentId: "18886979",
        ip: "85.34.78.112",
        reason: Iyzipay.REFUND_REASON.BUYER_REQUEST,
        description: "Kullanıcı isteği ile iptal edildi"

    }).then((result) => {
        console.log(result)
        Logs.logFile("16-cancel-payments-reason", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("16-cancel-payments-reason-hata", err)


    })
}
//cancelPaymentsWithReason()



/*-------------------------------------------*/
/* g) Refund Payments */
/*-------------------------------------------*/

//Ödemenin belirli bir parçasını iade et
const refundPayment = () => {
    RefundPayments.refundPayments({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        paymentTransactionId: "20120580",
        price: "50",
        currency: Iyzipay.CURRENCY.TRY,
        ip: "85.34.78.112"

    }).then((result) => {
        console.log(result)
        Logs.logFile("17-refund-payments", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("17-refund-payments-hata", err)


    })
}
//refundPayment()

//Ödemenin bir kısmını açıklama ile iade et

const refundPaymentWithReason = () => {
    RefundPayments.refundPayments({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        paymentTransactionId: "20120580",
        price: "40",
        currency: Iyzipay.CURRENCY.TRY,
        ip: "85.34.78.112",
        reason: Iyzipay.REFUND_REASON.BUYER_REQUEST,
        description: "kullanıcı iade istedi"

    }).then((result) => {
        console.log(result)
        Logs.logFile("18-refund-payments-with-reason", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("18-refund-payments-with-reason-hata", err)


    })
}
refundPaymentWithReason()
