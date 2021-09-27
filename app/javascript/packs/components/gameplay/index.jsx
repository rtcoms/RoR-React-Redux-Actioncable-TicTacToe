
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from "react-router-dom";
import { useValues, useActions } from 'kea';
import gameplayLogic from '../logic/gameplay_logic.js';
import ActionCable from "actioncable";
import { ActionCableProvider, ActionCableConsumer } from '@thrash-industries/react-actioncable-provider';
import TicTacToe from './TicTacToe.jsx'

// const cable = ActionCable.createConsumer("ws://localhost:3000/websocket");

const Gameplay= () => {
  let { gameId } = useParams();
  console.log(`GAME ID PROP: ${gameId}`)
  console.log('GAMELISTING PAGE')
  const { game, isLoading } = useValues(gameplayLogic);
  const { loadGame, receivedGameUpdate } = useActions(gameplayLogic);

  const handleReceivedMEssage = (message) => {
    console.log('HANDLING RECEIVED MESSAGE');
    receivedGameUpdate(message)
  };

  useEffect(() => {
    // Update the document title using the browser API
    loadGame(gameId);
  }, []);


  if(isLoading) {
    return <h3>Loading games ...</h3>;
  };

  return (<React.Fragment>
            <ActionCableProvider url={'ws://localhost:3000/websocket'}>
              <ActionCableConsumer channel={{channel: 'GameChannel', game_id: gameId}}
                onReceived={(data) => {console.log("handleReceived: ", data); receivedGameUpdate(data);}}
                onConnected={() => console.log('Action cable connected')}
                onDisconnected={() => console.log('Action cable disconnected')}
                onRejected={() => console.log('Action cable rejected')} >
                <br/><br/><br/>

                <TicTacToe game={game}/>
                <Link to="/app/games">Games Listing</Link>
                </ActionCableConsumer>
            </ActionCableProvider>

          </React.Fragment>);
}

Gameplay.defaultProps = {
  name: 'Tic-Tac-Toe'
};

Gameplay.propTypes = {
  name: PropTypes.string,
};

export default Gameplay;
