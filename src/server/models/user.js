const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @typedef User
 * @property {string} name.required - name of person making request - eg: Subhajit Manna
 * @property {integer} age - Age - eg: 30
 * @property {string} email.required - Email - eg: user@example.com
 * @property {string} phone.required - Phone - eg: 9876543210
 * @property {string} password.required - Password - eg: **
 * @property {Array.<string>} roles.required - Roles - eg: Admin,User
 * @property {Address.model} address - Address Street - eg: Lower Street
 */
/**
 * @typedef Address
 * @property {string} street - Street - eg: Lower Street
 * @property {string} city - City - eg: Kolkata
 * @property {string} state - State - eg: WB
 * @property {string} zip - Zip - eg: 700001 
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type: String,
        required: true,
        trim: true,

        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Invalid Mobile Number!!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    roles: [{
      type: String,
      required: true
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    address: {
      street: {
        type: String,
        required: false,
        trim: true
      },
      city: {
        type: String,
        required: false,
        trim: true
      },
      state: {
        type: String,
        required: false,
        trim: true
      },
      zip: {
        type: String,
        required: false,
        trim: true
      }
    }
}, {
    timestamps: true,
    versionKey: false
})


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {

    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'myseretkeysubha')

    user.tokens = user.tokens.concat({ token })

    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to find User')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Invalid Credential !!')
    }

    return user

}



//Hash the pian text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }
    if (!user.isModified('password')) return next();

    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User
