// const compromise = require('compromise');
// const Product = require('../models/product');

// // Tạo một đối tượng lưu ngữ cảnh tạm thời cho các câu hỏi liên quan đến người dùng
// const userContext = {};

// const processQuestion = async (userId, question) => {
//     let response = '';
//     const doc = compromise(question);

//     // Kiểm tra loại câu hỏi dựa trên từ khóa
//     if (doc.has('mô tả')) {
//         const productName = userContext[userId]?.productName || doc.nouns().out('text');
//         if (!productName) return 'Vui lòng cung cấp tên sản phẩm để tôi có thể tìm mô tả cho bạn.';

//         console.log(productName);
//         const product = await Product.findOne({ name: productName });
//         response = product ? `Mô tả của ${product.name}: ${product.description}` : 'Không tìm thấy sản phẩm. Huan';
//         userContext[userId] = { productName };  // Cập nhật tên sản phẩm vào ngữ cảnh
//     } else if (doc.has('giá')) {
//         const productName = userContext[userId]?.productName || doc.nouns().out('text');
//         if (!productName) return 'Vui lòng cung cấp tên sản phẩm để tôi có thể tìm giá cho bạn.';

//         const product = await Product.findOne({ name: productName });
//         if (product && product.options.length > 0) {
//             response = `Giá của ${product.name} là ${product.options[0].price} VND.`;
//         } else {
//             response = 'Không tìm thấy sản phẩm hoặc sản phẩm không có tùy chọn giá.';
//         }
//         userContext[userId] = { productName };
//     } else if (doc.has('loại')) {
//         const productName = userContext[userId]?.productName || doc.nouns().out('text');
//         if (!productName) return 'Vui lòng cung cấp tên sản phẩm để tôi có thể tìm loại cho bạn.';

//         const product = await Product.findOne({ name: productName });
//         response = product ? `Loại sản phẩm ${product.name} là ${product.type}.` : 'Không tìm thấy sản phẩm.';
//         userContext[userId] = { productName };
//     } else if (doc.has('số lượng') || doc.has('bao nhiêu loại')) {
//         const productName = userContext[userId]?.productName || doc.nouns().out('text');
//         if (!productName) return 'Vui lòng cung cấp tên sản phẩm để tôi có thể tìm số lượng cho bạn.';

//         const product = await Product.findOne({ name: productName });
//         response = product ? `Sản phẩm ${product.name} có ${product.options.length} loại.` : 'Không tìm thấy sản phẩm.';
//         userContext[userId] = { productName };
//     } else {
//         response = 'Xin lỗi, tôi không hiểu câu hỏi của bạn.';
//     }

//     return response;
// }

// module.exports = { processQuestion };

// chatbotRepository.js

// const { Nlp } = require('@nlpjs/nlp');
// const fs = require('fs-extra'); // Thư viện fs-extra để làm việc với hệ thống tệp
// const path = require('path');
// const Product = require('../models/product'); // Đường dẫn đến mô hình Product

// // Đường dẫn đến tệp lưu mô hình
// const modelPath = path.join(__dirname, 'backend/assets/nlp_model.json');

// // Khởi tạo NlpManager
// const manager = new Nlp({ languages: ['vi'], forceNER: true });

// // Huấn luyện với các câu hỏi liên quan đến mô tả và giá sản phẩm
// manager.addDocument('vi', 'Mô tả của %product% là gì?', 'product.description');
// manager.addDocument('vi', 'Sản phẩm %product% có mô tả là gì?', 'product.description');
// manager.addDocument('vi', 'Giá của %product% là bao nhiêu?', 'product.price');

// // Câu trả lời cho các intent
// manager.addAnswer('vi', 'product.description', 'Đây là mô tả của sản phẩm: {{description}}');
// manager.addAnswer('vi', 'product.price', 'Giá của sản phẩm là {{price}} VND');

// // Hàm huấn luyện chatbot
// let isTrained = false;

// async function trainNlp() {
//     if (!isTrained) {
//         await manager.train();
//         console.log('NLP Manager đã được huấn luyện.'); // Log thông báo khi đã huấn luyện
//         isTrained = true; // Đánh dấu là đã huấn luyện
//         await saveModel(); // Lưu mô hình sau khi huấn luyện
//     }
// }

// // Hàm lưu mô hình vào tệp
// async function saveModel() {
//     await fs.ensureDir(path.dirname(modelPath)); // Đảm bảo thư mục lưu tồn tại
//     await manager.save(modelPath); // Lưu mô hình vào tệp
//     console.log('Mô hình NLP đã được lưu vào', modelPath);
// }

// // Hàm trả lời câu hỏi từ người dùng
// async function getAnswer(question) {
//     console.log(`Question: ${question}`); // Log câu hỏi để kiểm tra
//     await trainNlp(); // Đảm bảo mô hình được huấn luyện trước khi xử lý câu hỏi

//     const response = await manager.process('vi', question);
//     console.log('Response:', response); // Log phản hồi từ NLP
//     console.log('Entities:', response.entities); // Log entities
//     console.log('Intent:', response.intent); // Log intent

//     const productName = response.entities.find(e => e.entity === 'product')?.option;
//     console.log('Product Name:', productName); // Log tên sản phẩm để kiểm tra

//     const product = await Product.findOne({ name: productName }); // Tìm sản phẩm trong DB

//     if (response.intent === 'product.description' && product) {
//         return response.answer.replace('{{description}}', product.description);
//     } else if (response.intent === 'product.price' && product) {
//         return response.answer.replace('{{price}}', product.options[0].price);
//     } else {
//         return "Xin lỗi, tôi không hiểu câu hỏi của bạn.";
//     }
// }


// // Hàm tải mô hình từ tệp (nếu đã được lưu trước đó)
// async function loadModel() {
//     if (await fs.pathExists(modelPath)) {
//         await manager.load(modelPath);
//         console.log('Mô hình NLP đã được tải từ', modelPath);
//     }
// }

// // Gọi hàm tải mô hình khi khởi động
// loadModel();

// module.exports = { getAnswer };

const Product = require('../models/product');

// Lấy thông tin chi tiết của sản phẩm
const getProductDetails = async (productName) => {
    const product = await Product.findOne({ name: productName });
    return product ? {
        id: product._id,
        price: product.options.map(option => ({
            price: option.price,
        })),
        description: product.description,
        optionsCount: product.options.length, // Số lượng tùy chọn
        image: product.options.map(option => ({
            image: option.image,
        })),
    } : null;
};

// Lấy tất cả tên sản phẩm trong CSDL
const getProductNames = async () => {
    const products = await Product.find({}, 'name'); // Lấy tất cả tên sản phẩm
    return products.map(product => product.name);
};

// Tìm sản phẩm khớp mờ hoặc chính xác
const findMatchingProducts = (question, productNames) => {
    const lowerCaseQuestion = question.toLowerCase();

    // Ưu tiên khớp chính xác
    const exactMatch = productNames.filter(name => lowerCaseQuestion.includes(name.toLowerCase()));
    if (exactMatch.length > 0) return exactMatch;

    // Tìm khớp mờ dựa trên từ khóa quan trọng (sử dụng từ khóa phân tách)
    const keywords = lowerCaseQuestion.split(/\W+/).filter(word => word.length > 2);  // Loại bỏ các từ quá ngắn
    const partialMatches = productNames.filter(name =>
        keywords.some(keyword => name.toLowerCase().includes(keyword))
    );

    return partialMatches.length > 0 ? partialMatches : ['Không tìm thấy sản phẩm phù hợp'];
};


// Hàm trả lời câu hỏi
const getAnswer = async (question) => {
    const productNames = await getProductNames();
    const matchedProducts = findMatchingProducts(question, productNames);

    if (matchedProducts.length === 1) {
        const productDetails = await getProductDetails(matchedProducts[0]);

        if (productDetails) {
            const lowerCaseQuestion = question.toLowerCase();
            const productUrl = `http://localhost:3000/product-detail/${productDetails.id}`;

            if (lowerCaseQuestion.includes('mô tả') || lowerCaseQuestion.includes('thông tin')) {
                return `Mô tả của sản phẩm ${matchedProducts[0]} là: ${productDetails.description}. ${productUrl}`;
            } else if (lowerCaseQuestion.includes('giá')) {
                return `Giá của sản phẩm ${matchedProducts[0]} là:\n` +
                    productDetails.price.map((option, i) =>
                        `- Loại ${i + 1} có giá ${option.price}`).join('\n') +
                    ` ${productUrl}`;
            } else if (lowerCaseQuestion.includes('loại')) {
                return `Sản phẩm ${matchedProducts[0]} có ${productDetails.optionsCount} loại. ${productUrl}`;
            } else if (lowerCaseQuestion.includes('số lượng')) {
                const quantities = productDetails.price.map((option, i) =>
                    `- Loại ${i + 1} có số lượng ${option.quantity || 'không rõ'}`).join('\n');
                return `Số lượng sản phẩm ${matchedProducts[0]} là:\n${quantities} ${productUrl}`;
            } else if (lowerCaseQuestion.includes('ảnh') || lowerCaseQuestion.includes('hình')) {
                const imageUrl = productDetails.image.map(option => {
                    return `<img src="${option.image}" alt="Ảnh sản phẩm ${matchedProducts[0]}" style="max-width: 15%; height: auto; margin-right: 10px;">`;
                }).join('');
                return `Ảnh sản phẩm:\n${imageUrl} ${productUrl}`;
            } else if (lowerCaseQuestion.includes('ghi chú')) {
                return productDetails.note
                    ? `Ghi chú của sản phẩm ${matchedProducts[0]}: ${productDetails.note} ${productUrl}`
                    : `Sản phẩm ${matchedProducts[0]} hiện không có ghi chú nào. ${productUrl}`;
            } else {
                return 'Xin lỗi, tôi không hiểu câu hỏi của bạn.';
            }
        } else {
            return `"${matchedProducts[0]}".`;
        }
    } else if (matchedProducts.length > 1) {
        return `Tìm thấy nhiều sản phẩm khớp với câu hỏi của bạn: ${matchedProducts.join(', ')}. Vui lòng cung cấp tên chính xác của sản phẩm để tôi có thể giúp bạn.`;
    } else {
        return 'Không tìm thấy sản phẩm nào phù hợp. Vui lòng thử lại với câu hỏi khác hoặc kiểm tra lại từ khóa.';
    }
};

module.exports = { getAnswer };
