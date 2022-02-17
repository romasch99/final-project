import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {Field} from "../ui/molecules/Field";
import {Card, CardHeader, CardContent, CardButton, CardItemSmall} from "../ui/atoms/CardElements";

export const Login = () => {
    const navigate = useNavigate();
    const {login, error} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;

        console.log('Login');
        console.log(email, password);
        const res = await login(email, password);

        console.log(res);
        console.log('Error: ' + res.err);
        if (res.err) {
            return;
        }

        navigate("/");
    };

    return (
        <Card width = "80%">
            <CardHeader>Login</CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <CardItemSmall>
                        <Field label= "Email:" onChange={onEmailChange} name="email" type="email" placeholder="email@email.com" required />
                    </CardItemSmall>    
                    <CardItemSmall>
                        <Field label= "Password:" onChange={onPasswordChange} name="password" type="password" placeholder="password" required minLength={8} />
                    </CardItemSmall>
                    <CardItemSmall>
                        <CardButton inputColor = {!email || !password ? "#ebedef" : "#138d83d7"} inputWidht = "10%" type="submit" disabled={!email || !password}>Login</CardButton>
                    </CardItemSmall>
                    <CardItemSmall> 
                        <p style={{color: "red"}}>{error}</p>
                    </CardItemSmall>
                </form>
            </CardContent>
        </Card>
    );
};
