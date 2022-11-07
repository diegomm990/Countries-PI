import React from "react";
import { Link } from "react-router-dom";
import s from './SmallCountry.module.css'

export default function SmallCountry({name, id, flagimg, continent }){
    let flag;
        if(flagimg){
            flag = flagimg.split(',')[1].slice(0,-1)
        }
    return (
            <Link className={s.link} to={`/countries/${id}`} >
            <div className={s.card}>
                <h2 className={s.title}>{id}</h2>
                <div >
                    <img src={flag} alt="flag" className={s.image} />
                </div>
                <h2 className={s.title1}>Country: {name}</h2>
                <h3 className={s.continent}>Continent: {continent}</h3>
            </div>
            </Link>
    )
} 