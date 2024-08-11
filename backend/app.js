require('dotenv').config();
const PORT = process.env.PORT || 4000;
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
const authRouter = require('./routes/auth.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Cookie Parser
app.use(cookieParser(process.env.JWT_SECRET));

// Routes
app.use('/auth', authRouter);




app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server listening on port " + PORT);
    } else {
        console.log("Error in starting server on port " + PORT);
    }
});