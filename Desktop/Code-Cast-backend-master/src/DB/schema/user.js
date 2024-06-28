const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken')
const Room = require('./room')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        immutable: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        minlength: 6
    },
    avatar: {
        type: String
    },
    editor: {
        language: {
            type: String,
            default: "javascript",
            trim: true,
        },
        theme: {
            type: String,
            default: 'vs-dark',
            trim: true,

        },
        fontSize: {
            type: Number,
            default: 14,
            trim: true,
        },
        fontFamily: {
            type: String,
            default: 'Fira Code',
            trim: true,
        },
        autoIndent: {
            type: Boolean,
            default: true,
        },
        formatOnSave: {
            type: Boolean,
            default: true,
        },
        minimap: {
            type: Boolean,
            default: true,
        },
        wordWrap: {
            type: String,
            default: "on",
        },
        tabSize: {
            type: Number,
            default: 4,
        },
        autoSuggestions: {
            type: Boolean,
            default: true,
        }

    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'room'
    }]
}, {
    timestamps: true
});


userSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;
    if (obj.password)
        delete obj.password
    return obj
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7 day' })
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('Wrong email or password')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('wrong email or password')
    return user
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.password) {
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 9)
        }
    }
    next()
})

//* use this only after joining the room collection
userSchema.pre('remove', async function (next) {
    const user = this
    await Room.deleteMany({ owner: user._id })
    next()
})


const User = mongoose.model('user', userSchema);

module.exports = User;