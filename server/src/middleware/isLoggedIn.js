import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { send } from "process";
dotenv.config();

export const isLoggedIn = (req, res, next) => {
    const {authorization} = req.headers;
    const {TOKEN_SECRET} = process.env;

    if (!authorization) {
        console.log("No autorization")
        return res.status(403).send({error: "No autorization"});
    }

    const [, token] = authorization.split(" ");

    try {
        const parsed = jwt.verify(token, TOKEN_SECRET);
        req.token = parsed;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).send({
                error: error.message,
            });
        }
    }
};
