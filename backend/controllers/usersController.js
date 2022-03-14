const User = require('../models/User.js');
const { validationResult } = require('express-validator');

const addUser = async (req, res, next) =>
{
    try 
    { 
        const 
            { 
                firstName,
                lastName,
                email,
                password,
                admin
            } =req.body;
        const alreadyExists = await User.find({ email });
        if (alreadyExists.length >= 1)
        {
            return res.status(409).json(
                {
                    success: false,
                    message: 'email already exists'
                }
            );
        }
        const errors = validationResult(req); 
        if (!errors.isEmpty()) 
        {
            return res.status(422).json({ errors: errors.array() });
        }

        const user = new User({
            firstName,
            lastName,
            email,
            password,
            admin
        });
        user.password = user.hashPassword(password);
        const userSavedDB = await user.save();
        res.status(200).json({
            success: true,
            message: `Thanks ${firstName} for registering.`,
            data: user
        });
    }
    catch (e) 
    {
        next(e);
    }
};
module.exports = addUser;
