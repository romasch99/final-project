import {tableUsers} from "../database/create-tables.js";

export default class User {
    constructor({id, name, surname, email, password}){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }
    
    static async all(connection) {
        try {
            
            const query = `
                SELECT id, name, surname, email FROM ${tableUsers} WHERE deleted IS NULL;
            `;
            const [data] = await connection.query(query);
            console.log(data);    
            return data;
            
        } catch (error) {
            console.log("Couldn't get all users", error);
            throw error;
        }
    }
    
    static async oneByEmail(connection, email) {
        try {
            const query = `SELECT * FROM ${tableUsers} WHERE email = ?`;
            const [data] = await connection.query(query, [email]);
            const [user] = data;

            if (!user) return null;

            return new User({...user});
        } catch (error) {
            console.log(`Couldn't get user with email: ${email}`, error);
            throw error;
        }
    }
    
    static async create(connection, {name, surname, email, password}) {
        try {
            const query = `INSERT INTO ${tableUsers} (name, surname, email, password) VALUES (?, ?, ?, ?);`; 
            const [{insertId}] = await connection.query(query, [name, surname, email, password]);
            
            return new User({id: insertId, name, surname, email, password});
        } catch (error) {
            console.log("Couldn't create user", error);
            throw error;
        }
    }
        
    static async update(connection, {id, name, surname, email, password}) {
        
        try {
            
            const query = `UPDATE ${tableUsers} SET name = ?, surname = ?, email = ?, password = ? WHERE id = ?;`;
            const [{affectedRows}] = await connection.query(query, [name, surname, email, password, id]);
            return !!affectedRows;
            
        } catch (error) {
            console.log("Couldn't update user with id: ${id}", error);
            throw error;
        }
        
    }
   
    static async delete(connection, id) {
        try {
            
            const query = `UPDATE ${tableUsers} SET deleted = NOW() WHERE id = ?;`;
            const [{affectedRows}] = await connection.query(query, [id]);
            
            return !!affectedRows;
        } catch (error) {
            console.log("Couldn't delete user with id: ${id}", error);
            throw error;
        }
            
    }
}
