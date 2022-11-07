import React from "react";
import NavAct from "../Nav/NavAct";
import s from './ActivityCreate.module.css';
import Form from "./Form";
const ActivityCreate = ()=> {
    return(
        <div className={s.home}>
              <NavAct />  
             <div className={s.country}>
                <Form />
             </div>
        </div>
    )
}

export default ActivityCreate;