
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from "react-router-dom";
import { useValues } from 'kea';
import gameplayLogic from '../logic/gameplay_logic.js';
import { ActionCableProvider } from '@thrash-industries/react-actioncable-provider';

const Gameplay= () => {
  let { gameId } = useParams();
  console.log(`GAME ID PROP: ${gameId}`)
  console.log('GAMELISTING PAGE')
  const { game, isLoading } = useValues(gameplayLogic);
  console.log(game);

  if(isLoading) {
    return <h3>Loading games ...</h3>;
  };

  return (<React.Fragment>
            <h1>Tic-Tac_Toe Game # {game.game.id}</h1>
            <b>starter player moves: {game.state[game.game.starter_id]}</b><br/>
            <b>participator player moves: {game.state[game.game.participator_id]}</b><br/>
            <br/><br/><br/>

            <div id="main">
              <input id="disp" value="TURN" readOnly />
              <div id="x1y1" className="boxes"></div>
              <div id="x2y1" className="boxes"></div>
              <div id="x3y1" className="boxes"></div>
              <div id="x1y2" className="boxes"></div>
              <div id="x2y2" className="boxes"></div>
              <div id="x3y2" className="boxes"></div>
              <div id="x1y3" className="boxes"></div>
              <div id="x2y3" className="boxes"></div>
              <div id="x3y3" className="boxes"></div>
            </div>
            <Link to="/app/games">Games Listing</Link>

          </React.Fragment>);
}

Gameplay.defaultProps = {
  name: 'Tic-Tac-Toe'
};

Gameplay.propTypes = {
  name: PropTypes.string,
};

export default Gameplay;
