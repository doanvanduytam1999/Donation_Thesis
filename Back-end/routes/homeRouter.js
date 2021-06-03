const express = require('express');
const DonateEnvent = require('../controllers/donateEventController');


const router = express.Router();

router.get('/donateEvensts', DonateEnvent.getDonateEvents);
router.get('/categoryDonateEvents', DonateEnvent.getCategoryDonateEvents);
router.get('/donateEvenst/:id', DonateEnvent.getDonateEvent);

module.exports = router;