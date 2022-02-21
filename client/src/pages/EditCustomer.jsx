import {useState, useEffect} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {CustomerApi} from "../services/customers-api";
import {ShowApi} from "../services/shows-api";
import {CustomerForm} from "../components/CustomerForm";
import {Card, CardHeader, CardContent, CardButton, CardItemSmall} from "../ui/atoms/CardElements";

export const EditCustomer = () => {
    const {token} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();
    const customModel = location.state; 
    const [model, setModel] = useState(customModel);
    const onModelUpdate = (update) => setModel(update);
    const [shows, setShows] = useState();
    const [error, setError] = useState(null);
    
    const fetchShows = async () => {
        const res = await ShowApi.getAll(token);
        
        setShows(res);
    };
    
    useEffect(() => {
        fetchShows();
    },[] );
    
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
                <CustomerForm customer={customModel} shows={shows} onUpdate={onModelUpdate}></CustomerForm>
                <CardItemSmall>
                        <CardButton inputColor = {!model.email || !model.name || !model.surname || model.age<1 ? "#ebedef" : "#138d83d7"} inputWidht = "10%" type="submit" onClick={handleSubmit} disabled={!model.email || !model.name || !model.surname || model.age<1} inputMarginTop="0.5rem">Save</CardButton>
                    </CardItemSmall>
                    <CardItemSmall> 
                        <p style={{color: "red"}}>{error}</p>
                    </CardItemSmall>
            </CardContent>
        </Card>
    );    
    
};
