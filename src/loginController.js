// loginController.js

const bcrypt = require('bcrypt');
const Register = require("./models/logins");

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        const user = await Register.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        res.send('Login successful');
        
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { loginUser };
