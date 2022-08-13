const express = require('express');
const {addTrans, getAllTrans, updateTrans, getTrans, deleteTrans} = require('../controllers/TransController');

const router = express.Router();

router.post('/add', addTrans);
router.post('/getall', getAllTrans);
router.post('/getOne', getTrans);
router.put('/update', updateTrans)
router.put('/delete', deleteTrans)

module.exports = router;