# TICTACTOE MULTIPLAYER GAME - ROR / ACTION CABLE WEBSOCKET /REACTJS / REDUX (KEAJS) / INTERACTOR GEM / RSPEC

## ASSUMPTIONS
* game will have at max 2 players and so no has_many association between game and players
* Whoever accesss the show game page will join game if slot is available
* any other person who visit game show page after no slots available can observe the game
* First move of the game will be by the same user who create the game
* player can manually abandone or stop the game
* player should get realtime updates, which is implemented using action cable
* core processes of gameplay are implemented using interactor gem, and so majority of validation are imlemented inside interactor class. Ideally there should be validation on model class

## Front end
* authentication is implemented using default devise views which are not in reactjs
* Game lisiting is implemented using Redux/kea js
  was it required ? Not really, I always wanted to check keajs and it was a good opportunity
* actioncable in react is implemented iusing react-actioncable-provider library
* useSwr is used to make fetch logic simpler
* Used react-bootstrap only for making TicTacToe grid

## Testing
* specs are implementes using rspec/factory_bot/shoulda_matchers
* Not many rspecs have been added due to time constraints
* although specs for whole gameplay are implemented. check file: game_spec.rb (Not ideal place)

## Things to improve
* Api error handling
* use constants instead of hardcoded strings for status and error messages
* use constants instead of hardcoded grid spot numbers for game
* implement spec for frontend using react testing library
* starter and participator player should be abstracted as player and overall logic should be implemented for a player

## Observation and learning
* A nice coding challenge which covers full stack
* Keajs makes it much easier to work with redux - Used for first time
* actionvable worked nicely - Used for first time
* interactor gem can work very nicely if you application is about processes - Used for first time
  It simplifies the whole controller logic.



