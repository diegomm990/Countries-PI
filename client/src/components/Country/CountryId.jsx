import React  from 'react'
import SideBar from '../Nav/SideBar';
import Country from './Country';
import s from './CountryId.module.css'

const CountryId= () => {
    return(
        <div className={s.home}>
                <SideBar/>
             <div className={s.country}>
                <Country />
             </div>
        </div>
    )
}


export default CountryId;