import { Card, 
        CardItem, 
        CardHeader, 
        CardContent, 
        CardNote,
        CardButtons,
        CardButton} from "../ui/atoms/CardElements";

export const Customer = ({customer, onEdit, onDelete}) => {
    
    return (
        <Card>
            <CardItem>
                <CardHeader fontSize="15px">{customer.name} {customer.surname}</CardHeader>
            </CardItem>
            <CardContent>
                <CardNote>Email: {customer.email}</CardNote>
                <CardNote>Age: {customer.age}</CardNote>
            </CardContent>
            <CardButtons inputPaddingTop="1.5rem">
                <CardButton inputColor = "#138d83d7" inputFontSize="12px" inputWidht= "22%" inputHeight="25px" onClick={onEdit}>Edit</CardButton>
                <CardButton onClick={onDelete} inputFontSize="12px" inputWidht= "22%" inputHeight="25px" >Delete</CardButton>
            </CardButtons>
        </Card>
    );
    
};

