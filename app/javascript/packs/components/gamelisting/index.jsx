
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Gamelisting = () => {
  return (<React.Fragment>
            <h1>Welcome to Games listing</h1>
            <Link to="/app/gameplay/1">Game</Link>
          </React.Fragment>);
}

Gamelisting.defaultProps = {
  name: 'Tic-Tac-Toe'
};

Gamelisting.propTypes = {
  name: PropTypes.string
};

export default Gamelisting;
