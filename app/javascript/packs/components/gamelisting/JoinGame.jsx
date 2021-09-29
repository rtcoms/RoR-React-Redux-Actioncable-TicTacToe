import React from 'react';
import PropTypes from 'prop-types';
import { useActions } from 'kea'
import gameLogic from '../logic/game_logic.js'

const JoinGame = ({gameId}) => {
  const { joinGame } = useActions(gameLogic);

  return (<React.Fragment>
    <button onClick={() => joinGame(gameId)}>Join</button>
  </React.Fragment>);
};

export default JoinGame;
