const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/Donator');
const UserAdmin = require('../models/userAdmin');

///momo





const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.adminIsLoggedIn = async (cookie) => {
  if (cookie) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        cookie,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await UserAdmin.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      return currentUser;

    } catch (err) {
      //return next();
      return "No Login";
    }
  }
  return "No Login";
}

exports.userIsLoggedIn = async (cookie) => {
  if (cookie) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        cookie,
        process.env.JWT_SECRET
      );
      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      return currentUser;

    } catch (err) {
      //return next();
      return "No Login";
    }
  }
  return "No Login";
}

exports.checkAdminLogin = catchAsync(async (req, res, next) => {
  //console.log(req.cookies.jwtAdmin);
  if (req.cookies.jwtAdmin) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwtAdmin,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await UserAdmin.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      return next();

    } catch (err) {
      //return next();
      return res.status(401).json({
        status: "No Login"
      });
    }
  }
  return res.status(401).json({
    status: "No Login"
  });
});

exports.checkUserLogin = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      return next();

    } catch (err) {
      //return next();
      return res.status(401).json({
        status: "No Login"
      });
    }
  }
  return res.status(401).json({
    status: "No Login"
  });
});

//Create and send token customer

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  //if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  // Remove password from output
  
  user.password = undefined;
  console.log("s",user);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user
    }
  });
};

//Create and send token admin
const createSendTokenAdmin = (userAdmin, statusCode, res) => {
  const token = signToken(userAdmin._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  //if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  // Remove password from output
  userAdmin.password = undefined;
  res.cookie('jwtAdmin', token, cookieOptions);
  console.log(userAdmin);

  return res.status(statusCode).json({
    status: 'success',
    token,
    active: true,
    data: {
      user: userAdmin
    }
  });

};

//logout  customer
exports.logoutCustomer = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

//logout  admin
exports.logoutAdmin = (req, res) => {
  res.cookie('jwtAdmin', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

//Login Customer
exports.loginCustomer = catchAsync(async (req, res, next) => {
  const islogin = await this.userIsLoggedIn(req.cookies.jwt);
  console.log(islogin);
  if (islogin !== 'No Login') {
    return res.status(301).json({
      status: "Is Login",
      user: islogin
    })
  }
  const username = req.body.username;
  const password = req.body.password;
  //check if username & password exists
  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      error: "Vui lòng cung cấp đầy đủ tài khoản và mật khẩu"
    })
  }
  //2) check if user exist and passowrd is correct
  const user = await User.findOne({ 'username': username }).select('+password');
  console.log(user);
  if (!user || user.active === false || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "error",
      error: "Tài khoản hoặc mật khẩu không đúng!"
    })
  }
  //3) If everything Ok

  createSendToken(user, 200, res);
});

//Login by google
exports.loginByGoogle = catchAsync(async (req, res, next) => {
  const islogin = await this.userIsLoggedIn(req.cookies.jwt);
  if (islogin !== 'No Login') {
    return res.status(301).json({
      status: "Is Login",
      user: islogin
    })
  }
  const idGoogle = req.body.id;
  console.log("id:", idGoogle);
  if(typeof req.body.id ===  'undefined'){
    return res.status(301).json({
      status: 'fail',
      error: 'Bạn chưa login bằng Google.'
    })
  }
  //2) check if user exist and passowrd is correct
  const user = await User.findOne({ 'googleID': idGoogle });
  console.log("user da co",user);
  if (!user || user.active === false) {
    const newUser = await User.create({
      googleID: idGoogle,
      fullName: req.body.fullName,
      email: req.body.email,
    })
    console.log('success');
    createSendToken(newUser, 200, res);
  }
  createSendToken(user, 200, res);
});

//Login Admin
exports.loginAdmin = catchAsync(async (req, res, next) => {
  const islogin = await this.adminIsLoggedIn(req.cookies.jwtAdmin);
  console.log(req.body);
  if (islogin !== 'No Login') {
    return res.status(301).json({
      status: "Is Login",
      useradmin: islogin
    })
  }
  const username = req.body.username;
  const password = req.body.password;
  //check if username & password exists
  if (!username || !password) {
    return res.status(401).json({
      status: "error",
      error: "Vui lòng cung cấp đầy đủ email và passwords"
    })
  }
  //2) check if user exist and passowrd is correct
  const Admin = await UserAdmin.findOne({ 'username': username }).select('+password');
  console.log(Admin);
  if (!Admin || Admin.active === false || !(await Admin.correctPassword(password, Admin.password))) {
    return res.status(401).json({
      status: "error",
      error: "Không đúng email, password hoặc tài khoản bị khóa, vui lòng kiểm tra lại thông tin"
    })
  }
  //3) If everything Ok
  createSendTokenAdmin(Admin, 200, res);

});

// viết hàm isLoggedIn trả về 1 giá trị yes or no ( dựa vào cookie ) sau khi trả res về thì viết even load cho page ẩn hiện tên đăng nhập/ đăng ký


//Allow user for access route
exports.restrictTo = catchAsync(async (req, res, next) => {
  const userAdmin = await this.adminIsLoggedIn(req.cookies.jwtAdmin);
  console.log("ủeadmin", userAdmin);
  console.log("aaa", req.body);
  if (userAdmin.role === 'Admin') {
    return next();
  } else {
    return res.status(403).json({
      status: 'error',
      error: 'Bạn không có quyền truy cập vào dữ liệu này!'
    })
  }
});

/* exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const decoded = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRET
  );
  const user = await UserCustomer.findById(decoded.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Password hiện tại của bạn không đúng.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
}); */