const catchAsync = require('../utils/catchAsync');
const DonateEvent = require('../models/donateEvent');
const CategoryDonateEvent = require('../models/categoryDonateEvent');
const DonateAction = require('../models/donateAction');
const UserCustomer = require('../models/user');
const AuthController= require('../controllers/authController');



exports.postDonateEvents = catchAsync(async (req, res, next) => {
    const a = await DonateEvent.create({
        tieude: "Đại sứ nước – Chung tay đưa nước về ấp Thanh Trì B",
        hinhanh: [],
        noidung: "Thanh Trì B là một ấp nghèo của tỉnh Trà Vinh, người dân phải sử dụng nguồn nước ô nhiễm do xâm nhập mặn. Cùng chung tay quyên góp giúp bà con xây dựng hệ thống nước sạch!",
        ngaybatdau: "15/06/2021",
        ngayketthuc: "15/07/2021",
        soTienCanDonate: "150.000.000 VNĐ",
        soTienDonateHieTai: "50.000.000 VNĐ",
        nguoiDaDonate: [],
        loaibaidang: "60b7a9ff9a127331a8e5b087"
    });
    const b = await DonateEvent.create({
        tieude: "Cùng gây quỹ tặng đồ bảo hộ chống dịch Covid-19 cho người dân và cán bộ y tế huyện Nậm Pồ",
        hinhanh: [],
        noidung: "Cùng chung tay quyên góp để hỗ trợ đội ngũ cán bộ y bác sĩ và người dân huyện Nậm Pồ, tỉnh Điện Biên đẩy lùi dịch Covid-19 đang có diễn biến ô cùng phức tạp.",
        ngaybatdau: "31/05/2021",
        ngayketthuc: "15/06/2021",
        soTienCanDonate: "50.000.000 VNĐ",
        soTienDonateHieTai: "10.000.000 VNĐ",
        nguoiDaDonate: [],
        loaibaidang: "60b7a9ff9a127331a8e5b087"
    });
    res.send("ok!");
});

//lấy tất cả bài đăng
exports.getDonateEvents = catchAsync(async (req, res, next) => {
    const donateEnvents = await DonateEvent.find();
    res.status(200).json({
        DonateEnvents: donateEnvents
    })
});

//lấy bài đăng theo id
exports.getDonateEvent = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const donateEnvent = await DonateEvent.findById(id);
    res.status(200).json({
        DonateEnvent: donateEnvent
    })
});

exports.getCategoryDonateEvents = catchAsync(async (req, res, next) => {
    const categoryDonateEvents = await CategoryDonateEvent.find().populate('donateEnvents');
    res.status(200).json({
        CategoryDonateEvents: categoryDonateEvents
    })
});
/* CategoryDonateEvents => array loại 
foreach(CategoryDonateEvents as a){
    a.donateEnvents => array baidang
    foreach(a.donateEnvents as bd){
        bd.---
    }
}

*/
exports.postCategoryDonateEvents = catchAsync(async (req, res, next) => {
    const a = await CategoryDonateEvent.create({
        tenloai: "Ủng hộ cho hoàn cảnh khó khăn"
    });
    const b = await CategoryDonateEvent.create({
        tenloai: "Ủng hộ cho tổ chức"
    });
    const c = await CategoryDonateEvent.create({
        tenloai: "Gây quỹ cứu trợ"
    });

    res.send("oke!");

});

exports.postDonate = catchAsync(async (req, res, next) => {
    const data = req.body.data;
    const user = await AuthController.userIsLoggedIn(req.cookies.jwt);
    let donateEvent = await DonateEvent.findById(data.id);
    let soTienHienCo = donateEvent.soTienDonateHieTai;
    let soTienDonate = data.coin.toString();
    let content = "";
    if (typeof data.content !== 'undefined') {
        content = data.content;
    }

    soTienHienCo = (Number(soTienHienCo) + Number(soTienDonate)).toString();
    const updateTienDaDonate = await DonateEvent.findByIdAndUpdate(data.id, {
        soTienDonateHieTai: soTienHienCo
    }, {
        new: true,
        runValidators: true
    });

    if (data.checked) {
        const donateAnDanh = await DonateAction.create({
            soTienDonate: soTienDonate,
            loiNhan: content,
            chuongTringQuyenGop: data.id
        })
    } else {
        const donateAction = await DonateAction.create({
            tenNguoiDonate: data.name,
            soDienThoai: data.phone,
            loiNhan: content,
            soTienDonate: soTienDonate,
            chuongTringQuyenGop: data.id
        })
    }
    res.status(200).json({
        status: "Success"
    });

});