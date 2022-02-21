import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {Customer} from "../components/Customer";
import {CustomerApi} from "../services/customers-api";
import {ShowApi} from "../services/shows-api";
import {BlockFlex} from "../ui/atoms/Block";
import {CustomerForm} from "../components/CustomerForm";
import {Card, CardHeader, CardContent, CardButton, CardItemSmall} from "../ui/atoms/CardElements";

export const Home = () => {
    const {token} = useAuth();
    const navigate = useNavigate();
    const [customers, setCustomers] = useState();
    const customModel = {name: "", surname: "", email: "", age: 0, show_id: null} 
    const [model, setModel] = useState(customModel);
    const onModelUpdate = (update) => setModel(update);
    const [shows, setShows] = useState();
    
    const [error, setError] = useState(null);
 
    const {state} = useLocation();
    
    const fetchCustomers = async () => {
        const res = await CustomerApi.getAll(token);
        setCustomers(res);
    };
    
    const fetchShows = async () => {
        const res = await ShowApi.getAll(token);
        
        setShows(res);
    };

    const addCustomer = (customer) => {
        setCustomers((prevState) => [...prevState, customer]);
    };
    
    const editCustomer = (customer) => {
        navigate(`/edit-customer/${customer.id}`, {state: customer});
    }
    
    const deleteCustomer = async (customId) => {
        try {
            const res = await CustomerApi.delete(customId, token);
            const {id} = res.deleted;
            
            setCustomers((prevState) => {
                // console.log("deleteCustomer");
                // console.log({state});
                // console.log({prevState});
          
                return prevState.filter((customer) => customer.id !== id);
            });
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // console.log('Add customer');
        // console.log(model.name, model.surname, model.email, model.age, model.show_id);
        if (!model.email || !model.name || !model.surname || !model.age) return;

        const res = await CustomerApi.add(model, token);
        // console.log('Error: ' + res.errors);
        if (res.errors) {
            setError(`${res.errors[0].msg}: ${res.errors[0].param}!`);
            return;
        }
        setError(null);
        
        const {customer} = res;
        const [custm] = await CustomerApi.getById(customer.id, token);

        navigate("/", {state: {added: custm}});
    };
    
    useEffect(() => {
        fetchCustomers();
        fetchShows();
    },[] );
    
    useEffect(() => {
        // console.log('useEffect state:');
        // console.log({state});
        if (!state) return;

        if (state.added) {
            addCustomer(state.added);
        }
    }, [state]);
    
    const renderedCustomers = !!customers
    ? customers.map((customer) => <Customer key={customer.id} customer={customer} onEdit = {() => {editCustomer(customer)}} onDelete={() => {deleteCustomer(customer.id)}}/>)
    : null;
    
    const customersList = customers === null ? (
        <div>Loading...</div>
    ) : (
        <div className="list">
            <CardHeader>
                <div>Customers List</div>
            </CardHeader>
                <BlockFlex>{renderedCustomers}</BlockFlex>
        </div>
    );
    
    return (
        <Card width = "80%">
            <CardHeader>Add customer</CardHeader>
            <CardContent>
                <CustomerForm customer={customModel} shows={shows} onUpdate={onModelUpdate}></CustomerForm>
                <CardItemSmall>
                    <CardButton inputColor = {!model.email || !model.name || !model.surname || model.age<1 ? "#ebedef" : "#138d83d7"} inputWidht = "10%" type="submit" onClick={handleSubmit} disabled={!model.email || !model.name || !model.surname || model.age<1} inputMarginTop="0.5rem">Add</CardButton>
                    </CardItemSmall>
                    <CardItemSmall> 
                        <p style={{color: "red"}}>{error}</p>
                    </CardItemSmall>
            </CardContent>
            {customersList}
        </Card>
    );    

};

