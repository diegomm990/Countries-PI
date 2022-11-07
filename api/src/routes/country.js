const { Router } = require('express');
const { getAllCountries, getCountryById } = require('../controllers/country')
const router= Router();

router.get('/', getAllCountries)
router.get('/:idPais', getCountryById)  

module.exports = router;