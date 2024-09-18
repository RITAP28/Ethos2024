import User from "../models/user.model.js"

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return next(new ErrorHandler("Please enter Name, Email and Password", 400));
        }
    
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new ErrorHandler("Email already exists", 400));
        }
    
        const user = await User.create({
            name,
            email,
            password,
        });
    
        if (!user) {
            return next(new ErrorHandler("Error Registering User, Try Again Later", 500));
        }

        const token = user.getJWTToken();

        res.status(200).json({
            success: true,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong While Registering User"
        });
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please enter Email and Password", 400));
        }
    
        const user = await User.findOne({ email, password });
    
        if (!user) {
            return next(new ErrorHandler("Invalid Credentials", 401));
        }
    
        const token = user.getJWTToken();

        res.status(200).json({
            success: true,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong While Logging In User"
        });
    }
}

export const fetchUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        console.log("called")

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong While Logging Out User"
        });
    }
}