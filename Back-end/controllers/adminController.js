const catchAsync = require('../utils/catchAsync');
const DonateEvent = require('../models/donateEvent');
const CategoryDonateEvent = require('../models/categoryDonateEvent');
const AuthController = require('../controllers/authController');

exports.postAddpost = catchAsync(async (req, res, next) => {
    const dataPost = req.body.data;
    const post = await DonateEvent.create({
        tieuDe: dataPost.tieude,
        hinhAnh: dataPost.img,
        tomTat: dataPost.tomtat,
        noiDung: dataPost.content,
        ngayBatDau: dataPost.batdau,
        ngayKetThuc: dataPost.ketthuc,
        soTienCanDonate: dataPost.sotiencandonate,
        loaiBaiDang: dataPost.loaibaidang,
        tinNoiBat: dataPost.tinnoibat

    })

    res.status(200).json({
        status: 'susscess'
    })
});






