const catchAsync = require('../utils/catchAsync');
const DonateEvent = require('../models/donateEvent');
const CategoryDonateEvent = require('../models/categoryDonateEvent');
const AuthController = require('../controllers/authController');
const UserAdmin = require('../models/userAdmin');

exports.postAddpost = catchAsync(async (req, res, next) => {
    const admin = await AuthController.adminIsLoggedIn(req.cookies.jwtAdmin);
    if (admin.role === 'Admin') {
        return res.status(403).json({
            status: 'error',
            error: 'Bạn không có quyền truy cập vào dữ liệu này!'
        })
    }
    const dataPost = req.body.data;

    const post = await DonateEvent.create({
        title: dataPost.title,
        image: dataPost.image,
        summary: dataPost.summary,
        content: dataPost.content,
        startDay: dataPost.startDay,
        endDay: dataPost.endDay,
        setAmount: dataPost.setAmount,
        categoryPost: dataPost.categoryPost,
        hotPost: dataPost.hotPost,
        poster: admin.id

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
    } else if (admin.role === 'Manager') {
        allPost = await DonateEvent.find();
    } else {
        return res.status(403).json({
            status: 'error',
            error: 'Bạn không có quyền truy cập vào dữ liệu này!'
        })
    }

    res.status(200).json({
        status: 'success',
        AllPost: allPost
    })
});
exports.getPostId = catchAsync(async (req, res, next) => {
    const admin = await AuthController.adminIsLoggedIn(req.cookies.jwtAdmin);
    if (admin.role === 'Admin') {
        return res.status(403).json({
            status: 'error',
            error: 'Bạn không có quyền truy cập vào dữ liệu này!'
        })
    }
    const id = req.params.id;
    const postId = await DonateEvent.findById(id);
    res.status(200).json({
        status: 'success',
        PostID: postId
    })
})
/* exports.getAdllCategoryDonateEvents = catchAsync(async (req, res, next) => {
    const allCategoryDonateEvent = await CategoryDonateEvent.find();
    res.status(200).json({
        status: 'success',
        AllCategory: allCategoryDonateEvent
    })
}); */

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
    const post = await DonateEvent.findByIdAndUpdate(id, {
        status: data.status
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        Post: post
    })
});

exports.putChangePassword = catchAsync(async(req, res, next)=> {
    const userLogin = await AuthController.userIsLoggedIn(req.cookies.jwtAdmin);
    if (userLogin) {
        const user = await UserAdmin.find(userLogin.id).select('+password active');
        if (!user || user.active !== false || !(await UserAdmin.correctPassword(req.body.password, user.password))) {
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
                const changePassword = await UserAdmin.findByIdAndUpdate(userLogin.id, {
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