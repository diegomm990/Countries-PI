import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';
import {
    getCountries,
    orderAlpha,
    orderCont,
    orderActiv,
    orderAlphaRev,
    orderPop,
    orderPopRev,} from "../../actions/actions.js";
import { connect, useDispatch, useSelector } from "react-redux";
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import {IconContext} from 'react-icons';
import Search from "../Search/Search";

const SideBar = ({
    orderAlpha,
    getCountries,
    orderAlphaRev,
    orderCont,
    orderPop,
    orderPopRev,
    orderActiv
  })=> {
    const [sort, setOrder] = useState("");
    const [continent, setContinent] = useState("");
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState('');
    const dispatch = useDispatch();
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const countries = useSelector((state)=> state.countries);

    for (let i = 0; i < countries.length; i++) {
        let acts = countries[i].activities
        if(acts){
            for (let j = 0; j < acts.length; j++) {
                let contains = activities.includes(acts[j].name)
                if(!contains){
                    setActivities([
                        ...activities, acts[j].name
                    ])
                }                
            }
        }
    }
    console.log(countries[0])
    useEffect(() => {
        if (continent) {
          getCountries();
          if (continent !== "all") {
            setTimeout(() => {
              dispatch(orderCont(continent));
            }, 60);
          }
        }
      }, [continent]);

      useEffect(() => {
        if (activity) {
          getCountries();
          if (activity !== "All") {
            setTimeout(() => {
              dispatch(orderActiv(activity));
            }, 40);
          }
        }
      }, [activity]);

    useEffect(() => {
        if (sort === "all") getCountries();
        else if (sort === "a-z") orderAlpha();
        else if (sort === "z-a") orderAlphaRev();
        else if (sort === "higher-population") orderPop();
        else if (sort === "fewer-population") orderPopRev();
      }, [sort]);


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
                        
                        <li className='selec-cont'>
                            <div className="span-block"> 
                                <AiIcons.AiOutlineSortAscending/>
                                <span>Alphabetic Order:</span>
                            </div>
                            <select className='selector' onChange={(event) => setOrder(event.target.value)}>
                                <option value="all">All</option>
                                <option value="a-z">A-Z</option>
                                <option value="z-a">Z-A</option>
                            </select>
                        </li>
                        <li className='selec-cont'>
                            <div className="span-block"> 
                                <BsIcons.BsFillPeopleFill/>
                                <span>Order by Population:</span>
                            </div>
                            <select className='selector' onChange={(event) => setOrder(event.target.value)}>
                                <option value="All">None</option>
                                <option value="higher-population">↑ Population</option>
                                <option value="fewer-population">↓ Population</option>
                            </select>
                        </li>
                        <li className='selec-cont'>
                            <div className="span-block"> 
                                <BiIcons.BiWorld/>
                                <span>Continent</span>
                            </div>
                            <select className='selector' onChange={(event) => setContinent(event.target.value)}>
                                <option value="all">All</option>
                                <option value="Africa">Africa</option>
                                <option value="America">America</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europa</option>
                                <option value="Oceania">Oceania</option>
                            </select>
                        </li>
                        <li className='selec-cont'>
                            <div className="span-block"> 
                                <BsIcons.BsFillPeopleFill/>
                                <span>Order by Activity:</span>
                            </div>
                            <select className='selector' onChange={(event) => setActivity(event.target.value)}>
                                <option value="All">All</option>
                                {activities.map(a => {
                                    return (
                                        <option value={a}> {a}</option>
                                    )
                                })}
                            </select>
                        </li>
                        <li className='selec-cont'>
                            <Link to='/activitycreate'>
                                <button className='button'>Create an Activity</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    )
};
const mapDispatchToProps = (dispatch) => {
    return {
      orderAlpha: () => dispatch(orderAlpha()),
      getCountries: () => dispatch(getCountries()),
      orderCont: (continent) => dispatch(orderCont(continent)),
      orderActiv: (activity) => dispatch(orderActiv(activity)),
      orderAlphaRev: () => dispatch(orderAlphaRev()),
      orderPop: () => dispatch(orderPop()),
      orderPopRev: () => dispatch(orderPopRev()),
    };
  };
  const mapStateToProps = (state) => {
    return {
      countries: state.countries,
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);