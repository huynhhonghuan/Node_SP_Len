require('dotenv').config();
const PORT = process.env.PORT || 4000;
const express = require('express');
const path = require('path');
const cors = require('cors');
const { connectDB } = require('./config/database.js');
const cookieParser = require('cookie-parser');
const moment = require('moment-timezone');

const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
const productRouter = require('./routes/product.js');
const discountRouter = require('./routes/discount.js');
const chatRouter = require('./routes/chat.js');
const comboProductRouter = require('./routes/comboProduct.js');
const orderRouter = require('./routes/order.js');
const imageRouter = require('./routes/image.js');
const chartRouter = require('./routes/chart.js');
const chatBotRouter = require('./routes/chatbot.js');
const qrCodeRouter = require('./routes/qrcode.js');

const app = express();

// Cài đặt múi giờ mặc định là giờ Việt Nam
moment.tz.setDefault('Asia/Ho_Chi_Minh');

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

// Cookie Parser
app.use(cookieParser(process.env.JWT_SECRET_PRODUCTION));

// Cấu hình để phục vụ các tệp tĩnh từ thư mục 'assets'
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/discount', discountRouter);
app.use('/order', orderRouter);
app.use('/chat', chatRouter);
app.use('/comboproduct', comboProductRouter);
app.use('/image', imageRouter);
app.use('/statistical', chartRouter);
app.use('/chatbot', chatBotRouter);
app.use('/payment', qrCodeRouter);

app.listen(PORT, '0.0.0.0', (error) => {
    if (!error) {
        console.log("Server listening on port " + PORT);
    } else {
        console.log("Error in starting server on port " + PORT);
    }
});
