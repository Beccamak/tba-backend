import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from "validator";

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "Please provide your first name"],
        maxlength: 20,
        minlength: 5
    },
    lastName:{
        type: String,
        required: [true, "Please provide your last name"],
        maxlength:20,
        minlength:5
    },
    email:{
        type: String,
        required: [true, "Please provide your email address"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email address"
        }

    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.comparePassword = async function (InputtedPassword) {
    console.log("input",InputtedPassword, "this", this.password);
    const isMatch = await bcrypt.compare(InputtedPassword, this.password)
    return isMatch
}

const User = mongoose.model('User', UserSchema);
export default User;
