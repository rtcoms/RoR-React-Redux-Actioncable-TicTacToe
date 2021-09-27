import React from 'react';
import PropTypes from 'prop-types';
import { useActions } from 'kea'
import gameLogic from '../logic/game_logic.js'

const StartGame = () => {
  const { createGame } = useActions(gameLogic);

  return (<React.Fragment>
    <button onClick={() => createGame()}>New Game</button>
  </React.Fragment>);
};

export default StartGame;
