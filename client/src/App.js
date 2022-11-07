import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css'
import Home from './components/Home/Home'
import Inicio from './components/Inicio/Inicio'
import CountryId from './components/Country/CountryId';
import ActivityCreate from './components/Activities/ActivityCreate';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Inicio}/>
        <Route exact path='/home' component={Home}/>
        <Route path='/activitycreate' component={ActivityCreate}/>
        <Route path={`/countries/:id`} component={CountryId} />
      </Switch>
      
    </Router>
  );
}

export default App;
