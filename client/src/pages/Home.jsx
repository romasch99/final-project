import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {Customer} from "../components/customer";
import {CustomerApi} from "../services/customers-api";
import {BlockFlex} from "../ui/atoms/Block"
import {Field} from "../ui/molecules/Field";
import {Card, CardHeader, CardContent, CardButton, CardItemSmall} from "../ui/atoms/CardElements"

export const Home = () => {
    const {token} = useAuth();
    const navigate = useNavigate();
    const [customers, setCustomers] = useState();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState(null);
 
    const {state} = useLocation();
    
    const fetchCustomers = async () => {
        const res = await CustomerApi.getAll(token);
        setCustomers(res);
    };

    const addCustomer = (customer) => {
        setCustomers((prevState) => [...prevState, customer]);
    };
    
    const deleteCustomer = async (customId) => {
        try {
            const res = await CustomerApi.delete(customId);
            const {id} = res.deleted;
            
            setCustomers((prevState) => {
                console.log("deleteCustomer");
                console.log({state});
                console.log({prevState});
          
                return prevState.filter((customer) => customer.id !== id);
            });
        } catch (e) {
            console.error(e);
        }
    };

    
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Register');
        console.log(name, surname, email, age);
        if (!email || !name || !surname || !age) return;

        const res = await CustomerApi.add({name, surname, email, age}, token);
        console.log(res);
        console.log('Error: ' + res.err);
        if (res.err) {
            setError(res.err);
            return;
        }
        setError(null);
        navigate("/", {state: {added: res}});
    };
    
    useEffect(() => {
        fetchCustomers();
    }, []);
    
    useEffect(() => {
        if (!state) return;

        if (state.added) {
            addCustomer(state.added);
        }
    }, [state]);
    
    const renderedCustomers = !!customers
    ? customers.map((customer) => <Customer key={customer.id} customer={customer}  onDelete={() => {deleteCustomer(customer.id)}}/>)
    : null;
    
    const customersList = customers === null ? (
        <div>Loading...</div>
    ) : (
        <div className="list">
            <CardHeader>
                <div>customers List</div>
            </CardHeader>
                <BlockFlex>{renderedCustomers}</BlockFlex>
        </div>
    );
    
    return (
        <Card width = "80%">
            <CardHeader>Add</CardHeader>
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
                        <Field label= "Age:" onChange={onAgeChange} name="age" type="number" placeholder="123..." required minLength={8} />
                    </CardItemSmall>
                    <CardItemSmall>
                        <CardButton  inputColor = {!email || !name || !surname || !age ? "#ebedef" : "#138d83d7"} inputWidht = "10%" type="submit" disabled={!email || !name || !surname || !age}>Register</CardButton>
                    </CardItemSmall>
                    <CardItemSmall> 
                        <p style={{color: "red"}}>{error}</p>
                    </CardItemSmall>
                </form>
            </CardContent>
            {customersList}
        </Card>
    );    

};

