const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


const JWT_SECRET = '1234567890';

router.post('/signup', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(401).json({ message: 'A user has been already exists with this email' })
        }
        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(req.body.password, salt);

        let newRole;
        if (req.body.role === 'admin') {
            newRole = 'admin'
        }
        else {
            newRole = 'user'
        }

        user = await User({
            email: req.body.email,
            name: req.body.name,
            password: newPass,
            role: newRole
        })
        await user.save();

        const data = {
            user: {
                id: user.id
            }
        }
        const Authtoken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({ message: 'User has been created', user, Authtoken });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Sorry cannot create user' });
    }
})

router.post('/login', async (req, res) => {
    const { email, name, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Sorry you cannot access another Person Creditientials' })
        }

        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            return res.status(400).json({ message: 'Invalid Credientials' })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const AuthenticationToken = jwt.sign(data, JWT_SECRET);
        console.log(AuthenticationToken);
        res.status(200).json({ message: 'User has been Logged in Successfully', AuthenticationToken });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Sorry cannot create user' });
    }
})





module.exports = router