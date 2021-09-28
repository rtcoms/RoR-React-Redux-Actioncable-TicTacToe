import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../userContext.js'
import { useValues, useActions } from 'kea';
import gameplayLogic from '../logic/gameplay_logic.js';

const Spot= ({spotIndex, game}) => {
  const currentUser = useContext(UserContext);
  const { submitAttempt } = useActions(gameplayLogic);
  // console.log('SPOT');
  // console.log(currentUser);

  if(game.state[game.game.starter_id].includes(spotIndex) ) {
    return <div className="boxes checkedOrange"></div>;
  }

  if(game.state[game.game.participator_id].includes(spotIndex)) {
    return <div className="boxes checkedWhite"></div>;
  }

  if(currentUser.id !== game.state.user_for_current_attempt.id) {
    return <div className="boxes"></div>;
  }

  if(currentUser.id === game.state.user_for_current_attempt.id) {
    return <button className="boxes" onClick={(e) => submitAttempt(spotIndex) }></button>;
  }
}

Spot.defaultProps = {};

Spot.propTypes = {
  spotIndex: PropTypes.number,
  game: PropTypes.object,
};

export default Spot;
