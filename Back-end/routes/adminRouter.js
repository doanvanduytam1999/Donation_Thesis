const express = require('express');
const AdminController = require('../controllers/adminController');
const AuthController = require('../controllers/authController');


const router = express.Router();

router.get('/allPost' , AuthController.checkAdminLogin, AdminController.getAllPost);
//router.get('/allCategory' , AuthController.checkAdminLogin, AdminController.getAdllCategoryDonateEvents);
router.get('/logout', AuthController.checkAdminLogin, AuthController.logoutAdmin);
router.get('/allUserAdmin', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.getAdllUserAdmin);
router.get('/userAdmin/:id', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.getUserAdmin);
router.get('/postID/:id', AuthController.checkAdminLogin, AdminController.getPostId);

router.post('/addPost', AuthController.checkAdminLogin, AdminController.postAddpost);
router.post('/login', AuthController.loginAdmin);
router.post('/addUserAdmin', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.postAddUserAdmin);
router.put('/editUserAdmin/:id', AuthController.checkAdminLogin, AdminController.postEditUserAdmin);
router.put('/changeActiveUserAdmin/:id', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.postChangeActive);
router.put('/changeStatusPost/:id', AuthController.checkAdminLogin, AdminController.postChangeStatusPost);
router.put('/changePassword', AuthController.checkAdminLogin, AdminController.putChangePassword)
module.exports = router;