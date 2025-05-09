const mongoose= require('mongoose');

const connectDB= async ()=>
{
    try {
        const connect= await mongoose.connect(process.env.CONNECTION_STRING);
        
        console.log("Connected to mongodb");
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

module.exports= connectDB;