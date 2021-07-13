const catchAsync = require('../utils/catchAsync');
const DonateEvent = require('../models/donateEvent');
const CategoryDonateEvent = require('../models/categoryDonateEvent');
const AuthController = require('../controllers/authController');
const UserAdmin = require('../models/userAdmin');

exports.postAddpost = catchAsync(async (req, res, next) => {
    const dataPost = req.body.data;
    const admin = await AuthController.adminIsLoggedIn(req.cookies.jwtAdmin);
    const post = await DonateEvent.create({
        tieuDe: dataPost.tieude,
        hinhAnh: dataPost.img,
        tomTat: dataPost.tomtat,
        noiDung: dataPost.content,
        ngayBatDau: dataPost.batdau,
        ngayKetThuc: dataPost.ketthuc,
        soTienCanDonate: dataPost.sotiencandonate,
        loaiBaiDang: dataPost.loaibaidang,
        tinNoiBat: dataPost.tinnoibat,
        nguoidang: admin.id

    })

    res.status(200).json({
        status: 'susscess',
        Post: post
    })
});

exports.getAllPost = catchAsync(async (req, res, next) => {
    const allPost = await DonateEvent.find();
    res.status(200).json({
        AllPost: allPost
    })
});

exports.getAdllCategoryDonateEvents = catchAsync(async (req, res, next) => {
    const allCategoryDonateEvent = await CategoryDonateEvent.find();
    res.status(200).json({
        AllCategory: allCategoryDonateEvent
    })
});

exports.getAdllUserAdmin = catchAsync(async (req, res, next) => {
    const allUserAdmin = await UserAdmin.find();
    console.log(allUserAdmin);
    res.status(200).json({
        status: 'success',
        AllUserAdmin: allUserAdmin
    })
});

exports.postAddUserAdmin = catchAsync(async (req, res, next) => {
    const data = req.body.data;
    const addUserAdmin = await UserAdmin.create({
        username: data.username,
          email: data.email,
          role: data.role,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
    });
    res.status(200).json({
        status: 'success',
        UserAdmin: addUserAdmin
    })
});



