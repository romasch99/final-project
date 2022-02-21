import {tableShows} from "../database/create-tables.js"

export default class Show {
    constructor({id, title, description, show_date}){
        this.id = id;
        this.title = title;
        this.description = description;
        this.show_date = show_date;
    }
 
    static async all(connection) {
        try {
            
            const query = `
                SELECT id, title, description, DATE_FORMAT(show_date, "%Y-%m-%d %H-%i") as date FROM ${tableShows}
            `;
            const [data] = await connection.query(query);
            console.log(data);    
            return data;
            
        } catch (error) {
            console.log("Couldn't get all shows", error);
            throw error;
        }
    }
    
    static async create(connection, {title, description, show_date}) {
        try {
            const query = `INSERT INTO ${tableShows} (title, description, show_date) VALUES (?, ?, ?);`; 
            const [{insertId}] = await connection.query(query, [title, description, show_date]);
            
            return new Show({id: insertId, title, description, show_date});
        } catch (error) {
            console.log("Couldn't create show", error);
            throw error;
        }
    }
        
    static async update(connection, {id, title, description, show_date}) {
        
        try {
            
            const query = `UPDATE ${tableShows} SET title = ?, description = ?, show_date = ? WHERE id = ?;`;
            const [{affectedRows}] = await connection.query(query, [title, description, show_date, id]);
            return !!affectedRows;
            
        } catch (error) {
            console.log("Couldn't update show with id: ${id}", error);
            throw error;
        }
    }
    
    static async delete(connection, id) {
        try {
            
            const query =`DELETE FROM ${tableShows} WHERE id = ?`;
            const [{affectedRows}] = await connection.query(query, [id]);
            
            return !!affectedRows;
        } catch (error) {
            console.log("Couldn't delete show with id: ${id}", error);
            throw error;
        }
    }
}