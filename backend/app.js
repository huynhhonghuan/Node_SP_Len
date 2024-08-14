require('dotenv').config();
const PORT = process.env.PORT || 4000;
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
const cookieParser = require('cookie-parser');
const moment = require('moment-timezone');

const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
const productRouter = require('./routes/product.js');

const app = express();

// Cài đặt múi giờ mặc định là giờ Việt Nam
moment.tz.setDefault('Asia/Ho_Chi_Minh');

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

// Cookie Parser
app.use(cookieParser(process.env.JWT_SECRET_PRODUCTION));

// Routes
app.use('/auth', authRouter);

app.use('/user', userRouter);

app.use('/product', productRouter);

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server listening on port " + PORT);
    } else {
        console.log("Error in starting server on port " + PORT);
    }
});