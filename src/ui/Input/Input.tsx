import classes from "./Input.module.css";

export const Input = (props) => {
    return (
        <>
            <input {...props} className={classes.input}/>
        </>
    );
};

