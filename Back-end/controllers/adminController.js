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
        status: 'susscess'
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



