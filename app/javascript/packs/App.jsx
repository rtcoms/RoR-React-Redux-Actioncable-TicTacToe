
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from 'prop-types'
import Gamelisting from './components/gamelisting/index.jsx';
import Gameplay from './components/gameplay/index.jsx';

const App = props => (
  <div>
    App.jsx
    <Router>
      <Route path="/app/games" exact component={Gamelisting} />
      <Route path="/app/gameplay/:id" exact component={Gameplay} />
    </Router>
  </div>
)

App.defaultProps = {
  name: 'Tic-Tac-Toe'
}

App.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App name="React" />,
    document.getElementById("root").appendChild(document.createElement('div')),
  )
})
