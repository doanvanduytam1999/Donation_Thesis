const express = require('express');
const AdminController = require('../controllers/adminController');
const AuthController = require('../controllers/authController');


const router = express.Router();

router.get('/allPost' , AuthController.checkAdminLogin, AdminController.getAllPost);
router.get('/allCategory' , AuthController.checkAdminLogin, AdminController.getAdllCategoryDonateEvents);
router.get('/logout', AuthController.checkAdminLogin, AuthController.logoutAdmin);
router.get('/allUserAdmin', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.getAdllUserAdmin);
router.get('/userAdmin/:id', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.getUserAdmin);

router.post('/addPost', AuthController.checkAdminLogin, AdminController.postAddpost);
router.post('/login', AuthController.loginAdmin);
router.post('/addUserAdmin', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.postAddUserAdmin);
router.post('editUaserAdmin/:id', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.postEditUserAdmin);
router.post('/changeActiveUserAdmin/:id', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.postChangeActive);
router.post('/changeStatusPost/:id', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.postChangeStatusPost);

module.exports = router;