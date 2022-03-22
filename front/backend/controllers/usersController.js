const User = require('../models/User.js');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

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
        console.log(userSavedDB);
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
const loginUser = async (req, res, next) => 
{
    try 
    {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            return res.status(422).res.json(
                {
                    success: false,
                    errors: errors.array()
                });
        }
        const userFoundDB = await User.findOne({ email });
        console.log(userFoundDB);
        if (userFoundDB) 
        {
            if (userFoundDB.comparePassword(password)) 
            {
                userFoundDB.lastLogin = new Date();
                const userLastLogin = await userFoundDB.save();
                const token = jwt.sign(
                    {
                        email: userLastLogin.email,
                        userId: userLastLogin._id,
                    },
                    process.env.SECRET_TOKEN, { expiresIn: '30d' });
                res.status(200).json(
                    {
                        success: true,
                        token: token,
                        message: `You are logged in ${userLastLogin.firstName}`
                    });
            }
            else
            {
                res.status(400).json(
                    {
                        success: false,
                        message: 'You could not log in. Pls ensure email and password are correct.'
                    });
            }
        }
        else
        {
            res.status(400).json(
                {
                    success: false,
                    message: 'pls sign up'
                });
        }
    }
    catch (e)
    { next(e); }
};
module.exports = { addUser, loginUser } ;
