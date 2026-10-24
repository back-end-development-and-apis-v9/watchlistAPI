import express from "express";
import {findByUsername} from "../utils/db.js"
import bycript from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/login", async (req, res)=>{
    
    const {username, password} = req.body ?? {};

    if(!username || !password){
        return res.status(400).json({error: "Invalid credentials."})
    }

    const user = findByUsername(username);
    if(!user){
        return res.status(401).json({error: "Invalid user."})
    }

    const passCompare = await bycript.compare(password, user.passwordHash);
    if(!passCompare){
        return res.status(401).json({error: "Wrong password."});
    }

    const token = jwt.sign( { id: user.id, username: user.username, role: user.role },
                            process.env.JWT_SECRET, 
                            {expiresIn: "1d"}
                        );
    return res.status(200).json({message: "Login successfully", token});

})

export default router;