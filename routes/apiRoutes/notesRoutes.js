const fs = require("fs");
const path = require("path");
const router = require('express').Router();
// Notes database (JSON file)
const notes = require('../../db/db.json');
// ID generator
const idgen = require('idgen');

// Confirm note content are strings
function validateID(id) {    
    if (!id || typeof id !== 'string' || id.length != 6) {
      return false;
    }
    return true;
}

// Confirm note content are strings
function validate(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    if (!validateID(note.id)) {
      return false;
    }
    
    return true;
}

// Route to a single note by id
router.get('/notes/:id', (req, res) => {
    let result = {};
    notes.forEach(note => {
        if (note.id === req.params.id){
            result = note;
        }
    });
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// Route to all notes
router.get('/notes', (req, res) => {
    let results = notes;
    
    res.json(results);
});

// Route to add a note
router.post('/notes', (req, res) => {
    req.body.id = idgen(6);
    const note = req.body;

    if (!validate(note)) {
        res.status(400).send("Note is formatted properly.")
    } else {
         notes.push(note);
         //Overwrite db.json with new array
         fs.writeFileSync(
             path.join(__dirname, '../../db/db.json'),
             // null-include all properties of the array and use 2 spaces for indentions
             JSON.stringify(notes, null, 2)
         );
    }
    let results = notes;
    
    res.json(results);
});

// Route to add a note
router.delete('/notes/:id', (req, res) => {
    const deletedID = req.params.id;
    let editedArray = []; 

    if (!validateID(deletedID)) {
        res.status(400).send("Note is formatted properly.")
    } else {
        editedArray = notes.filter(note => note.id != deletedID);
        //Overwrite db.json with new array
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            // null-include all properties of the array and use 2 spaces for indentions
            JSON.stringify(editedArray, null, 2)
         );       
    }  
    
    notes.forEach(() => {
        notes.pop();
    });
    
    editedArray.forEach(note => {
        notes.push(note);
    });

    res.json(notes);
});

module.exports  = router;