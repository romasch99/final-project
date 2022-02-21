import {useState, useEffect} from "react";
import {Field} from "../ui/molecules/Field";
import {Label} from "../ui/atoms/Label";
import {Select} from "../ui/atoms/Select";
import {Card, CardContent, CardItemSmall} from "../ui/atoms/CardElements";

export const CustomerForm = ({customer, shows, onUpdate}) => {
    const [name, setName] = useState(customer.name);
    const [surname, setSurname] = useState(customer.surname);
    const [email, setEmail] = useState(customer.email);
    const [age, setAge] = useState(customer.age);
    const [show_id, setShowId] = useState(customer.show_id);
    
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
    
    const onShowIdChange = (e) => {
        setShowId(e.target.value);
    };
    
    useEffect(() => {
        onUpdate({
            name,
            surname,
            email,
            age,
            show_id
        });
    }, [name, surname, email, age, show_id]);

    
    const renderedShows = !!shows
        ? shows.map((show) => (
            <option key={show.id} value={show.id} selected = {show.title === customer.title ? "selected" : ""}>
                {show.title} 
            </option>
        )) : null;
        
    return (
        <Card width = "80%">
            <CardContent>
                <form>
                    <CardItemSmall>
                        <Field label= "Name:" onChange={onNameChange} name="name" type="text" placeholder="Jon" value={name} required fontSize="12px"/>
                    </CardItemSmall>    
                    <CardItemSmall>
                        <Field label= "Surname:" onChange={onSurnameChange} name="surname" type="text" placeholder="Smith"  value={surname} required  fontSize="12px"/>
                    </CardItemSmall>    
                    <CardItemSmall>
                        <Field label= "Email:" onChange={onEmailChange} name="email" type="email" placeholder="email@email.com" value={email} required  fontSize="12px"/>
                    </CardItemSmall>    
                    <CardItemSmall>
                        <Field label= "Age:" onChange={onAgeChange} name="age" type="number" placeholder="123..." value={age ? age :''} required minLength={8} fontSize="12px"/>
                    </CardItemSmall>
                    <CardItemSmall>
                        <Label name="show">Show:</Label>
                        <Select name="show_id" defaultValue="none" onChange={onShowIdChange}>
                            <option disabled>none</option>
                            {renderedShows}
                         </Select>    
                    </CardItemSmall>
                </form>
            </CardContent>
        </Card>
    );    
    
};
