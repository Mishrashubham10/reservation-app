import jwt from "jsonwebtoken";

// VERIFYING USERS
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json({ message: "Not authorized" })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token is not valid" })

        req.user = user;
        next();
    })
}