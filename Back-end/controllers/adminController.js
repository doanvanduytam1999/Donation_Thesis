const catchAsync = require('../utils/catchAsync');
const DonateEvent = require('../models/donateEvent');
const CategoryDonateEvent = require('../models/categoryDonateEvent');

exports.postAddpost = catchAsync(async(req, res, next)=> {
    const dataPost = req.body.data;
    const post = await DonateEvent.create({
        tieude: dataPost.tieude,
        hinhanh: dataPost.img,
        tomtat: dataPost.tomtat,
        noidung: dataPost.content,
        ngaybatdau: dataPost.batdau,
        ngayketthuc: dataPost.ketthuc,
        soTienCanDonate: dataPost.sotiencandonate,
       
    })
    
    res.status(200).json({
        status: 'susscess'
    })
})