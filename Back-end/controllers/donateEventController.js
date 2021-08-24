const catchAsync = require('../utils/catchAsync');
const DonateEvent = require('../models/donateEvent');
const CategoryDonateEvent = require('../models/categoryDonateEvent');
const DonateAction = require('../models/donateAction');
const UserCustomer = require('../models/Donator');
const AuthController = require('../controllers/authController');
const bcrypt = require('bcryptjs');
const { populate } = require('../models/donateEvent');


////Momo
const https = require('https');
const axios = require('axios')
const crypto = require('crypto');
const UserAdmin = require('../models/userAdmin');


exports.getDonateEvents = catchAsync(async (req, res, next) => {
    const donateEnvents = await DonateEvent.find();
    res.status(200).json({
        status: 'success',
        DonateEnvents: donateEnvents
    })
});

//lấy bài đăng theo id
exports.getDonateEvent = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const donateEnvent = await DonateEvent.findById(id);
    res.status(200).json({
        status: 'success',
        DonateEnvent: donateEnvent
    })
});

exports.getCategoryDonateEvents = catchAsync(async (req, res, next) => {
    const categoryDonateEvents = await CategoryDonateEvent.find().populate('donateEnvents');
    res.status(200).json({
        status: 'success',
        CategoryDonateEvents: categoryDonateEvents
    })
});

exports.postDonate = catchAsync(async (req, res, next) => {
    const data = req.body.data;

    const user = await AuthController.userIsLoggedIn(req.cookies.jwt);
    let donateEvent = await DonateEvent.findById(data.donateEvent);
    let currentAmount = donateEvent.currentAmount;
    let numberOfDonations = donateEvent.numberOfDonations;
    let amountToDonate = data.amountToDonate.toString();

    let content = "";
    if (typeof data.message !== 'undefined') {
        content = data.message;
    }
    numberOfDonations = numberOfDonations + 1;
    currentAmount = (Number(currentAmount) + Number(amountToDonate)).toString();
    console.log("vo day");
    console.log("ss", Number(currentAmount) >= Number(donateEvent.setAmount));
    if (Number(currentAmount) >= Number(donateEvent.setAmount)) {
        const updateTienDaDonate = await DonateEvent.findByIdAndUpdate(data.donateEvent, {
            status: 'Đã đủ',
            currentAmount: currentAmount,
            numberOfDonations: numberOfDonations
        }, {
            new: true,
            runValidators: true
        });
    } else {
        const updateTienDaDonate = await DonateEvent.findByIdAndUpdate(data.donateEvent, {
            currentAmount: currentAmount,
            numberOfDonations: numberOfDonations
        }, {
            new: true,
            runValidators: true
        });
    }

    if (user !== 'No Login') {
        if (data.checked) {
            const donateAnDanh = await DonateAction.create({
                amountToDonate: amountToDonate,
                message: content,
                donateEvent: data.donateEvent,
                donator: user.id
            })
        } else {
            const donateAction = await DonateAction.create({
                fullName: user.fullName,
                phone: data.phone,
                message: content,
                amountToDonate: amountToDonate,
                donateEvent: data.donateEvent,
                donator: user.id
            });
            const _donateEvent = await DonateEvent.findById(data.donateEvent);
            if (!_donateEvent.listEmail.includes(user.email)) {
                _donateEvent.listEmail.push(user.email);
                const updateListEmail = await DonateEvent.findByIdAndUpdate(data.donateEvent, {
                    listEmail: _donateEvent.listEmail
                }, {
                    new: true,
                    runValidators: true
                })
            }
        }
    } else {
        if (data.checked) {
            const donateAnDanh = await DonateAction.create({

                amountToDonate: amountToDonate,
                message: content,
                donateEvent: data.donateEvent
            })
        } else {
            const donateAction = await DonateAction.create({
                fullName: data.fullName,
                phone: data.phone,
                message: content,
                amountToDonate: amountToDonate,
                donateEvent: data.donateEvent
            })
        }
    }

    res.status(200).json({
        status: "Success"
    });

});

exports.postRegister = catchAsync(async (req, res, next) => {
    const error = [];
    const username = await UserCustomer.findOne({ username: req.body.username });
    const email = await UserCustomer.findOne({ email: req.body.email });
    if (username) {
        error.push("Username đã tồn tại.");
    }
    if (req.body.username.length < 3 || req.body.username.length > 16) {
        error.push("Username phải từ 3 - 16 ký tự.");
    }
    if (email) {
        error.push(" Email đã tồn tại.");
    }
    if (req.body.password.length < 8 || req.body.password.length > 16) {
        error.push(" Mật khẩu phải từ 8 - 16 ký tự.");
    }
    if (typeof req.body.password === 'undefined') {
        error.push(" Vui lòng cung cấp mật khẩu.");
    }
    if (typeof req.body.passwordConfirm === 'undefined') {
        error.push(" Vui lòng cung cấp mật khẩu xác nhận.");
    }
    if (error.length != 0) {
        return res.status(400).json({
            status: 'error',
            error: error
        })
    }
    const user = await UserCustomer.create({
        username: req.body.username,
        fullName: req.body.fullName,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        email: req.body.email,
    })

    res.status(200).json({
        status: "success"
    })
});

exports.getAllDonate = catchAsync(async (req, res, next) => {
    const user = await AuthController.userIsLoggedIn(req.cookies.jwt);
    if (user === 'No Login') {
        return res.status(401).json({
            status: "No Login"
        })
    }
    const allDonate = await UserCustomer.findById(user.id).populate('donateActions');

    res.status(200).json({
        status: 'success',
        AllDonate: allDonate.donateActions
    })
});

exports.getRelatedPost = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    let result = [];
    const donateEvent = await DonateEvent.findById(id);
    //console.log(donateEvent);
    const relatedPost = await CategoryDonateEvent.findById(donateEvent.categoryPost).populate({ path: 'donateEnvents', match: { status: "Chưa đủ" } });
    //console.log(relatedPost.donateEnvents);
    if (relatedPost.donateEnvents.length > 4) {
        let random = Math.floor(Math.random() * (relatedPost.donateEnvents.length - 1));
        for (let index = random; index < random + 4; index++) {
            result.push(relatedPost.donateEnvents[index]);

        }
    } else {
        const listDonateEvent = await DonateEvent.find({ status: "Chưa đủ" });
        if (listDonateEvent.length >= 4) {
            for (let index = 0; index < 4; index++) {
                result.push(listDonateEvent[index]);
            }
        } else {
            result = relatedPost.donateEnvents;
        }

    }
    res.status(200).json({
        status: 'success',
        ReleatedPost: result
    })
});

exports.get50Donater = catchAsync(async (req, res, next) => {
    const idPost = req.params.id;
    const allDonater = await DonateEvent.findById(idPost).populate({ path: 'donateActions', options: { sort: { _id: -1 }, limit: 50 } })
    res.status(200).json({
        status: 'success',
        AllDonater: allDonater.donateActions
    })
});

exports.getAllDonater = catchAsync(async (req, res, next) => {
    const idPost = req.params.id;
    const allDonater = await DonateEvent.findById(idPost).populate('donateActions');
    res.status(200).json({
        status: 'success',
        AllDonater: allDonater.donateActions
    })
});

exports.postUpdateProfileUser = catchAsync(async (req, res, next) => {
    const data = req.body;
    const userLogin = await AuthController.userIsLoggedIn(req.cookies.jwt);
    const error = [];
    const email = await UserCustomer.findOne({ email: data.email });
    const currentEmail = await UserCustomer.findById(userLogin.id);

    if (email === currentEmail) {
        error.push("Email đã tồn tại.");
    }
    if (error.length != 0) {
        return res.status(400).json({
            status: 'error',
            error: error
        })
    }
    const user = await UserCustomer.findByIdAndUpdate(userLogin.id, {
        fullName: data.fullName,
        email: data.email,
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        User: user
    })
});

exports.putChangePassword = catchAsync(async (req, res, next) => {
    const userLogin = await AuthController.userIsLoggedIn(req.cookies.jwt);
    if (userLogin) {
        const user = await UserCustomer.findById(userLogin.id).select('+password');
        if (!user || user.active === false || !(await user.correctPassword(req.body.oldPassword, user.password))) {
            return res.status(401).json({
                status: "error",
                error: "Không đúng password hoặc tài khoản bị khóa, vui lòng kiểm tra lại thông tin"
            })
        } else {
            if (req.body.newPassword !== req.body.passwordConfirm) {
                return res.status(401).json({
                    status: "error",
                    error: "Password Confirm không đúng, vui lòng kiểm tra lại thông tin"
                })
            } else {
                const password = await bcrypt.hash(req.body.newPassword, 12);
                const changePassword = await UserCustomer.findByIdAndUpdate(userLogin.id, {
                    password: password
                }, {
                    new: true,
                    runValidators: true
                });

                res.status(200).json({
                    status: 'success'
                })
            }
        }
    }
})




//Payment Momo
exports.postPayMomo = catchAsync(async (req, res, next) => {
    let dataReq = req.body
    let partnerCode = "MOMOLNRO20210818";
    let accessKey = "zrUc3Qph1aoOpIau";
    let serectkey = "nhBVWNhzdeU5KpXLUlLtdMnbNplHAUkR";
    let orderInfo = dataReq.orderInfo
    let returnUrl = `http://localhost:3000/thong-tin-chi-tiet/${dataReq.donateEvent} `
    let notifyUrl = "https://donatethesis.herokuapp.com/api/payMomoSusess"
    let amount = dataReq.amountToDonate.toString();
    let orderId = dataReq.orderId;
    let requestId = dataReq.requestId
    let requestType = "captureMoMoWallet";
    let extra = {};

    console.log(dataReq);
    if (dataReq.checked) { //incognito
        extra = {
            checked: true,
            id: dataReq.donateEvent,
        };
        if (typeof dataReq.userId !== 'undefined') {
            extra['userId'] = dataReq.userId;
        }
        if (typeof dataReq.message !== 'undefined') {
            extra['message'] = dataReq.message;
        }
    } else { //not incognito
        extra = {
            checked: false,
            id: dataReq.donateEvent,
            fullName: dataReq.fullName
        };
        if (typeof dataReq.userId !== 'undefined') {
            extra['userId'] = dataReq.userId;
        }
        if (typeof dataReq.message !== 'undefined') {
            extra['message'] = dataReq.message;
        }
        if (typeof dataReq.phone !== 'undefined') {
            extra['phone'] = dataReq.message;
        }

    }


    let extraData = JSON.stringify(extra);
    var rawSignature = "partnerCode=" + partnerCode + "&accessKey=" + accessKey + "&requestId=" + requestId + "&amount=" + amount + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&returnUrl=" + returnUrl + "&notifyUrl=" + notifyUrl + "&extraData=" + extraData
    var signature = crypto.createHmac('sha256', serectkey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    let momo = {};
    const url = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
    const data = {
        "accessKey": accessKey,
        "partnerCode": partnerCode,
        "requestType": requestType,
        "notifyUrl": "https://donatethesis.herokuapp.com/api/payMomoSusess",
        "returnUrl": returnUrl,
        "orderId": orderId,
        "amount": amount,
        "orderInfo": orderInfo,
        "requestId": requestId,
        "extraData": extraData,
        "signature": signature,
    }
    const header = {
        'Content-Type': 'application/json',
    }

    axios.post(url, data, {
        headers: header
    }).then((respont) => {
        momo = respont.data
        console.log("tam123", momo);
        if (momo.errorCode == 0) {
            res.status(200).json({
                status: 'success',
                MomoPay: momo
            })
        }
        else {
            res.status(200).json({
                status: 'fail',
                MomoPay: momo
            })
        }

    })


})
exports.postPayMomoSusess = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const data = req.body;
    const extraData = JSON.parse(data.extraData);
    let user = '';

    //get amount current and amount donate
    let donateEvent = await DonateEvent.findById(extraData.id);
    let currentAmount = donateEvent.currentAmount;
    let numberOfDonations = donateEvent.numberOfDonations;
    let amountToDonate = data.amount.toString();

    //get message
    let content = "";
    if (extraData.message) {
        content = extraData.message;
    }
    //get phone
    let phone = '';
    if (extraData.phone) {
        phone = extraData.phone;
    }
    //update amount donate current
    numberOfDonations = numberOfDonations + 1;
    currentAmount = (Number(currentAmount) + Number(amountToDonate)).toString();
    if(Number(currentAmount) >= Number(donateEvent.setAmount)){
        const updateTienDaDonate = await DonateEvent.findByIdAndUpdate(extraData.id, {
            status: 'Đã đủ',
            currentAmount: currentAmount,
            numberOfDonations: numberOfDonations
        }, {
            new: true,
            runValidators: true
        });
    }else{
        const updateTienDaDonate = await DonateEvent.findByIdAndUpdate(extraData.id, {
            currentAmount: currentAmount,
            numberOfDonations: numberOfDonations
        }, {
            new: true,
            runValidators: true
        });
    }
    

    if (data.message === 'Success') {
        if (extraData.userId) {
            if (extraData.checked) {
                const donateAnDanh = await DonateAction.create({
                    amountToDonate: amountToDonate,
                    message: content,
                    donateEvent: extraData.id,
                    donator: extraData.userId
                })
            } else {
                const donateAction = await DonateAction.create({
                    fullName: extraData.fullName,
                    phone: phone,
                    message: content,
                    amountToDonate: amountToDonate,
                    donateEvent: extraData.id,
                    donator: extraData.userId
                });
                const userDonate = await UserCustomer.findById(extraData.userId);
                const _donateEvent = await DonateEvent.findById(extraData.id);
                if (!_donateEvent.listEmail.includes(userDonate.email)) {
                    _donateEvent.listEmail.push(userDonate.email);
                    const updateListEmail = await DonateEvent.findByIdAndUpdate(extraData.id, {
                        listEmail: _donateEvent.listEmail
                    }, {
                        new: true,
                        runValidators: true
                    })
                }
            }
        } else {
            if (extraData.checked) {
                const donateAnDanh2 = await DonateAction.create({
                    amountToDonate: amountToDonate,
                    message: content,
                    donateEvent: extraData.id
                })
            } else {
                const donateAction2 = await DonateAction.create({
                    fullName: extraData.fullName,
                    phone: phone,
                    message: content,
                    amountToDonate: amountToDonate,
                    donateEvent: extraData.id
                })
            }
        }
    }
})
