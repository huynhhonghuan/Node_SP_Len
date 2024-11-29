const { connectDB, closeConnectionDB } = require('../config/database');
const UserSeeder = require('./userSeeder');
const ProductSeeder = require('./productSeeder');
const DiscountSeeder = require('./discountSeeder');
const comboProductSeeder = require('./comboProductSeeder');
const productRealSeeder = require('./productRealSeeder.js');
const ChatSeeder = require('./chatSeeder');

const AllSeeder = async () => {
    await connectDB();
    await UserSeeder(10);
    await productRealSeeder();
    await ProductSeeder(30);
    await DiscountSeeder(9);
    await comboProductSeeder(7);
    // await ChatSeeder(5);
    console.log('Seeding completed!');
    await closeConnectionDB();
}

AllSeeder();