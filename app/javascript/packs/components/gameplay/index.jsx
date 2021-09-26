
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useValues } from 'kea'
import gameplayLogic from '../logic/gameplay_logic.js'

const Gameplay= () => {
  console.log('GAMELISTING PAGE')
  const { game, isLoading } = useValues(gameplayLogic);
  console.log(game);

  if(isLoading) {
    return <h3>Loading games ...</h3>;
  };

  debugger

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
