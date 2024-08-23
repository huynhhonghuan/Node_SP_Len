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
        enum: ['customer', 'admin', 'staff'], // quản trị viên, admin, nhân viên
        default: 'customer' // Default role is 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    address: [
        {
            phone: {
                type: String,
                required: [true, "Vui lòng cung cấp số điện thoại!"],
                validate: {
                    validator: validatorJs.isMobilePhone,
                    message: '{VALUE} phải là số điện thoại hợp lệ!'
                }
            },
            city: {
                type: Number,
                required: [true, "Vui lòng cung cấp tỉnh/thành phố!"],
            },
            district: {
                type: Number,
                required: [true, "Vui lòng cung cấp quận/huyện!"],
            },
            ward: {
                type: Number,
                required: [true, "Vui lòng cung cấp phườnng/xã!"],
            },
            street: {
                type: String,
                required: [true, "Vui lòng cung cấp đường phố!"],
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
    ]
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
    if (update.password) {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
        this.setUpdate(update);
    }
    next();
});

// Compare password
userSchema.methods.comparePassword = async function (canditatePassword) {  // we can check this in controller but this better for better SOLID
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

// Export the User model
module.exports = mongoose.model('User', userSchema);