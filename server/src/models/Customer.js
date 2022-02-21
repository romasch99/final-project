import {tableCustomers} from "../database/create-tables.js";
import {tableShows} from "../database/create-tables.js"

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
                SELECT c.name, c.surname, c.email, c.age, s.description, DATE_FORMAT(s.show_date, "%Y-%m-%d %H-%i") as date FROM ${tableCustomers} c
                Left JOIN ${tableShows} s ON c.show_id = s.id;
            `;
            const [data] = await connection.query(query);
            console.log(data);    
            return data;
            
        } catch (error) {
            console.log("Couldn't get all customers", error);
            throw error;
        }
    }
    
    static async create(connection, {name, surname, email, age, show_id}) {
        try {
            const query = `INSERT INTO ${tableCustomers} (name, surname, email, age, show_id) VALUES (?, ?, ?, ?, ?);`; 
            const [{insertId}] = await connection.query(query, [name, surname, email, age, show_id]);
            
            return new Customer({id: insertId, name, surname, email, age, show_id});
        } catch (error) {
            console.log("Couldn't create customer", error);
            throw error;
        }
    }
    
    static async update(connection, {id, name, surname, email, age, show_id}) {
        
        try {
            
            const query = `UPDATE ${tableCustomers} SET name = ?, surname = ?, email = ?, age = ?, show_id = ? WHERE id = ?;`;
            const [{affectedRows}] = await connection.query(query, [name, surname, email, age, show_id, id]);
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