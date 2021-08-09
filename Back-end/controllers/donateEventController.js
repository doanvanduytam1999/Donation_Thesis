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
    const updateTienDaDonate = await DonateEvent.findByIdAndUpdate(data.donateEvent, {
        currentAmount: currentAmount,
        numberOfDonations: numberOfDonations
    }, {
        new: true,
        runValidators: true
    });
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
            })
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
    if (email) {
        error.push(" Email đã tồn tại.");
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
    const relatedPost = await CategoryDonateEvent.findById(donateEvent.categoryPost).populate({path: 'donateEnvents', match: {status: "Chưa đủ"}});
    //console.log(relatedPost.donateEnvents);
    if(relatedPost.donateEnvents.length > 4){
        let random = Math.floor(Math.random()* (relatedPost.donateEnvents.length - 1));
        for (let index = random; index < random + 4; index++) {
            result.push(relatedPost.donateEnvents[index]);
            
        }
    }else{
        const listDonateEvent = await DonateEvent.find({status: "Chưa đủ"});
        if(listDonateEvent.length >= 4){
            for (let index = 0; index < 4; index++) {
                result.push(listDonateEvent[index]);
            }
        }else{
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
    const error = [];
    const email = await UserAdmin.findOne({ email: data.email });
    if (email) {
        error.push("Email đã tồn tại.");
    }
    if (error.length != 0) {
        return res.status(400).json({
            status: 'error',
            error: error
        })
    }
    const userLogin = await AuthController.userIsLoggedIn(req.cookies.jwt);
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




/////Pay Momo

exports.postPayMomo = catchAsync(async(req,res, next)=>{
    console.log(req.body);
    //console.log(req.body);
    let dataReq =req.body
    //let endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor";
    //let hostname = "https://test-payment.momo.vn";
    //let path = "/gw_payment/transactionProcessor";
    let partnerCode = "MOMOCJMP20200704";
    let accessKey = "BQWokz0y0lEnkaej";
    let serectkey = "0QzyjrezSx6dIJhEMWz2LlK4nShCGHqb";
    let orderInfo = dataReq.orderInfo
    let returnUrl = `http://localhost:3000/thong-tin-chi-tiet/${dataReq.donateEvent} `
    let notifyurl = "http://localhost:4000/api/payMomoSusess"
    let amount = "1000"//dataReq.amountToDonate
    let orderId = dataReq.orderId
    let requestId = dataReq.requestId
    let requestType = "captureMoMoWallet";
    let extraData = "merchantName=[Donate];merchantId=[Donate123]";
    var rawSignature = "partnerCode="+partnerCode+"&accessKey="+accessKey+"&requestId="+requestId+"&amount="+amount+"&orderId="+orderId+"&orderInfo="+orderInfo+"&returnUrl="+returnUrl+"&notifyUrl="+notifyurl+"&extraData="+extraData
    var signature = crypto.createHmac('sha256', serectkey)
                   .update(rawSignature)
                   .digest('hex');
console.log("--------------------SIGNATURE----------------")
console.log(signature)
    var body = JSON.stringify({
        partnerCode : partnerCode,
        accessKey : accessKey,
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        returnUrl : returnUrl,
        notifyUrl : notifyurl,
        extraData : extraData,
        requestType : requestType,
        signature : signature,
    })
    var options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/gw_payment/transactionProcessor',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body)
       }
      };
    var req = https.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (body) => {
          console.log('Body');
          console.log(body);
          console.log('payURL');
          console.log(JSON.parse(body).payUrl);
        });
        res.on('end', () => {
          console.log('No more data in response.');
        });
      });
      
      req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
      });
      
      
      req.write(body);
      req.end();

    /* let momo={};
    const url = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
    const data = {
        "accessKey": accessKey,
        "partnerCode": partnerCode,
        "requestType": requestType,
        "notifyUrl": "http://localhost:4000/api/payMomoSusess",
        "returnUrl": returnUrl,
        "orderId": orderId,
        "amount": amount,
        "orderInfo": orderInfo,
        "requestId": requestId,
        "extraData": extraData,
        "signature": signature,
    } */
    /* const header =  {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    } */

    //const option = 

   /*  axios.post(url,data, {
        headers:header
    }).then((respont)=>{
        momo = respont.data
        console.log("tam123", momo);
        if(momo.errorCode ==0){
            res.status(200).json({
                status: 'success',
                MomoPay: momo
            })
        }
        else if (momo.errorCode ==6){
            console.log("sdsdd");
            res.status(200).json({
                status: 'success',
                MomoPay: momo
            })
        }else{
            console.log("truong hop khac");
        }
        
    }) */

  
})
exports.postPayMomoSusess = catchAsync(async(req, res, next)=>{
    console.log("abc");
    let data= req.body; 
    console.log("thanh toan",data);
})
