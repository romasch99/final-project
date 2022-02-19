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
                <CardHeader>{customer.name} {customer.surname}</CardHeader>
            </CardItem>
            <CardContent>
                <CardNote>Email: {customer.email}</CardNote>
                <CardNote>Age: {customer.age}</CardNote>
            </CardContent>
            <CardButtons>
                <CardButton inputColor = "#138d83d7" onClick={onEdit}>Edit</CardButton>
                <CardButton onClick={onDelete}>Delete</CardButton>
            </CardButtons>
        </Card>
    );
    
};

