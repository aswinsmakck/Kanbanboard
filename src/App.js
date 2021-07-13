import './App.css';
import React from 'react';
import HomePage from './Components/HomePage';
import {Switch, Route} from  'react-router-dom';
import BoardLists from './Components/BoardLists';
import Header from './Components/Header'

class App extends React.Component {

  render (){
    return(
      //conditional rendering Login or Homepage
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/board/:id" component={BoardLists} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;