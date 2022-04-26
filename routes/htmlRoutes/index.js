const path = require('path');
const router = require('express').Router();

// App html home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
  
// Notes HTML page
 router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});
  
// Redirect to index when requesting a file that does not exist
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
 });
 
module.exports = router;