import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter your Name"],
        },
        email: {
            type: String,
            required: [true, "Please Enter your Email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please Enter your Password"],
        }
    },
    {
        timestamps: true
    }
)

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const User = mongoose.model("User", userSchema);
export default User;