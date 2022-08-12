const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    title: {
        type: String
    },
    notes: {
        type: String,
        require: true
    }
})

const NoteModel = mongoose.model('NoteModel', NoteSchema);

module.exports = NoteModel;