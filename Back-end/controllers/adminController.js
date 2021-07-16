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
        nguoiDang: admin.id

    })

    res.status(200).json({
        status: 'susscess',
        Post: post
    })
});

exports.getAllPost = catchAsync(async (req, res, next) => {
    const admin = await AuthController.adminIsLoggedIn(req.cookies.jwtAdmin);
    let allPost = [];
    if (admin.role === 'CTV') {
        const ctv = await UserAdmin.findById(admin.id).populate('donateEnvents');
        allPost = ctv.donateEnvents;
    } else {
        allPost = await DonateEvent.find();
    }

    res.status(200).json({
        status: 'success',
        AllPost: allPost
    })
});
exports.getPostId = catchAsync(async(req, res, next)=>{
    const id = req.params.id;
    const postId = await DonateEvent.findById(id);
    res.status(200).json({
        status: 'success',
        PostID: postId
    })
})
exports.getAdllCategoryDonateEvents = catchAsync(async (req, res, next) => {
    const allCategoryDonateEvent = await CategoryDonateEvent.find();
    res.status(200).json({
        AllCategory: allCategoryDonateEvent
    })
});

exports.getAdllUserAdmin = catchAsync(async (req, res, next) => {
    const allUserAdmin = await UserAdmin.find();
    //console.log(allUserAdmin);
    res.status(200).json({
        status: 'success',
        AllUserAdmin: allUserAdmin
    })
});

exports.postAddUserAdmin = catchAsync(async (req, res, next) => {
    const data = req.body;
    console.log(data);
    const addUserAdmin = await UserAdmin.create({
        username: data.username,
        email: data.email,
        role: data.role,
        password: data.password,
        passwordConfirm: data.confirm,
    });
    res.status(200).json({
        status: 'success',
        UserAdmin: addUserAdmin
    })
});

exports.getUserAdmin = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const userAdmin = await UserAdmin.findById(id);

    res.status(200).json({
        status: 'success',
        UserAdmin: userAdmin
    })
});

exports.postEditUserAdmin = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    console.log(id);
    const userAdmin = await UserAdmin.findByIdAndUpdate(id, {
        email: data.email,
        role: data.role,
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        UserAdmin: userAdmin
    })
});

exports.postChangeActive = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const userAdminActive = await UserAdmin.findById(id);
    const UserActive = !userAdminActive.active;

    const userAdmin = await UserAdmin.findByIdAndUpdate(id, {
        active: UserActive
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        UserAdmin: userAdmin
    })
});

exports.postChangeStatusPost = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data.trangThai);
    const post = await DonateEvent.findByIdAndUpdate(id, {
        trangThai: data.trangThai
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        Post: post
    })
});