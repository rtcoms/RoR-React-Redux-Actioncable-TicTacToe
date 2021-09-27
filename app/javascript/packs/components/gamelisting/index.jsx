
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useValues } from 'kea'
import gameLogic from '../logic/game_logic.js'
import StartGame from './StartGame.jsx'

const Gamelisting = () => {
  console.log('GAMELISTING PAGE')
  const { games, isLoading } = useValues(gameLogic);
  console.log(games.active);
  console.log(games.available)

  if(isLoading) {
    return <h3>Loading games ...</h3>;
  };

  return (<React.Fragment>
            <h1>Welcome to Games listing</h1>
            <h3>Active Games</h3>
            {games.active.map(game => (
                <React.Fragment>
                  <Link to={`/app/gameplay/${game.id}`} key={`game-${game.id}`}>Game #{game.id}</Link><br/>
                </React.Fragment>
             ))}

            <hr/>

            <h3>Available Games</h3>
            {games.available.map(game => (
                <React.Fragment>
                  <Link to={`/app/gameplay/${game.id}`} key={`game-${game.id}`}>Game #{game.id}</Link><br/>
                </React.Fragment>
             ))}

            <hr/>

            <StartGame />

          </React.Fragment>);
}

Gamelisting.defaultProps = {
  name: 'Tic-Tac-Toe'
};

Gamelisting.propTypes = {
  name: PropTypes.string
};

export default Gamelisting;
