// routes/applications.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/applicationsController');

router.post('/', controller.createApplication);
router.get('/offer/:offerId', controller.getApplicationsByOffer);

module.exports = router;