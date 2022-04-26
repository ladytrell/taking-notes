const router = require('express').Router();
const notes = require('../../db/db.json');

// Route to all notes data
router.get('/notes', (req, res) => {
    let results = notes;
    
    res.json(results);
});

module.exports  = router;