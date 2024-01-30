import {Component} from "react";
import classes from './Card.module.css'


export class Card extends Component<Card, never> {
    constructor(props) {
        super(props);
    }
    render() {
        const {name,gender,birth_year,mass,hair_color,skin_color,height} = this.props
        return (
            <div className={classes.card}>
                <p>Name: {name}</p>
                <p>Gender: {gender}</p>
                <p>Birth Year: {birth_year}</p>
                <p>Mass: {mass}</p>
                <p>Hair Color: {hair_color}</p>
                <p>Skin Color: {skin_color}</p>
                <p>Height: {height}</p>
            </div>
        );
    }
}

