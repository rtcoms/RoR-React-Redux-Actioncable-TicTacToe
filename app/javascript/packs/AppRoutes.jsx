import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Gamelisting from './gamelisting/index.jsx';

export default (
  <Router>
    <div>
      Routes
      <Router>
        <Route path="/" exact component={Gamelisting} />
      </Router>
    </div>
  </Router>
);
