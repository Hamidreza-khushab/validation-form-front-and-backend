const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();

const userSchema = new mongoose.Schema(
    {
        firstName : 
        {
            type : String,
            required : true
        },
        lastName : 
        {
            type : String,
            required : true  
        },
        admin :
        {
            type : String,
            default : false,
        },
        email :
        {
            type : String,
            required : true,
            unique: true
        },
        password:
        {
            type : String,
            required : true
        }
    }, { timestamps : true }
);
userSchema.methods.hashPassword = (password) =>
{
    const hash = crypto.createHmac('sha256', process.env.SECRET_TOKEN).update(password).digest('hex');
    return hash;
};
userSchema.method.comparePasseord = function (loginPassword)
{
    if (this.password != this.hashPassword(loginPassword)) return false;
    return true;    
};
module.exports = mongoose.model('User', userSchema, 'users');
