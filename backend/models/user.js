const mongoose = require('mongoose');
const validatorJs = require('validator');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Vui lòng cung cấp tên!"],
        minlength: [3, "Tên phải có ít nhất 3 kí tự!"],
        maxlength: [50, "Tên chỉ được từ 3 đến 50 kí tự!"]
    },
    email: {
        type: String,
        required: [true, "Vui lòng cung cấp email!"],
        unique: true,
        validate: {
            validator: validatorJs.isEmail,
            message: '{VALUE} phải là một email hợp lệ!'
        }
    },
    phone: {
        type: String,
        required: [true, "Vui lòng cung cấp số điện thoại!"],
        unique: true,
        validate: {
            validator: validatorJs.isMobilePhone,
            message: '{VALUE} phải là số điện thoại hợp lệ!'
        }
    },
    password: {
        type: String,
        required: [true, "Vui lòng cung cấp mật khẩu!"],
        minlength: [8, "Mật khẩu phải có ít nhất 8 kí tự!"],
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'staff', 'shipper'], // quản trị viên, admin, nhân viên
        default: 'customer' // Default role is 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    addresses: {
        type: [
            {
                phone: {
                    type: String,
                    validate: {
                        validator: validatorJs.isMobilePhone,
                        message: '{VALUE} phải là số điện thoại hợp lệ!'
                    }
                },
                city: {
                    type: String,
                },
                district: {
                    type: String,
                },
                ward: {
                    type: String,
                },
                street: {
                    type: String,
                },
                type: {
                    type: String,
                    enum: ['home', 'office', 'other'],
                    default: 'home' // Default type is 'home'
                },
                note: {
                    type: String,
                    maxlength: [200, "Ghi chú phải từ 0 đến 200 kí tự!"]
                },
                default: {
                    type: Boolean,
                    default: false // Default is false
                }
            }
        ],
        default: [] // Default is an empty array
    }

}, { timestamps: true });

// Hash password before saving to database
// Middleware cho save()
userSchema.pre('save', async function () {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Middleware cho findOneAndUpdate()
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    // Kiểm tra xem có trường password trong update và không phải là mật khẩu đã được băm
    if (update.password && update.password.length < 60) { // Sử dụng độ dài băm để kiểm tra
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
        this.setUpdate(update);
    }

    next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // So sánh mật khẩu được cung cấp với mật khẩu đã mã hóa của người dùng
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

// Export the User model
module.exports = mongoose.model('User', userSchema);