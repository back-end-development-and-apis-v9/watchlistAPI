import jwt from "jsonwebtoken"

export function authenticate(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "No token provided."});
    }

    let token = authHeader.split(" ")[1];
    let payload;

    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({error: "Invalid or expired token."});
    }

    req.user = payload;
    next();
}