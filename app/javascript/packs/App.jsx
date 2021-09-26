
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { resetContext, Provider } from 'kea'
import PropTypes from 'prop-types'
import Gamelisting from './components/gamelisting/index.jsx';
import Gameplay from './components/gameplay/index.jsx';

resetContext({ // 👈 add this
  createStore: {
      // options for redux (e.g. middleware, reducers, ...)
  },
  plugins: [
      // additional kea plugins
  ],
})

const App = props => (
  <div>
    App.jsx
    <Provider>
      <Router>
        <Route path="/app/games" exact component={Gamelisting} />
        <Route path="/app/gameplay/:id" exact component={Gameplay} />
      </Router>
    </Provider>
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
