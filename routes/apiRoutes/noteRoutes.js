const router = require('express').Router();
const {notes} = require('../../db/db.json');
const path = require('path');
const fs = require('fs');

function createNewNote(note, noteList = []){
    noteList.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({notes}, null, 2)
    );

    return note;
}

function validateNote(note){
    if(!note.title){
        return false;
    }
    if(!note.text){
        return false;
    }
    
    return true;
}

router.get('/notes', (req, res) =>{
    return res.json(notes);
});

router.post('/notes', (req, res) =>{
    if(!validateNote(req.body)){
        return res.status(400).send('Note is blank. Please fill out the note');
    }
    else{
        const note = createNewNote(req.body, notes);
        return res.json(note);
    }
});

module.exports = router;