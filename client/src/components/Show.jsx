import { Card, 
    CardItem, 
    CardHeader, 
    CardContent, 
    CardNote,
    CardButtons,
    CardButton} from "../ui/atoms/CardElements";

export const Show = ({show, onEdit, onDelete}) => {

return (
    <Card>
        <CardItem>
            <CardHeader fontSize="15px">{show.title} </CardHeader>
        </CardItem>
        <CardContent>
            <CardNote>Date: {show.date}</CardNote>
            <CardNote>Description: {show.description}</CardNote>
        </CardContent>
        <CardButtons inputPaddingTop="1.5rem">
            <CardButton inputColor = "#138d83d7" inputFontSize="12px" inputWidht= "22%" inputHeight="25px" onClick={onEdit}>Edit</CardButton>
            <CardButton onClick={onDelete} inputFontSize="12px" inputWidht= "22%" inputHeight="25px" >Delete</CardButton>
        </CardButtons>
    </Card>
);

};

