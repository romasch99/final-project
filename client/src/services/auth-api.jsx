const AUTH_URL = `${process.env.REACT_APP_BASE_URL}/users`;

export class Auth {
    static async register(name, surname, email, password) {
        const res = await fetch(`${AUTH_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, 
                surname,
                email,
                password,
            }),
        });

        return res.json();
    }

    static async login(email, password) {
        const res = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        return res.json();
    }
}
