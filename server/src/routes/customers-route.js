import {Router} from "express";
// import {isLoggedIn} from "../middleware/isLoggedIn.js"
import { body, param, query } from "express-validator";
import {validateErrorsMidleware} from "../middleware/validateErrorsMidleware.js";
import {sendError} from "../utils/error.js";
import Customer from "../models/Customer.js"

const router = Router();

router.get("/", 
    // isLoggedIn,
    validateErrorsMidleware,        
    async (req, res) => {
        const { connection } = req.app;
        
        try {
            const customers = await Customer.all(connection, id);
            
            res.status(200).send(customers);
            
        } catch (error) {
            sendError(error, res);
        }

    }
);

router.post("/", 
    // isLoggedIn,
    body(["name", "surname", "email", "age"], "Missing param").exists().notEmpty(),
    body(["name", "surname"]).isString(),
    body(["email"]).isEmail(),
    body("age").isFloat(),
    validateErrorsMidleware,
    async (req, res) => {
        const { connection } = req.app;
        const {name, surname, email, age} = req.body;

        try {
            const customer = await Customer.create(connection, {name, surname, email, age});

            res.status(200).send({customer});
            
        } catch (error) {
            sendError(error, res);
        }
    });

    router.put("/id/:id", 
    // isLoggedIn,
    param("id").custom(idValidator).notEmpty(),
    body(["name", "surname", "email", "age"], "Missing param").exists().notEmpty(),
    body(["name", "surname"]).isString(),
    body(["email"]).isEmail(),
    body("age").isFloat(),
    validateErrorsMidleware,
    async (req, res) => {
        const { connection } = req.app;
        const id = Number(req.params.id);
        const {name, surname, email, age} = req.body;

        try {
            const affectedRows = await Customer.update(connection, {id, name, surname, email, age});
            
            if (!affectedRows) {
                return res.status(400).send({
                    error: `No customer with id: ${id}`
                });
            }
            
            res.status(200).send({...req.body, id: id});
            
        } catch (error) {
            sendError(error, res);
        }
    });
    
router.delete("/id/:id", 
// isLoggedIn,
param("id").custom(idValidator).notEmpty(),
validateErrorsMidleware,   
async (req, res) => {
    const { connection } = req.app;
    const id = Number(req.params.id);

    try {
        const affectedRows = await Customer.delete(connection, id);
        
        if (!affectedRows) {
            return res.status(400).send({
                error: `No customer with id: ${id}`
            });
        }

        res.status(200).send({...req.body, id: id});
        
    } catch (error) {
        sendError(error, res);
    }
});

    
export default router;
