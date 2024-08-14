const { connectDB, closeConnectionDB } = require('../config/database');
const UserSeeder = require('../seeder/userSeeder');
const ProductSeeder = require('../seeder/productSeeder');
const DiscountSeeder = require('../seeder/discountSeeder');

const AllSeeder = async () => {
    await connectDB();
    await UserSeeder();
    await ProductSeeder();
    await DiscountSeeder();
    console.log('Seeding completed!');
    await closeConnectionDB();
}

AllSeeder();