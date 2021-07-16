const express = require('express');
const DonateEnvent = require('../controllers/donateEventController');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.get('/donateEvensts', DonateEnvent.getDonateEvents);
router.get('/categoryDonateEvents', DonateEnvent.getCategoryDonateEvents);
router.get('/donateEvenst/:id', DonateEnvent.getDonateEvent);
router.get('/logout', AuthController.checkUserLogin, AuthController.logoutCustomer);
router.get('/allDonate', AuthController.checkUserLogin, DonateEnvent.getAllDonate);
router.get('/allDonater/:id', DonateEnvent.getAllDonater);

router.post('/donate', DonateEnvent.postDonate);
router.post('/login', AuthController.loginCustomer);
router.post('/signup', DonateEnvent.postRegister);
router.post('/updateProfileUser', AuthController.checkUserLogin, DonateEnvent.postUpdateProfileUser);

module.exports = router;