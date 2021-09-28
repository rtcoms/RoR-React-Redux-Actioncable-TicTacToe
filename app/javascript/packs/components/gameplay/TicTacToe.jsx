
import React from 'react';
import PropTypes from 'prop-types';
import Spot from './Spot.jsx';
import { Row, Col, Container } from 'react-bootstrap';

const TicTacToe= ({game}) => {
  console.log(`TIC TAC TOE`);
  console.log(game);

  return (<React.Fragment>
            <h1>Tic-Tac_Toe Game # {game.game.id}</h1>
            <b>starter player moves: {game.state[game.game.starter_id].join(',')}</b><br/>
            <b>participator player moves: {game.state[game.game.participator_id].join(',')}</b><br/>

            <br/><br/><br/>

            <div id="main">
              <div className='status'>
                {(game.game.status == 'finished_with_noresult') &&  <div>It's a DRAW</div>}
                {(game.game.status == 'finished_with_result') &&  <div>{game.state.winner.email} WINS</div>}
                {(['started', 'in_progress'].includes(game.game.status)) &&  <div>{game.state.user_for_current_attempt.email}'s TURN</div>}


              </div>

              <Container>
                <Row className='row-cols-3'>
                  {[1,2,3,4,5,6,7,8,9].map(index => {
                    return <Col className='spot' key={`spot-col-${index}`}><Spot key={`spot-${index}`} spotIndex={index} game={game} /></Col>
                  })}
                </Row>
              </Container>
            </div>
          </React.Fragment>);
}

TicTacToe.defaultProps = {};

TicTacToe.propTypes = {
  game: PropTypes.object,
};

export default TicTacToe;
