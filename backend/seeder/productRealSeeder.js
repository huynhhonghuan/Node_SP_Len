const mongoose = require('mongoose');
const faker = require('faker');
const Product = require('../models/product');
const User = require('../models/user');
const connectDB = require('../config/database');

// Hàm xóa tất cả sản phẩm cũ
const deleteAllProduct = async () => {
    await Product.deleteMany({});
    console.log('Tất cả sản phẩm đã xóa!');
};

// Lấy danh sách ngẫu nhiên userId từ User collection
const getRandomUsers = async () => {
    const users = await User.find({}, '_id'); // Chỉ lấy _id của users
    return users.map(user => user._id); // Trả về danh sách userId
};

// Thêm sản phẩm từ biến `data` với comment ngẫu nhiên
const createProductsWithComments = async (data) => {
    const userIds = await getRandomUsers(); // Lấy danh sách tất cả userId

    for (const item of data) {
        // Tạo comment ngẫu nhiên với userId
        const comments = [];
        const numComments = faker.datatype.number({ min: 1, max: 2 }); // Ngẫu nhiên 1-2 comment
        for (let i = 0; i < numComments; i++) {
            const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
            comments.push({
                userId: randomUserId,
                content: faker.lorem.sentence(),
                createdAt: faker.date.recent(),
            });
        }

        // Tạo sản phẩm
        const product = new Product({
            name: item.name,
            description: item.description,
            image: item.image,
            type: item.type,
            note: item.note,
            options: item.options,
            comments: comments, // Thêm comment vào sản phẩm
        });

        await Product.create(product);
    }

    console.log(`${data.length} sản phẩm đã được thêm với comment!`);
};

module.exports = ProductSeeder = async () => {
    await deleteAllProduct();
    await createProductsWithComments([
        {
            name: "HOA ĐẦU THÚ",
            description: "Đa dạng mẫu mã tặng được nhiều dịp",
            image: 'assets/images/1.jpg',
            type: "product",
            note: "",
            options: [
                {
                    image: 'assets/images/1.1.jpg',
                    quantity: 20,
                    price: 60000,
                },
                {
                    image: 'assets/images/1.2.jpg',
                    quantity: 20,
                    price: 80000,
                },
                {
                    image: 'assets/images/1.3.jpg',
                    quantity: 20,
                    price: 75000,
                },
            ],
        },
        {
            name: "MÓC KHOÁ ĐẦU THÚ",
            description: "Mẫu mã dễ thương",
            image: 'assets/images/2.jpg',
            type: "product",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/2.1.jpg',
                    quantity: 20,
                    price: 50000,
                },
                {
                    image: 'assets/images/2.2.jpg',
                    quantity: 10,
                    price: 90000,
                },
                {
                    image: 'assets/images/2.3.jpg',
                    quantity: 10,
                    price: 90000,
                },
            ],
        },
        {
            name: "BÓ HOA 1 BÔNG",
            description: "Tặng người thân bạn bè nhiều dịp trong năm",
            image: 'assets/images/3.jpg',
            type: "product",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/3.1.jpg',
                    quantity: 10,
                    price: 50000,
                },
                {
                    image: 'assets/images/3.2.jpg',
                    quantity: 10,
                    price: 50000,
                },
                {
                    image: 'assets/images/3.3.jpg',
                    quantity: 20,
                    price: 45000,
                },
                {
                    image: 'assets/images/3.4.jpg',
                    quantity: 20,
                    price: 45000,
                },
            ],
        },
        {
            name: "LEN MILK COTTON( MILK BÒ 50G)",
            description: "Dòng len milk bò giá thành rẻ phù hợp móc hoa và móc thú dành cho người mới bắt đầu",
            image: 'assets/images/4.jpg',
            type: "wool",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/4.1.jpg',
                    quantity: 50,
                    price: 8000,
                },
                {
                    image: 'assets/images/4.2.jpg',
                    quantity: 50,
                    price: 8000,
                },
                {
                    image: 'assets/images/4.3.jpg',
                    quantity: 50,
                    price: 8000,
                },
                {
                    image: 'assets/images/4.4.jpg',
                    quantity: 50,
                    price: 8000,
                },
                {
                    image: 'assets/images/4.5.jpg',
                    quantity: 50,
                    price: 8000,
                },
                {
                    image: 'assets/images/4.6.jpg',
                    quantity: 50,
                    price: 8000,
                },
                {
                    image: 'assets/images/4.7.jpg',
                    quantity: 50,
                    price: 8000,
                },
                {
                    image: 'assets/images/4.8.jpg',
                    quantity: 50,
                    price: 8000,
                },
                {
                    image: 'assets/images/4.9.jpg',
                    quantity: 50,
                    price: 8000,
                },
            ],
        },
        {
            name: "LEN MILK COTTON (MÁC ĐEN 50G)",
            description: "Dòng len milk bò giá thành rẻ phù hợp móc hoa và móc thú dành cho người mới bắt đầu",
            image: 'assets/images/5.jpg',
            type: "wool",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/5.1.jpg',
                    quantity: 50,
                    price: 7500,
                },
                {
                    image: 'assets/images/5.2.jpg',
                    quantity: 50,
                    price: 7500,
                },
                {
                    image: 'assets/images/5.3.jpg',
                    quantity: 50,
                    price: 7500,
                },
                {
                    image: 'assets/images/5.4.jpg',
                    quantity: 50,
                    price: 7500,
                },
                {
                    image: 'assets/images/5.5.jpg',
                    quantity: 50,
                    price: 7500,
                },
                {
                    image: 'assets/images/5.6.jpg',
                    quantity: 50,
                    price: 7500,
                },
                {
                    image: 'assets/images/5.7.jpg',
                    quantity: 50,
                    price: 7500,
                },
            ],
        },

        {
            name: "LEN NHUNG ĐŨA 100G",
            description: "Dòng len sợi to thích hợp làm túi, khăn choàng",
            image: 'assets/images/6.jpg',
            type: "wool",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/6.1.jpg',
                    quantity: 50,
                    price: 22000,
                },
                {
                    image: 'assets/images/6.2.jpg',
                    quantity: 50,
                    price: 22000,
                },
                {
                    image: 'assets/images/6.3.jpg',
                    quantity: 50,
                    price: 22000,
                },
                {
                    image: 'assets/images/6.4.jpg',
                    quantity: 50,
                    price: 22000,
                },
                {
                    image: 'assets/images/6.5.jpg',
                    quantity: 50,
                    price: 22000,
                },
                {
                    image: 'assets/images/6.6.jpg',
                    quantity: 50,
                    price: 22000,
                },
                {
                    image: 'assets/images/6.7.jpg',
                    quantity: 50,
                    price: 22000,
                },
                {
                    image: 'assets/images/6.8.jpg',
                    quantity: 50,
                    price: 22000,
                },
            ],
        },

        {
            name: "TÚI XÁCH LEN",
            description: "Dòng túi kẹp nách siêu dễ dùng cho khách nhà em ạ",
            image: 'assets/images/7.jpg',
            type: "product",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/7.1.jpg',
                    quantity: 5,
                    price: 250000,
                },
                {
                    image: 'assets/images/7.2.jpg',
                    quantity: 5,
                    price: 150000,
                },
                {
                    image: 'assets/images/7.3.jpg',
                    quantity: 5,
                    price: 150000,
                },

            ],
        },

        {
            name: "NHÀNH QUẤT -  CHẬU QUẤT CHƯNG TẾT",
            description: "Mẫu cây quất chưng tết siêu đẹp cho khách hàng, nhiều size cho khách dễ lựa chọn",
            image: 'assets/images/8.jpg',
            type: "product",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/8.1.jpg',
                    quantity: 30,
                    price: 200000,
                },
                {
                    image: 'assets/images/8.2.jpg',
                    quantity: 30,
                    price: 120000,
                },
                {
                    image: 'assets/images/8.3.jpg',
                    quantity: 30,
                    price: 50000,
                },
                {
                    image: 'assets/images/8.4.jpg',
                    quantity: 30,
                    price: 75000,
                },
                {
                    image: 'assets/images/8.5.jpg',
                    quantity: 30,
                    price: 150000,
                },
                {
                    image: 'assets/images/8.6.jpg',
                    quantity: 30,
                    price: 200000,
                },

            ],
        },

        {
            name: "MÓC KHOÁ BẠCH TUỘT CUTE",
            description: "Một số mẫu móc khoá bạch tuột nhỏ nhắn dễ thương",
            image: 'assets/images/9.jpg',
            type: "product",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/9.1.jpg',
                    quantity: 20,
                    price: 45000,
                },
                {
                    image: 'assets/images/9.2.jpg',
                    quantity: 20,
                    price: 45000,
                },
                {
                    image: 'assets/images/9.3.jpg',
                    quantity: 20,
                    price: 45000,
                },
                {
                    image: 'assets/images/9.4.jpg',
                    quantity: 30,
                    price: 75000,
                },
                {
                    image: 'assets/images/9.5.jpg',
                    quantity: 30,
                    price: 30000,
                },


            ],
        },


        {
            name: "BÓ HOA LỚN NHIỀU TONE",
            description: "Khi bạn muốn tìm một bó hoa lớn tặng kỉ niệm thật ý nghĩa thì Tiệm Nhà Len có những bó hoa siêu đẹp dành cho bạn",
            image: 'assets/images/10.jpg',
            type: "product",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/10.1.jpg',
                    quantity: 10,
                    price: 120000,
                },
                {
                    image: 'assets/images/10.2.jpg',
                    quantity: 10,
                    price: 200000,
                },
                {
                    image: 'assets/images/10.3.jpg',
                    quantity: 10,
                    price: 250000,
                },
                {
                    image: 'assets/images/10.4.jpg',
                    quantity: 10,
                    price: 200000,
                },
                {
                    image: 'assets/images/10.5.jpg',
                    quantity: 10,
                    price: 250000,
                },
                {
                    image: 'assets/images/10.6.jpg',
                    quantity: 10,
                    price: 250000,
                },


            ],
        },

        {
            name: "MÓC KHOÁ THỎ 7 MÀU ĐỘI NÓN LÁ",
            description: "Fan Thỏ 7 Màu thì không thể bỏ qua 2 mẫu thỏ 7 màu siêu đẹp nhà em nha",
            image: 'assets/images/11.jpg',
            type: "product",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/11.1.jpg',
                    quantity: 5,
                    price: 180000,
                },
                {
                    image: 'assets/images/11.2.jpg',
                    quantity: 5,
                    price: 150000,
                },
            ],
        },

        {
            name: "HOA TỐT NGHIỆP",
            description: "Một số mẫu hoa ứng dụng tặng lễ tốt nghiệp dành cho khách của Tiệm Nhà Len",
            image: 'assets/images/12.jpg',
            type: "product",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/12.1.jpg',
                    quantity: 20,
                    price: 120000,
                },
                {
                    image: 'assets/images/12.2.jpg',
                    quantity: 20,
                    price: 180000,
                },
                {
                    image: 'assets/images/12.3.jpg',
                    quantity: 20,
                    price: 60000,
                },
                {
                    image: 'assets/images/12.4.jpg',
                    quantity: 20,
                    price: 60000,
                },
                {
                    image: 'assets/images/12.5.jpg',
                    quantity: 20,
                    price: 90000,
                },
                {
                    image: 'assets/images/12.6.jpg',
                    quantity: 20,
                    price: 90000,
                },

                {
                    image: 'assets/images/12.7.jpg',
                    quantity: 20,
                    price: 90000,
                },
                {
                    image: 'assets/images/12.8.jpg',
                    quantity: 20,
                    price: 90000,
                },
            ],
        },

        {
            name: "KIM MÓC LEN 2 ĐẦU",
            description: "Một dòng kim móc 2 đầu dành cho các bạn mới tập móc với giá thành rẻ và tiện",
            image: 'assets/images/13.jpg',
            type: "tool",
            note: "Hàng mới về",
            options: [
                {
                    image: 'assets/images/13.1.jpg',
                    quantity: 50,
                    price: 10000,
                },
                {
                    image: 'assets/images/13.2.jpg',
                    quantity: 50,
                    price: 10000,
                },
                {
                    image: 'assets/images/13.3.jpg',
                    quantity: 50,
                    price: 10000,
                },

            ],
        },
    ]);
};
