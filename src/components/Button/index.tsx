import { ButtonHTMLAttributes } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {}
import { ButtonStyle } from "./styled";

export function Button({ ...props }: ButtonProps) {
    return (
        <ButtonStyle color={props.color} {...props} />
    )
}
