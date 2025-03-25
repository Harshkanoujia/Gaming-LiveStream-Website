const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/gamingLiveStream"; // added a missing quote and a missing semicolon

const connectDb = async () => {
    try { 
        await mongoose.connect(URI);                                   
        console.log('Connection successful'); 
    } catch (error) { 
        console.error('Connection error:', error);
    }
};

connectDb(); 

