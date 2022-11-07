import React, {useState} from "react";
import s from './Search.module.css'
import {getName, getCountries} from '../../actions/actions'
import {useDispatch } from "react-redux";

const Search = ()=> {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const inputHandler = (e) => {
        setInput(e.target.value);
        dispatch(getName(input));
        // console.log(input)
      };
    
    const handleSubmit = (event)=>  {
        event.preventDefault();
      }
    const clearInput = ()=> {
        dispatch(getCountries())
        setInput('')
    }
    return (
        <form onSubmit={(e)=> handleSubmit(e)}>
            <div className={s.search}>
                <input type="text" name="Search" placeholder='Search...' className={s.input} value={input} onChange={(e) => inputHandler(e) }/>
                <button className={s.button} onClick={()=> clearInput()}>X</button>
            </div>
        </form>
    )
}



export default Search