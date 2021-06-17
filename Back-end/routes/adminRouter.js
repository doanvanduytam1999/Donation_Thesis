const express = require('express');
const AdminController = require('../controllers/adminController');


const router = express.Router();

router.post('/addPost', AdminController.postAddpost);

module.exports = router;