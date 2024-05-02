const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/registration"; // added a missing quote and a missing semicolon

const connectDb = async () => {
    try { 
        await mongoose.connect(URI);                                   
        console.log('Connection successful'); // corrected console.log message
    } catch (error) { // corrected catch block syntax
        console.error('Connection error:', error);
        process.exit(0);
    }
};

connectDb(); // call the function to initiate the connection

