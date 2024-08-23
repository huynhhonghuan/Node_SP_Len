const { connectDB, closeConnectionDB } = require('../config/database');
const UserSeeder = require('./userSeeder');
const ProductSeeder = require('./productSeeder');
const DiscountSeeder = require('./discountSeeder');

const AllSeeder = async () => {
    await connectDB();
    await UserSeeder(10);
    await ProductSeeder(10);
    await DiscountSeeder(2);
    console.log('Seeding completed!');
    await closeConnectionDB();
}

AllSeeder();