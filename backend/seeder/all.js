const { connectDB, closeConnectionDB } = require('../config/database');
const UserSeeder = require('./userSeeder');
const ProductSeeder = require('./productSeeder');
const DiscountSeeder = require('./discountSeeder');
const comboProductSeeder = require('./comboProductSeeder');

const AllSeeder = async () => {
    await connectDB();
    await UserSeeder(10);
    await ProductSeeder(30);
    await DiscountSeeder(2);
    await comboProductSeeder(5);
    console.log('Seeding completed!');
    await closeConnectionDB();
}

AllSeeder();