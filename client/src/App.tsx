import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './screens/Home';
import Ok from './screens/Ok';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/ok" exact component={Ok}/>
      </Switch>
    </Router>
  )
}

export default App
