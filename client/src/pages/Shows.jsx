import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {Show} from "../components/Show";
import {ShowApi} from "../services/shows-api";
import {BlockFlex} from "../ui/atoms/Block";
import {ShowForm} from "../components/ShowForm";
import {Card, CardHeader, CardContent, CardButton, CardItemSmall} from "../ui/atoms/CardElements";


export const Shows = () => {
    const {token} = useAuth();
    const navigate = useNavigate();
    const [shows, setShows] = useState();
    const showModel = {title: "", description: "", show_date: ""} 
    const [model, setModel] = useState(showModel);
    const onModelUpdate = (update) => setModel(update);
      
    const [error, setError] = useState(null);
    const {state} = useLocation();
    
    const fetchShows = async () => {
        const res = await ShowApi.getAll(token);
        setShows(res);
    };

    const addShow = (show) => {
        setShows((prevState) => [...prevState, show]);
    };
    
    const editShow = (show) => {
        navigate(`/edit-show/${show.id}`, {state: show});
    }
  
    const deleteShow = async (showId) => {
        try {
            const res = await ShowApi.delete(showId, token);
            const {id} = res.deleted;
            
            setShows((prevState) => {
                return prevState.filter((customer) => customer.id !== id);
            });
        } catch (e) {
            console.error(e);
        }
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Add show');
        console.log(model.title, model.description, model.date);
        if (!model.title || !model.description || !model.date ) return;

        const _model = {title: model.title, description: model.description, show_date: model.date}
        const res = await ShowApi.add(_model, token);

        if (res.errors) {
            setError(`${res.errors[0].msg}: ${res.errors[0].param}!`);
            return;
        }
        setError(null);
        const {show} = res;
        const _show = {id:show.id, title: show.title, description: show.description, date: show.show_date}
        console.log("Add-handleSubmit");
        console.log({_show});
        navigate("/shows", {state: {added: _show}});
    };
    
    useEffect(() => {
        fetchShows();
    },[] );
    
    useEffect(() => {
        // console.log('useEffect state:');
        // console.log({state});
        if (!state) return;

        if (state.added) {
            addShow(state.added);
        }
    }, [state]);
    
    const renderedShows = !!shows
    ? shows.map((show) => <Show key={show.id} show={show} onEdit = {() => {editShow(show)}} onDelete={() => {deleteShow(show.id)}}/>)
    : null;
    
    const showsList = shows === null ? (
        <div>Loading...</div>
    ) : (
        <div className="list">
            <CardHeader>
                <div>Shows List</div>
            </CardHeader>
                <BlockFlex>{renderedShows}</BlockFlex>
        </div>
    );
    
    return (
        <Card width = "80%">
            <CardHeader>Add show</CardHeader>
            <CardContent>
                <ShowForm show={showModel} onUpdate={onModelUpdate}></ShowForm>
                <CardItemSmall>
                    <CardButton inputColor = {!model.title || !model.date || !model.description ? "#ebedef" : "#138d83d7"} inputWidht = "10%" type="submit" onClick={handleSubmit} disabled={!model.title || !model.date || !model.description} inputMarginTop="0.5rem">Add</CardButton>
                    </CardItemSmall>
                    <CardItemSmall> 
                        <p style={{color: "red"}}>{error}</p>
                    </CardItemSmall>
            </CardContent>
            {showsList}
        </Card>
    );    
    
};
