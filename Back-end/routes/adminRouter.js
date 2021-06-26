const express = require('express');
const AdminController = require('../controllers/adminController');
const AuthController = require('../controllers/authController');


const router = express.Router();

router.post('/addPost', AuthController.checkAdminLogin, AdminController.postAddpost);
router.post('/login', AuthController.checkAdminLogin, AuthController.loginAdmin);

module.exports = router;