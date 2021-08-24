const catchAsync = require('../utils/catchAsync');
const DonateEvent = require('../models/donateEvent');
const CategoryDonateEvent = require('../models/categoryDonateEvent');
const AuthController = require('../controllers/authController');
const UserAdmin = require('../models/userAdmin');
const Donator = require('../models/Donator');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const moment = require('moment');
exports.postAddpost = catchAsync(async (req, res, next) => {
    const admin = await AuthController.adminIsLoggedIn(req.cookies.jwtAdmin);
    if (admin.role === 'Admin') {
        return res.status(403).json({
            status: 'error',
            error: 'Bạn không có quyền truy cập vào dữ liệu này!'
        })
    }
    const dataPost = req.body;
    console.log(dataPost);
    let startDay = new Date(dataPost.startDay);
    let endDay = new Date(dataPost.endDay);
    const post = await DonateEvent.create({
        title: dataPost.title,
        image: dataPost.image,
        summary: dataPost.summary,
        content: dataPost.content,
        startDay: startDay,
        endDay: endDay,
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

exports.postHappiness = catchAsync(async (req, res, next) => {
    const admin = await AuthController.adminIsLoggedIn(req.cookies.jwtAdmin);
    if (admin.role === 'Admin') {
        return res.status(403).json({
            status: 'error',
            error: 'Bạn không có quyền truy cập vào dữ liệu này!'
        })
    }
    const id = req.params.id;
    console.log(id);
    //console.log(req.body);
    const data = req.body;

    const post = await DonateEvent.findByIdAndUpdate(id, {
        happinessContent: data.happinessContent,
        imageHappiness: data.imageHappiness
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        Post: post
    })
})

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

exports.getAdllUser = catchAsync(async (req, res, next) => {
    const allUser = await Donator.find();
    res.status(200).json({
        status: 'success',
        AllUser: allUser
    })
});

exports.postAddUserAdmin = catchAsync(async (req, res, next) => {
    const data = req.body;
    const error = [];
    const username = await UserAdmin.findOne({ username: data.username });
    const email = await UserAdmin.findOne({ email: data.email });
    if (username) {
        error.push("Username đã tồn tại.");
    }
    if (email) {
        error.push(" Email đã tồn tại.");
    }
    if(data.username.length < 3 || data.username.length > 16){
        error.push(" Username chỉ được dài từ 3 - 16 ký tự.");
    }
    if(data.password.length < 8 ||data.password.length > 16){
        error.push(" Password chỉ được dài từ 8 - 16 ký tự.");
    }
    if (error.length != 0) {
        return res.status(400).json({
            status: 'error',
            error: error
        })
    }

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
    const error = [];
    const email = await UserAdmin.findOne({ email: data.email });
    const currentEmail = await UserAdmin.findById(id);
    if (email) {
        error.push(" Email đã tồn tại.");
    }
    if (error.length != 0) {
        return res.status(400).json({
            status: 'error',
            error: error
        })
    }
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

exports.postChangeActiveDonator = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const userActive = await Donator.findById(id);
    const Active = !userActive.active;

    const userAdmin = await Donator.findByIdAndUpdate(id, {
        active: Active
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
    const userLogin = await AuthController.adminIsLoggedIn(req.body.jwtAdmin);
    if (userLogin.role !== 'Manager') {
        return res.status(403).json({
            status: "Fail",
            error: "Bạn không có quyền thực hiện tính năng này!"
        })
    }
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

exports.putChangePassword = catchAsync(async (req, res, next) => {
    const userLogin = await AuthController.adminIsLoggedIn(req.cookies.jwtAdmin);
    if (userLogin) {
        console.log(userLogin);
        const user = await UserAdmin.findById(userLogin.id).select('+password active');
        console.log();
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

exports.postSendMail = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const event = await DonateEvent.findById(id);
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'zznhanzz1999@gmail.com',
            pass: 'khongbiet0'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    event.listEmail.forEach(element => {
        var content = '';
        content += `
    <html>
    <head>
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Thông báo cập nhật về chương trình quyên góp mà bạn đã tham gia.</title>
      <style>
      @media only screen and (max-width: 620px) {
        table[class=body] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        }
        table[class=body] p,
              table[class=body] ul,
              table[class=body] ol,
              table[class=body] td,
              table[class=body] span,
              table[class=body] a {
          font-size: 16px !important;
        }
        table[class=body] .wrapper,
              table[class=body] .article {
          padding: 10px !important;
        }
        table[class=body] .content {
          padding: 0 !important;
        }
        table[class=body] .container {
          padding: 0 !important;
          width: 100% !important;
        }
        table[class=body] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }
        table[class=body] .btn table {
          width: 100% !important;
        }
        table[class=body] .btn a {
          width: 100% !important;
        }
        table[class=body] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }
      @media all {
        .ExternalClass {
          width: 100%;
        }
        .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
          line-height: 100%;
        }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
        .btn-primary table td:hover {
          background-color: #34495e !important;
        }
        .btn-primary a:hover {
          background-color: #34495e !important;
          border-color: #34495e !important;
        }
      }
      </style>
    </head>
    <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
      <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
        <tr>
          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
          <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
            <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
              <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
                <tr>
                  <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                      <tr>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Xin chào,</p>
                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Chúng tôi có một số cập nhật mới trên chương trình quyên góp ${event.title}. Bạn có thể xem những cập nhật này bằng link sau:</p>
                          <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                            <tbody>
                              <tr>
                                <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                    <tbody>
                                      <tr>
                                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="http://localhost:3000/thong-tin-chi-tiet/${id}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Đi đến bài viết</a> </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Cảm ơn bạn đã đóng góp cho chương trình.</p>
                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Chúc bạn sức khỏe!</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </td>
          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
    `;
        var mainOptions = {
            from: 'zznhanzz1999@gmail.com',
            to: element,
            subject: `Thông báo có cập nhật về chương trình quyên góp ${event.title}`,
            html: content
        }
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    });
})

exports.getDashboard = catchAsync(async (req, res, next) => {
    const countEventSuccess = await DonateEvent.count({ status: 'Đã đủ' });
    const countEventNotEnough = await DonateEvent.count({ status: 'Chưa đủ' , 'endDay': {$gte : new Date()}, 'startDay': {$lte: new Date()}});
    const countEventExperi = await DonateEvent.count({ status: 'Chưa đủ' , 'endDay': {$lte : new Date()}});
    const allDonate = await DonateEvent.find();
    const countManager = await UserAdmin.count({'role': 'Manager'});
    const countCTV = await UserAdmin.count({'role': 'CTV'});
    const countDonator = await Donator.count();

    res.status(200).json({
        countEventSuccess: countEventSuccess,
        countEventNotEnough: countEventNotEnough,
        countEventExperi: countEventExperi,
        allDonate: allDonate,
        countManager: countManager,
        countCTV: countCTV,
        countDonator: countDonator
    })
})

exports.postResetPassword = catchAsync(async(req, res, next)=>{
    const id = req.body.id;
    const resetPassword = await UserAdmin.findByIdAndUpdate(id, {
        password: '123456789'
    },{
        new: true,
        runValidators: true
    });

    if(!resetPassword){
        return res.status(301).json({
            status: 'fail',
            error: 'Không tìm thấy user admin'
        })
    }

    res.status(200).json({
        status: 'success',
        newPassword: '123456789'
    })
})