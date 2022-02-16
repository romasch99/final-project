import {useState} from "react";
import {AuthContext} from "../hooks/useAuth";
import {Auth} from "../services/auth-api";

const decodeToken = (token) => {
    if (!token) return null;

    const [, tokenPayload] = token.split(".");
    const decodedPayload = atob(tokenPayload);

    return JSON.parse(decodedPayload);
};

export const AuthProvider = ({children}) => {
    const token = sessionStorage.getItem("token");
    const decoded = decodeToken(token);

    const [state, setState] = useState({
        token,
        email: decoded ? decoded.email : null,
        error: null,
    });

    const login = async (user, password) => {
        const res = await Auth.login(user, password);

        if (res.err) {
            console.error(res.err);

            setState({error: res.err, token: null});

            return {error: res.err};
        }

        setState({error: null, token: res.token, email: decodeToken(res.token).email});
        sessionStorage.setItem("token", res.token);

        return {token: res.token};
    };

    const logout = () => {
        setState({
            token: null,
            error: null,
            email: null,
        });

        sessionStorage.removeItem("token");
    };

    const value = {...state, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
