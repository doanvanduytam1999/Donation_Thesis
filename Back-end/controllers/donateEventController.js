const catchAsync = require('../utils/catchAsync');
const DonateEvent = require('../models/donateEvent');
const CategoryDonateEvent = require('../models/categoryDonateEvent');
const DonateAction = require('../models/donateAction');
const UserCustomer = require('../models/Donator');
const AuthController = require('../controllers/authController');
const bcrypt = require('bcryptjs');


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
    let donateEvent = await DonateEvent.findById(data.id);
    let currentAmount = donateEvent.currentAmount;
    let numberOfDonations = donateEvent.numberOfDonations;
    let amountToDonate = data.coin.toString();

    let content = "";
    if (typeof data.content !== 'undefined') {
        content = data.content;
    }
    numberOfDonations = numberOfDonations + 1;
    currentAmount = (Number(currentAmount) + Number(amountDonate)).toString();
    const updateTienDaDonate = await DonateEvent.findByIdAndUpdate(data.id, {
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
                donateEvent: data.id,
                donator: user.id
            })
        } else {
            const donateAction = await DonateAction.create({
                fullName: user.fullName,
                phone: data.phone,
                message: content,
                amountToDonate: amountToDonate,
                donateEvent: data.id,
                donator: user.id
            })
        }
    } else {
        if (data.checked) {
            const donateAnDanh = await DonateAction.create({

                amountToDonate: amountToDonate,
                message: content,
                donateEvent: data.id
            })
        } else {
            const donateAction = await DonateAction.create({
                fullName: data.fullName,
                phone: data.phone,
                message: content,
                amountToDonate: amountToDonate,
                donateEvent: data.id
            })
        }
    }

    res.status(200).json({
        status: "Success"
    });

});

exports.postRegister = catchAsync(async (req, res, next) => {
    console.log(req.body);
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
    const user = await UserCustomer.findByIdAndUpdate(data.id, {
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
        const user = await UserCustomer.find(userLogin.id).select('+password active');
        if (!user || user.active !== false || !(await UserCustomer.correctPassword(req.body.password, user.password))) {
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
                const password = await bcrypt.hash(req.body.password, 12);
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