const { Router } = require('express');
const {newActivity} = require('../controllers/activity.js')
const router= Router();

router.post('/', newActivity);

module.exports = router;
