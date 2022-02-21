import {Router} from "express";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import { body, param, query } from "express-validator";
import {validateErrorsMidleware} from "../middleware/validateErrorsMidleware.js";
import {sendError} from "../utils/error.js";
import {idValidator} from "../utils/validators.js";
import Show from "../models/Show.js";

const router = Router();
    
router.get("/", 
    isLoggedIn,
    validateErrorsMidleware,        
    async (req, res) => {
        const { connection } = req.app;
        
        try {
            const shows = await Show.all(connection);
            
            res.status(200).send(shows);
            
        } catch (error) {
            sendError(error, res);
        }

    }
);

router.post("/", 
    isLoggedIn,
    body(["title", "description", "show_date"], "Missing param").exists().notEmpty(),
    body(["title", "description"]).isString(),
    validateErrorsMidleware,
    async (req, res) => {
        const { connection } = req.app;
        const {title, description, show_date} = req.body;

        try {
            const show = await Show.create(connection, {title, description, show_date});

            res.status(200).send({show});
            
        } catch (error) {
            sendError(error, res);
        }
    });

router.put("/id/:id", 
    isLoggedIn,
    param("id").custom(idValidator).notEmpty(),
    body(["title", "description", "show_date"], "Missing param").exists().notEmpty(),
    body(["title", "description"]).isString(),
    validateErrorsMidleware,
    async (req, res) => {
        const { connection } = req.app;
        const id = Number(req.params.id);
        const {title, description, show_date} = req.body;

        try {
            const affectedRows = await Show.update(connection, {id, title, description, show_date});
            
            if (!affectedRows) {
                return res.status(400).send({
                    error: `No show with id: ${id}`
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
            const affectedRows = await Show.delete(connection, id);
            
            if (!affectedRows) {
                return res.status(400).send({
                    error: `No show with id: ${id}`
                });
            }

            res.status(200).send({deleted: {id: id}});
            
        } catch (error) {
            sendError(error, res);
        }
});
    

export default router;
