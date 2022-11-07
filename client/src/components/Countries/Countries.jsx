import React, { useEffect, useState } from "react";
import SmallCountry from "../Country/SmallCountry";
import { useSelector } from "react-redux";
import style from "./countries.module.css";
import { getCountries } from "../../actions/actions";
import { useDispatch } from "react-redux";

const Countries = ()=> {
    const countries = useSelector((state)=> state.countries);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();

    let nextPage = () => {
        if( countries.length <= currentPage + 10){
            setCurrentPage(currentPage);
        }else {
            if(currentPage === 0){
            setCurrentPage(currentPage + 9)
            }else {
              setCurrentPage(currentPage + 10)
            }
        }
    };
    let prevPage = () => { 
        if (currentPage < 10) {
          setCurrentPage(0);
        } else {
          setCurrentPage(currentPage - 10);
        }
      };
      const firstPage = () => {
        setCurrentPage(0);
      };
    
      const lastPage = () => {
        setCurrentPage(countries.length - 10);
        console.log(currentPage);
      };

      useEffect(() => {
        firstPage()
      }, [countries]);
    
      let filteredC = countries.slice(currentPage, currentPage + 10);  
      if(currentPage === 0){
        filteredC = countries.slice(currentPage, currentPage + 9); 
      }  
      const reset = () => {
        dispatch(getCountries());
      };
  
    return (
      <div>
        <div className={style.botones}>
        <button onClick={firstPage} className={style.btn}>  {'<<'}  </button>
        <button onClick={prevPage} className={style.btn}>  {'<'}   </button>
        <button onClick={reset} className={style.reset}>Reset</button>
        <button onClick={nextPage} className={style.btn}>  {'>'}   </button>
        <button onClick={lastPage} className={style.btn}>  {'>>'} </button>
        </div>
        <div className={style.grid}>
          {
          filteredC.map((e) => ( 
            <SmallCountry
              id={e.id}
              name={e.name}
              flagimg={e.flagimg}
              capital={e.capital}
              continent={e.continent}
              subregion={e.subregion}
              area={e.area}
              population={e.population}
            />))}
        </div>
      </div>
    );

}

export default Countries;