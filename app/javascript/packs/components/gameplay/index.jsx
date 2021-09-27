
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from "react-router-dom";
import { useValues, useActions } from 'kea';
import gameplayLogic from '../logic/gameplay_logic.js';
import ActionCable from "actioncable";
import { ActionCableProvider, ActionCableConsumer } from '@thrash-industries/react-actioncable-provider';

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
