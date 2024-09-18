import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticatedUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return next(new ErrorHandler("Please login to access this resource", 401));
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.id);

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong While Authenticating User"
        });
    }
};