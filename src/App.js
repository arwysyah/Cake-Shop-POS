import React from "react";
import 'antd/dist/antd.css';
import Home from './Components/Home'
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
// import {Provider} from 'react-redux';



function App() {
  return (

    <Router>
      <Route exact path="/" component={Home} />

    </Router>
    
  );
}

export default App;
