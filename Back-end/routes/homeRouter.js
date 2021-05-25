const express = require('express');
const DonateEnvent = require('../controllers/donateEventController');


const router = express.Router();

router.get('/donateEvensts', DonateEnvent.getDonateEvents);
//router.get('/donateEvensts', DonateEnvent.postDonateEvents);


module.exports = router;