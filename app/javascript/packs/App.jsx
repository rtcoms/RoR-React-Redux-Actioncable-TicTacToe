
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { resetContext, Provider } from 'kea'
import PropTypes from 'prop-types'
import Gamelisting from './components/gamelisting/index.jsx';
import Gameplay from './components/gameplay/index.jsx';
import { useUser } from './helper.js';


const App = props => {
  const { currentUser, isLoading, isError } = useUser();
  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (<div>
    <h1>Current User: {currentUser.email}</h1>
    <Provider>
      <Router>
        <Route path="/app/games" exact component={Gamelisting} />
        <Route path="/app/gameplay/:gameId" exact component={Gameplay} />
      </Router>
    </Provider>
  </div>);
}

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
