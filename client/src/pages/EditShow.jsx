import {useState} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {ShowApi} from "../services/shows-api";
import {ShowForm} from "../components/ShowForm";
import {Card, CardHeader, CardContent, CardButton, CardItemSmall} from "../ui/atoms/CardElements";

export const EditShow = () => {
    const {token} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();
    const showModel = location.state; 
    const [model, setModel] = useState(showModel);
    const onModelUpdate = (update) => setModel(update);
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!model.title || !model.description || !model.date ) return;

        const _model = {title: model.title, description: model.description, show_date: model.date, show_id: model.show_id}
        const res = await ShowApi.update(id, _model, token);

        if (res.errors) {
            setError(`${res.errors[0].msg}: ${res.errors[0].param}!`);
            return;
        }
        setError(null);
        navigate("/shows");
    };
  
    return (
        <Card width = "80%">
            <CardHeader>Add</CardHeader>
            <CardContent>
                <ShowForm show={showModel} onUpdate={onModelUpdate}></ShowForm>
                <CardItemSmall>
                    <CardButton inputColor = {!model.title || !model.date || !model.description ? "#ebedef" : "#138d83d7"} inputWidht = "10%" type="submit" onClick={handleSubmit} disabled={!model.title || !model.date || !model.description} inputMarginTop="0.5rem">Save</CardButton>
                    </CardItemSmall>
                    <CardItemSmall> 
                        <p style={{color: "red"}}>{error}</p>
                    </CardItemSmall>
            </CardContent>
        </Card>
    );    
    
};
