const express = require('express');
const cors = require('cors');
const User = require('../model/userData');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use(cors());
router.use(express.json()); // Add this line to parse JSON requests

//Signup

router.post('/add', async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = new User({ name, email, password});
        const userSave = await user.save();
        return res.status(200).json({message:'Successfully Registered' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

//To get all users
router.get('/getUsers',async(req,res,next)=>{
    let users;
    try {
        users = await User.find()
    } catch (error) {
        return next(error)
    }
    if(!users){
        return res.status(500).json({message:"Unexpected Error Occured"})
    }
    return res.status(200).json({users})
})

//Login


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (user) {
            // Compare the provided password with the password stored in the database
            if (password === user.password) {
                let payload = { email: user.email, userId: user._id }; // Include other relevant information in the payload
                
                let userToken = jwt.sign(payload, 'TheaterBookingKey');
               
                res.status(200).send({ message: 'success', token:userToken,payload });
            } else {
                res.status(401).send({ message: 'Invalid password' });
            }
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

module.exports = router;

