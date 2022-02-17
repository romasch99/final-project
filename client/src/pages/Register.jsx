import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Auth} from "../services/auth-api";
import {Field} from "../ui/molecules/Field";
import {Card, CardHeader, CardContent, CardButton, CardItemSmall} from "../ui/atoms/CardElements";

export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    
    const onNameChange = (e) => {
        setName(e.target.value);
    };
    const onSurnameChange = (e) => {
        setSurname(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Register');
        console.log(name, surname, email, password);
        if (!email || !password) return;

        const res = await Auth.register(name, surname, email, password);
        console.log(res);
        console.log('Error: ' + res.err);
        if (res.err) {
            setError(res.err);
            return;
        }
        setError(null);
        navigate("/login");
    };
   
    return (
        <Card width = "80%">
            <CardHeader>Register</CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <CardItemSmall>
                        <Field label= "Name:" onChange={onNameChange} name="name" type="text" placeholder="Jon" required />
                    </CardItemSmall>    
                    <CardItemSmall>
                        <Field label= "Surname:" onChange={onSurnameChange} name="surname" type="text" placeholder="Smith" required />
                    </CardItemSmall>    
                    <CardItemSmall>
                        <Field label= "Email:" onChange={onEmailChange} name="email" type="email" placeholder="email@email.com" required />
                    </CardItemSmall>    
                    <CardItemSmall>
                        <Field label= "Password:" onChange={onPasswordChange} name="password" type="password" placeholder="password" required minLength={8} />
                    </CardItemSmall>
                    <CardItemSmall>
                        <CardButton  inputColor = {!email || !password ? "#ebedef" : "#138d83d7"} inputWidht = "10%" type="submit" disabled={!email || !password}>Register</CardButton>
                    </CardItemSmall>
                    <CardItemSmall> 
                        <p style={{color: "red"}}>{error}</p>
                    </CardItemSmall>
                </form>
            </CardContent>
        </Card>
    );
};
