import React , {useEffect} from 'react'
import s from './Home.module.css'
import SideBar from '../Nav/SideBar';
import Countries from '../Countries/Countries';
import {getCountries} from '../../actions/actions';
import { useDispatch } from "react-redux";


const Home= () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries());
        }, [dispatch]);

    return(
        <div className={s.home}>
                <SideBar/>
             <div className={s.countries}>
                <Countries />
             </div>
        </div>
    )
}


export default Home;