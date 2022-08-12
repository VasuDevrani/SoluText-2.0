const mongoose = require("mongoose");
const TransModel = require('../models/TranslateModel')

const addTrans = async(req, res) => {
    console.log("trans", req.method);

    try{
        const newTrans = new TransModel(req.body);
        const data = await newTrans.save();

        res.status(200).json(data);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

const getTrans = async(req, res) => {
    console.log('trans', req.method);

    try{
        const _id = req.body._id;
        const userId = req.body.userId;
        
        const trans = await TransModel.findOne({_id: _id});

        if(userId === trans.userId)
        {
            res.status(200).json(trans);
        }else{
            res.status(500).json({message: 'not authorised'})
        }
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

const getAllTrans = async(req, res) => {
    console.log('trans', req.method);

    try{
        const userId = req.body.userId;
        const allTrans = await TransModel.find({userId: userId});

        res.status(200).json(allTrans);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

const updateTrans = async(req, res) => {
    console.log('trans', req.method);

    try{
        const _id = req.body._id;

        const data = await TransModel.findByIdAndUpdate(_id, req.body);

        res.status(200).json(data);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

const deleteTrans = async(req, res) => {
    console.log('trans', req.method);

    try{
        const {_id} = req.body;

        await TransModel.findByIdAndDelete(_id);
        res.status(200).json({message: 'successfully deleted'});
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

module.exports = {addTrans, getAllTrans, updateTrans, getTrans, deleteTrans};