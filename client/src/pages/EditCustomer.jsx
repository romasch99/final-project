import {useState} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {CustomerApi} from "../services/customers-api";
import {CustomerForm} from "../components/CustomerForm";
import {Card, CardHeader, CardContent, CardButton, CardItemSmall} from "../ui/atoms/CardElements"

export const EditCustomer = ({customer}) => {
    const {token} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();
    const customModel = location.state; 
    const [model, setModel] = useState(customModel);
    const onModelUpdate = (update) => setModel(update);
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!model.email || !model.name || !model.surname || !model.age) return;

        const res = await CustomerApi.update(id, model, token);

        if (res.errors) {
            setError(`${res.errors[0].msg}: ${res.errors[0].param}!`);
            // setModel(location.state)
            return;
        }
        setError(null);
        navigate("/");
    };
    
    return (
        <Card width = "80%">
            <CardHeader>Edit</CardHeader>
            <CardContent>
                <CustomerForm customer={customModel} onUpdate={onModelUpdate}></CustomerForm>
                <CardItemSmall>
                        <CardButton inputColor = {!model.email || !model.name || !model.surname || model.age<1 ? "#ebedef" : "#138d83d7"} inputWidht = "10%" type="submit" onClick={handleSubmit} disabled={!model.email || !model.name || !model.surname || model.age<1} >Save</CardButton>
                    </CardItemSmall>
                    <CardItemSmall> 
                        <p style={{color: "red"}}>{error}</p>
                    </CardItemSmall>
            </CardContent>
        </Card>
    );    
    
};
