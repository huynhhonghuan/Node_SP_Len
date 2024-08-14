const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/nodejsfull');
        console.log('MongoDB Connected...');
    }
    catch (err) {
        console.error("MongoDB connection failed:" + err.message);
        process.exit(1);
    }
}

const closeConnectionDB = async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed...');
}

module.exports = { connectDB, closeConnectionDB };