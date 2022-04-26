const router = require('express').Router();
//const notesRoutes = require('../apiRoutes/notesRoutes');
const notesRoutes = require('./notesRoutes');

// Use the routes defined in notesRoutes
router.use(notesRoutes);

module.exports = router;