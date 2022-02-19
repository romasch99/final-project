import {useState, useEffect} from "react";
import {Field} from "../ui/molecules/Field";
import {Card, CardContent, CardItemSmall} from "../ui/atoms/CardElements"

export const CustomerForm = ({customer, onUpdate}) => {
    const [name, setName] = useState(customer.name);
    const [surname, setSurname] = useState(customer.surname);
    const [email, setEmail] = useState(customer.email);
    const [age, setAge] = useState(customer.age);
    
    const onNameChange = (e) => {
        setName(e.target.value);
    };
    const onSurnameChange = (e) => {
        setSurname(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onAgeChange = (e) => {
        setAge(e.target.value);
    };
    
    useEffect(() => {
        onUpdate({
            name,
            surname,
            email,
            age
        });
    }, [name, surname, email, age]);

    return (
        <Card width = "80%">
          
            <CardContent>
                <form>
                    <CardItemSmall>
                        <Field label= "Name:" onChange={onNameChange} name="name" type="text" placeholder="Jon" value={name} required />
                    </CardItemSmall>    
                    <CardItemSmall>
                        <Field label= "Surname:" onChange={onSurnameChange} name="surname" type="text" placeholder="Smith"  value={surname} required />
                    </CardItemSmall>    
                    <CardItemSmall>
                        <Field label= "Email:" onChange={onEmailChange} name="email" type="email" placeholder="email@email.com" value={email} required />
                    </CardItemSmall>    
                    <CardItemSmall>
                        <Field label= "Age:" onChange={onAgeChange} name="age" type="number" placeholder="123..." value={age ? age :''} required minLength={8} />
                    </CardItemSmall>
                </form>
            </CardContent>
        </Card>
    );    
    
};
