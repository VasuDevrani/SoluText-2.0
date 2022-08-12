const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String, 
        require: true,
    },
})

const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;