const mongoose = require('mongoose');
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
 require("./db/conn");
const admin = require("firebase-admin");

const login = require("./models/login");
const { loginUser } = require('./loginController');
const Register = require("./models/logins");


const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../Public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(static_path)); 
app.use(express.static(path.join(__dirname, 'src')));


app.post("/login", loginUser);
app.set("view engine","hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);
app.use(express.static('public'));


app.get("/",(req, res) => {
    res.render("index")
});

app.get("/login",(req, res) => {
    res.render("login")
});

app.get("/signup",(req, res) => {
    res.render("signup")
});

//new user in db
app.post("/signup",async (req, res) => {
    try{
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send('All fields are required');
        }

         // Check if user already exists
        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

         // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const registerEmployee = new Register({
            username ,
            email ,
            password : hashedPassword
        });
        
        await registerEmployee.save();
        // res.json(userResponse);
        return res.redirect("/");

       } catch(error)
       {
        console.error('Error signing up user:', error);
         res.status(400).send(error);
       } 

});
/*
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        // Check if the user already exists
        const existingUser = await admin.auth().getUserByEmail(email);
       
        // Continue with user creation logic
        // ...
        console.log(req.body);
        const user = {
          email: req.body.email,
          password : req.body.password
        }
    
      if (existingUser) {
        // Email address already exists, handle the situation accordingly
        console.error('Email address already exists:', email);
        return res.status(400).send('Email address already exists');
      } else {
        // Create a new user
        const user = await admin.auth().createUser({
          email: email,
          password: password,
          // Other user data
        });
        // Handle success
        console.log('User created:', user);
        res.status(200).send('User created successfully');
      }
        const userResponse = await admin.auth().createUser({
          email : user.email,
          password: user.password,
          emailVerfied : false,
          disabled: false
      
          
        });
        res.json(userResponse);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});*/

app.get("/*",(req, res ) => {
  res.send("404 Error Page ");
});

app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});

