const express = require('express');
const AdminController = require('../controllers/adminController');
const AuthController = require('../controllers/authController');


const router = express.Router();

router.get('/allPost' , AuthController.checkAdminLogin, AdminController.getAllPost);
router.get('/allCategory' , AuthController.checkAdminLogin, AdminController.getAdllCategoryDonateEvents);
router.get('/logout', AuthController.checkAdminLogin, AuthController.logoutAdmin);

router.post('/addPost', AuthController.checkAdminLogin, AdminController.postAddpost);
router.post('/login', AuthController.loginAdmin);

module.exports = router;