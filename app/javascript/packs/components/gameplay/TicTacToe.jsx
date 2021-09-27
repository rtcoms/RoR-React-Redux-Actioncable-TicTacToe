
import React from 'react';
import PropTypes from 'prop-types';
import Spot from './Spot.jsx';

const TicTacToe= ({game}) => {
  console.log(`TIC TAC TOE`);
  console.log(game);

  return (<React.Fragment>
            <h1>Tic-Tac_Toe Game # {game.game.id}</h1>
            <b>starter player moves: {game.state[game.game.starter_id]}</b><br/>
            <b>participator player moves: {game.state[game.game.participator_id]}</b><br/>
            <br/><br/><br/>

            <div id="main">
              <input id="disp" value="TURN" readOnly />
              {[1,2,3,4,5,6,7,8,9].map(index => {
                return <Spot key={`spot-${index}`} spotIndex={index} game={game} />
              })}
            </div>
          </React.Fragment>);
}

TicTacToe.defaultProps = {};

TicTacToe.propTypes = {
  game: PropTypes.object,
};

export default TicTacToe;
