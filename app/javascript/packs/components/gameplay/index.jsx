
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Gameplay= () => {
  return (<React.Fragment>
            <h1>Welcome to Gameplay</h1>
            <Link to="/app/games">Games Listing</Link>
          </React.Fragment>);
}

Gameplay.defaultProps = {
  name: 'Tic-Tac-Toe'
};

Gameplay.propTypes = {
  name: PropTypes.string
};

export default Gameplay;
