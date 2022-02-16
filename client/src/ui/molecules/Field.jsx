import {Input} from "../atoms/Input";
import {Label} from "../atoms/Label";
import {CardItemSmall} from "../atoms/CardElements"

export const Field = ({label, ...props}) => (
    <CardItemSmall>
        <Label>{label}</Label>
        <Input {...props} />
    </CardItemSmall>
);
