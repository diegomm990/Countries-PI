import React from "react";
import s from './Inicio.module.css';
import { Link } from "react-router-dom";

const Inicio = () => {
    return (
        <div className={s.inicio}>
            <h1 className={s.title}>PRESS START TO LOOK UP ALL THE COUNTRIES</h1>
            <Link to='/home' >
                <button className={s.boton} type='button'>START</button>
            </Link>
        </div>
    )
}


export default Inicio