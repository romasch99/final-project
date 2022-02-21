const API_URL = `${process.env.REACT_APP_BASE_URL}/shows`;

export class ShowApi {

    static async getAll(token) {
        const res = await fetch(API_URL,
            {method: "GET", headers: {authorization: `Bearer ${token}`}}
        );

        return res.json();
    }
    
    static async add(show, token) {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(show),
        });

        return res.json();
    }
        
    static async update(id, show, token) {
        const res = await fetch(`${API_URL}/id/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(show),
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
