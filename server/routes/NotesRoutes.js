const express = require('express')

const router = express.Router();

// controllers
const {addNotes, updateNotes, getAllNotes, getNote, deleteNote} = require('../controllers/NoteController');

router.post('/add', addNotes);
router.get('/getOne', getNote);
router.get('/getall', getAllNotes);
router.put('/update', updateNotes);
router.put('/delete', deleteNote);

module.exports = router;