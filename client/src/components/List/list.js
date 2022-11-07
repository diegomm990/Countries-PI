import React, {useState} from "react";
import { useSelector } from "react-redux";

const ListCreator = ()=> {
    const countries = useSelector((state)=> state.countries);
    const list = [];
    for (let i = 0; i < countries.length; i++) {
        list.push(Object.values(countries[i])[1])
    }
    return list;
}
export default ListCreator;
