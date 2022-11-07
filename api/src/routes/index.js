const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRoute = require('./country')
const activityRoute = require('./activity');
// const { route } = require('./country');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countryRoute)
router.use('/activity', activityRoute)

module.exports = router;
