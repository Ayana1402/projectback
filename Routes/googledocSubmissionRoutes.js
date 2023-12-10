const express = require('express');
const { submitForm, getVivavoce} = require('../controllers/GoogledocSubmissionController');

const router = express.Router();

router.post('/googledoclinksubmit', submitForm);
router.post('/getvivavoce', getVivavoce);

module.exports = router;
