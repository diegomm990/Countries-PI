import React, { useState} from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';
import {IconContext} from 'react-icons';
import Search from "../Search/Search";
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';


const NavAct = ()=> {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        
        <div>
            <IconContext.Provider value={{color: 'white'}}>
                <div className="navbar">
                    <Link to='#' className={sidebar? 'menu-bars-inactive' : 'menu-bars'}>
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </Link>
                        <h1 className='title'>
                                 Countries
                        </h1>
                    <div>
                        <Search /> 
                    </div>
                </div>
                <nav className={sidebar? 'nav-menu-active' : 'nav-menu'}>
                    <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                            <Link to='#' className={sidebar? 'menu-cross' : 'menu-cross-inactive'}>
                                <AiIcons.AiOutlineClose onClick={showSidebar} />
                            </Link>
                        </li>
                        <li className='nav-text'>
                            <Link className="link" to='/'>
                            <AiIcons.AiFillHome/>
                                <span className="home">Home</span>
                            </Link>
                        </li>
                        <li className='nav-text'>
                            <Link className="link" to='/home'>
                            <BiIcons.BiWorld/>
                                <span className="home">Countries</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    )
};

export default NavAct;