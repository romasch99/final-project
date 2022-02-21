const API_URL = `${process.env.REACT_APP_BASE_URL}/customers`;


export class CustomerApi {
    
    static async getAll(token) {
        const res = await fetch(API_URL,
            {method: "GET", headers: {authorization: `Bearer ${token}`}}
        );

        return res.json();
    }
    
    static async getById(id, token) {
        const res = await fetch(`${API_URL}/id/${id}`,
            {method: "GET", headers: {authorization: `Bearer ${token}`}}
        );

        return res.json();
    }
    
    static async add(customer, token) {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(customer),
        });

        return res.json();
    }
        
    static async update(id, customer, token) {
        const res = await fetch(`${API_URL}/id/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(customer),
        });

        return res.json();
    }
    
    static async delete(id, token) {
        const res = await fetch(`${API_URL}/id/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        });

        return res.json();
    }

}
