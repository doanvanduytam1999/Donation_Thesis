const express = require('express');
const DonateEnvent = require('../controllers/donateEventController');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.get('/donateEvensts', DonateEnvent.getDonateEvents);
router.get('/categoryDonateEvents', DonateEnvent.getCategoryDonateEvents);
router.get('/donateEvenst/:id', DonateEnvent.getDonateEvent);
router.post('/donate', DonateEnvent.postDonate);
router.post('/login', AuthController.checkUserLogin, AuthController.loginCustomer);

module.exports = router;