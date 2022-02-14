import {tableCustomers} from "../database/create-tables.js";

export default class Customer {
    constructor({id, name, surname, email, age}){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.age = age;
    }
 
    static async all(connection) {
        try {
            
            const query = `
                SELECT id, name, surname, email, age FROM ${tableCustomers};
            `;
            const [data] = await connection.query(query, [id]);
            console.log(data);    
            return data;
            
        } catch (error) {
            console.log("Couldn't get all customers", error);
            throw error;
        }
    }
    
    static async create(connection, {name, surname, email, age}) {
        try {
            const query = `INSERT INTO ${tableCustomers} (name, surname, email, age) VALUES (?, ?, ?, ?);`; 
            const [{insertId}] = await connection.query(query, [name, surname, email, age]);
            
            return new Customer({id: insertId, name, surname, email, age});
        } catch (error) {
            console.log("Couldn't create customer", error);
            throw error;
        }
    }
    
    static async update(connection, {id, name, surname, email, age}) {
        
        try {
            
            const query = `UPDATE ${tableCustomers} SET name = ?, surname = ?, email = ?, age = ? WHERE id = ?;`;
            const [{affectedRows}] = await connection.query(query, [name, surname, email, age, id]);
            return !!affectedRows;
            
        } catch (error) {
            console.log("Couldn't update customer with id: ${id}", error);
            throw error;
        }
        
    }
    
    static async delete(connection, id) {
        try {
            
            const query =`DELETE FROM ${tableCustomers} WHERE id = ?`;
            const [{affectedRows}] = await connection.query(query, [id]);
            
            return !!affectedRows;
        } catch (error) {
            console.log("Couldn't delete customer with id: ${id}", error);
            throw error;
        }
            
    }
}