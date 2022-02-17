import {Router} from "express";
import {isLoggedIn} from "../middleware/isLoggedIn.js"
import { body, param, query } from "express-validator";
import {hash, compare} from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from "dotenv";
import {validateErrorsMidleware} from "../middleware/validateErrorsMidleware.js";
import {sendError} from "../utils/error.js";
import {idValidator} from "../utils/validators.js"
import User from "../models/User.js";

config();
const router = Router();

router.get("/", 
    // isLoggedIn,
    validateErrorsMidleware,        
    async (req, res) => {
        const { connection } = req.app;
        
        try {
            const users = await User.all(connection);
            
            res.status(200).send(users);
            
        } catch (error) {
            sendError(error, res);
        }

    }
);

router.post("/", 
    body(["name", "surname", "email", "password"], "Missing param").exists().notEmpty(),
    body(["name", "surname", "password"]).isString(),
    body(["email"]).isEmail(),
    validateErrorsMidleware,
    async (req, res) => {
        const { connection } = req.app;
        const {name, surname, email, password} = req.body;
        const hashed = await hash(password, 10);

        try {
            const user = await User.create(connection, {name, surname, email, password: hashed});

            res.status(200).send({user});
            
        } catch (error) {
            sendError(error, res);
        }
    });

router.post("/login", 
    body(["email", "password"], "Missing param").exists().notEmpty(),
    body(["email"]).isEmail(),
    validateErrorsMidleware,
    async (req, res) => {
        const { connection } = req.app;
        const {email, password} = req.body;
    
        try {
            const user = await User.oneByEmail(connection, email);
                
            if (!user) {
                return res.status(403).send({
                    error,
                });
            }
    
            const isValidPw = await compare(password, user.password);
    
            if (!isValidPw) {
                return res.status(403).send({
                    error: "Incorrect username or password",
                });
            }
    
            console.log(user);
    
            const token = jwt.sign({id: user.id, email: user.email}, process.env.TOKEN_SECRET);
    
            res.status(200).send({token,});
        } catch (error) {
            sendError(error, res);
        }
    });
    
router.put("/id/:id", 
    isLoggedIn,
    param("id").custom(idValidator).notEmpty(),
    body(["name", "surname", "email", "password"], "Missing param").exists().notEmpty(),
    body(["name", "surname"]).isString(),
    body(["email"]).isEmail(),
    validateErrorsMidleware,
    async (req, res) => {
        const { connection } = req.app;
        const id = Number(req.params.id);
        const {name, surname, email, password} = req.body;
        const hashed = await hash(password, 10);
        
        try {
            const affectedRows = await User.update(connection, {id, name, surname, email, password: hashed});
            
            if (!affectedRows) {
                return res.status(400).send({
                    error: `No user with id: ${id}`
                });
            }
            
            res.status(200).send({...req.body, id: id});
            
        } catch (error) {
            sendError(error, res);
        }
    });
 
router.delete("/id/:id", 
    isLoggedIn,
    param("id").custom(idValidator).notEmpty(),
    validateErrorsMidleware,   
    async (req, res) => {
    const { connection } = req.app;
    const id = Number(req.params.id);

    try {
        const affectedRows = await User.delete(connection, id);
        
        if (!affectedRows) {
            return res.status(400).send({
                error: `No user with id: ${id}`
            });
        }

        res.status(200).send({deleted: {id: id}});
        
    } catch (error) {
        sendError(error, res);
    }
});
    
export default router;
