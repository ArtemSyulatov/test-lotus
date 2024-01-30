import classes from "./Input.module.css";
import {ChangeEvent} from "react";

interface InputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
}

export const Input = (props: InputProps) => {
    return (
        <>
            <input {...props} className={classes.input}/>
        </>
    );
};

