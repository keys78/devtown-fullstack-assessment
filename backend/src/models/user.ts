import mongoose, { model, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from 'crypto'
import jwt from "jsonwebtoken"
import _ from "lodash"
import dns from 'dns'


interface User extends mongoose.Document {
    role: string;
    username: string;
    email: string;
    verified: boolean,
    password: string;
    resetPasswordToken: string,
    resetPasswordExpire: string,
    matchPasswords: (password: string) => Promise<boolean>;
    getSignedToken: () => string;
}


const userSchema = new Schema({
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    username: { type: String, required: true },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        validate: {
            validator: validateEmail,
            message: "Please provide a valid email"
        }
    },
    verified: { type: Boolean, default: false },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

async function validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
        return false;
    }

    const [username, domain] = email.split('@');

    // Check if the domain is valid using the DNS module
    return new Promise((resolve, reject) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err || addresses.length === 0) {
                reject(err || new Error('No MX records found for the domain.'));
            } else {
                resolve(true);
            }
        });
    });
}


userSchema.pre('save', function (next) {
    this.username = _.capitalize(this.username)
    next();
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.methods.getSignedToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    return token;
};

userSchema.methods.matchPasswords = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

export default model<User>("User", userSchema)