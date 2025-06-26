const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
},{timestamps: true})

const User = model('User', UserSchema);
module.exports = User;