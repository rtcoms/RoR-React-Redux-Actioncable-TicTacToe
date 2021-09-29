
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useValues } from 'kea'
import gameLogic from '../logic/game_logic.js'
import NewGame from './NewGame.jsx'
import JoinGame from './JoinGame.jsx'

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
            <NewGame />
            <hr />
            <h3>Games In progress</h3>
            {games.active.map(game => (
                <React.Fragment>
                  <Link to={`/app/gameplay/${game.id}`} key={`game-${game.id}`}>Game #{game.id}</Link><br/>
                </React.Fragment>
             ))}

            <hr/>
            <h3>Games Completed</h3>
            {games.finished.map(game => (
                <React.Fragment>
                  <Link to={`/app/gameplay/${game.id}`} key={`game-${game.id}`}>Game #{game.id}</Link><br/>
                </React.Fragment>
             ))}
            <hr/>

            <h3>Games you can join</h3>
            {games.available.map(game => (
                <React.Fragment>
                  <Link to={`/app/gameplay/${game.id}`} key={`game-${game.id}`}>Game #{game.id}</Link><br/>
                </React.Fragment>
             ))}
             <hr/>

            <h3>Games created by you waiting for participations</h3>
            {games.waiting_for_participants.map(game => (
                <React.Fragment>
                  <div><span>Game #{game.id}</span><br/></div>
                </React.Fragment>
             ))}
            <hr/>

          </React.Fragment>);
}

Gamelisting.defaultProps = {
  name: 'Tic-Tac-Toe'
};

Gamelisting.propTypes = {
  name: PropTypes.string
};

export default Gamelisting;
