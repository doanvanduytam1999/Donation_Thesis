const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const { patch } = require('../app');
const DonateEvent = require('../models/donateEvent');
const DonateEnvent = require('../models/donateEvent');


exports.postDonateEvents = catchAsync(async(req, res, next) => {
    const a = await DonateEvent.create({
        title: "Chung tay gây quỹ phẫu thuật 5 nụ cười trong chương trình tại Hà Nội",
        image: "",
        content: "Khe hở môi vòm là một bệnh phổ biến ở Việt Nam cũng như các nước Châu Á mà dân gian hay gọi là sứt môi - hở hàm ếch. Tại Việt Nam với tỷ lệ 1/700, mỗi năm có khoảng 3,000 trẻ em sinh ra với dị tật hàm mặt. Với các em, ngoài việc ảnh hưởng tới sức khỏe, thể chất, những khó khăn trong sinh hoạt hàng ngày, còn có những nỗi đau to lớn về mặt tinh thần, đó là sự kỳ thị xa lánh của xã hội. ",
        expired: "05/08/2021",
        soTienCanDonate: '500.000.000',
        soTienDonateHieTai: '300.000.000',
        nguoiDaDonate: []
    })
    res.send("ok!");
});

exports.getDonateEvents = catchAsync(async(req, res, next) => {
    const donateEnvents = await DonateEnvent.find();
    /* res.status(200).json({
        DonateEnvents: donateEnvents
    }) */
    res.send(donateEnvents);
});