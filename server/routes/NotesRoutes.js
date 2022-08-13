const express = require('express')

const router = express.Router();

// controllers
const {addNotes, updateNotes, getAllNotes, getNote, deleteNote} = require('../controllers/NoteController');

router.post('/add', addNotes);
router.post('/getOne', getNote);
router.post('/getall', getAllNotes);
router.put('/update', updateNotes);
router.put('/delete', deleteNote);

module.exports = router;