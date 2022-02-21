import {useState, useEffect} from "react";
import {Field} from "../ui/molecules/Field";
import {Textarea} from "../ui/atoms/TextArea";
import {Label} from "../ui/atoms/Label";
import {Card, CardContent, CardItemSmall} from "../ui/atoms/CardElements";

export const ShowForm = ({show, onUpdate}) => {
    const [title, setTitle] = useState(show.title);
    const [description, setDescription] = useState(show.description);
    const [date, setShowDate] = useState(show.date);
    
    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const onShowDateChange = (e) => {
        setShowDate(e.target.value);
    };
    
    useEffect(() => {
        onUpdate({
            title,
            description,
            date
        });
    }, [title, description, date]);

    return (
        <Card width = "80%">
            <CardContent>
                <form>
                    <CardItemSmall>
                        <Field label= "title:" onChange={onTitleChange} name="title" type="text" placeholder="Title..." value={title} required fontSize="12px"/>
                    </CardItemSmall>    
                    <CardItemSmall>
                        <Label name="description">Description:</Label>
                        <Textarea onChange={onDescriptionChange} name="description" placeholder="Lorem ipsum ..." required  value={description} />
                    </CardItemSmall>   
                    <CardItemSmall>
                        <Field label= "Date:" onChange={onShowDateChange} name="date" type="datetime-local" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" placeholder="123..." value={date ? date :''} required minLength={8} fontSize="12px"/>
                    </CardItemSmall>
                </form>
            </CardContent>
        </Card>
    );    
    
};
