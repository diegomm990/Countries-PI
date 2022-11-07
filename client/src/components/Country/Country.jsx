import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../actions/actions";
import s from './Country.module.css';

const Country = ()=>{
    
    const countryDetail = useSelector((state) => state.countryDetail);
    const dispatch = useDispatch();

    let { id } = useParams();
        useEffect(() => {
        dispatch(getDetail(id));
        }, [id]);
 

    console.log(countryDetail, "COUNTRY DETAIL")


    let flag;
    if(countryDetail.flagimg){
        flag = countryDetail.flagimg.split(',')[1].slice(0,-1)
     }
    let cap;
    if(countryDetail.capital){
        cap = countryDetail.capital.slice(1,-1)
        if(cap.charAt(0) === '"'){
            cap = cap.slice(1,-1)
        }
     } 
    
    return (
        <div className={s.card}>
            <h1 className={s.title}>{countryDetail.id}</h1>
            <img src={flag} alt="no img" className={s.image}/>
            <h2>{countryDetail.name}</h2>
            <h2>Capital:{cap}</h2>
            <h2>Continent: {countryDetail.continent}</h2>         
            <h2>Subregion:{countryDetail.subregion}</h2>
            <h2>Area:{countryDetail.area} Km²</h2>
            <h2>Population:{countryDetail.population}</h2>
            <h2>Activities:</h2>
            <ul className={s.list}>
                {countryDetail.activities?.map((e)=>{
                    return <li className={s.elements}>{e.name}</li>
                })}
            </ul>
        </div>
        
    )
}

export default Country;