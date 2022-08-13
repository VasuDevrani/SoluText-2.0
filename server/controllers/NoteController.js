const mongoose = require('mongoose');
const { findByIdAndDelete } = require('../models/NotesModel');
const NoteModel = require('../models/NotesModel');


const addNotes = async(req, res) => {
    console.log('notes', req.method);

    try{
        const {userId, title, notes} = req.body;

        const newNote = new NoteModel({
            userId: userId,
            title: title,
            notes: notes
        })

        const note = await newNote.save();
        res.status(200).json(note);

    }catch(err){
        res.status(404).json({message: err.message});
    }
}

const updateNotes = async(req, res) => {
    console.log('notes', req.method)

    try{
        const {_id} = req.body;

        const data = await NoteModel.findByIdAndUpdate( _id, req.body);
        res.status(200).json(data);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

const getAllNotes = async(req, res) => {
    console.log('notes', req.method)

    try{
        const {userId} = req.body;

        const data = await NoteModel.find({userId: userId});
        console.log(data);
        res.status(200).json(data);

    }catch(err){
        res.status(404).json({message: err.message});
    }
}

const getNote = async(req, res) => {
    console.log('notes', req.method)

    try{
        const {_id} = req.body;
        const data = await NoteModel.findById(_id.id);
        // console.log(data)

        res.status(200).json(data);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

const deleteNote = async(req, res) => {
    console.log('notes', req.method);

    try{
        const {_id} = req.body;

        await NoteModel.findByIdAndDelete(_id);
        res.status(200).json({message: 'successfully deleted'});
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

module.exports = ({addNotes, updateNotes, getAllNotes, getNote, deleteNote});