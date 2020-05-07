const { Router } = require('express');
const router = Router();

const {
     renderNoteform,
     createNewNote, 
     renderNotes, 
     renderEditForm, 
     updateNote, 
     deletenote } = require('../controllers/notes.controller');

const {isAuthenticated} = require('../helpers/auth')

// new note
router.get('/notes/add',isAuthenticated, renderNoteform);

router.post('/notes/new-note',isAuthenticated, createNewNote);

//get all notes
router.get('/notes',isAuthenticated, renderNotes);

// edit notes
router.get('/notes/edit/:id',isAuthenticated, renderEditForm)

router.put('/notes/edit/:id',isAuthenticated, updateNote)

//delete notes
router.delete('/notes/delete/:id',isAuthenticated, deletenote)

module.exports = router;