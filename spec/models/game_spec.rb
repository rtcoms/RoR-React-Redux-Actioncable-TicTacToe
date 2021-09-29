require 'rails_helper'

RSpec.describe Game, type: :model do
  describe 'full gameplay' do
    let(:game) { create(:game) }
    let(:starter) { game.starter }

    it 'should initialize game with status waiting _for_participants' do
      expect(game.participator).to be_nil
      expect(game.status).to eq('waiting_for_participants')
    end

    it 'should not allow starter player to again join as participator' do
      join_game_context = JoinGame.call(game: game, player: starter)

      expect(join_game_context.success?).to be_falsey
      expect(join_game_context.error).to eq("Creator can't join game as participator")
    end

    it 'should allow another user to join game as participator and change game status to started' do
      participator = create(:user)

      join_game_context = JoinGame.call(game: game, player: participator)

      expect(join_game_context.success?).to be_truthy
      expect(game.status).to eq('started')
    end

    it 'should now allow another user to join game after it started' do
      participator = create(:user)

      join_game_context = JoinGame.call(game: game, player: participator)

      another_user = create(:user)
      invalid_join_game_context = JoinGame.call(game: game, player: participator)

      expect(invalid_join_game_context.success?).to be_falsey
      expect(invalid_join_game_context.error).to eq('Game already started with all participants.')
    end

    it 'should allow starter player to make first move and change status to in_progress' do
      participator = create(:user)
      join_game_context = JoinGame.call(game: game, player: participator)

      game_attempt_context = MakeGameAttempt.call(game: game, player: starter, gameplay_strategy: TicTacToeGame, attempt_identifier: 1)

      expect(game_attempt_context.success?).to be_truthy
      expect(game.status).to eq('in_progress')
    end

    it 'should not allow multiple attempt at same spot by 2 different player' do
      participator = create(:user)
      join_game_context = JoinGame.call(game: game, player: participator)

      MakeGameAttempt.call(game: game, player: starter, gameplay_strategy: TicTacToeGame, attempt_identifier: 1)
      same_spot_game_attempt_context = MakeGameAttempt.call(game: game, player: participator, gameplay_strategy: TicTacToeGame, attempt_identifier: 1)

      expect(same_spot_game_attempt_context.success?).to be_falsey
      expect(same_spot_game_attempt_context.error).to eq('Spot not avilable')
    end


    it 'should not allow a player to make 2 consecutive attempts' do
      participator = create(:user)
      join_game_context = JoinGame.call(game: game, player: participator)

      MakeGameAttempt.call(game: game, player: starter, gameplay_strategy: TicTacToeGame, attempt_identifier: 1)
      starter_consecutinve_attempt = MakeGameAttempt.call(game: game, player: starter, gameplay_strategy: TicTacToeGame, attempt_identifier: 2)

      expect(starter_consecutinve_attempt.success?).to be_falsey
      expect(starter_consecutinve_attempt.error).to eq("Player cannot make 2 attempts in a row")

      MakeGameAttempt.call(game: game, player: participator, gameplay_strategy: TicTacToeGame, attempt_identifier: 3)
      participator_consecutinve_attempt = MakeGameAttempt.call(game: game, player: participator, gameplay_strategy: TicTacToeGame, attempt_identifier: 4)

      expect(participator_consecutinve_attempt.success?).to be_falsey
      expect(participator_consecutinve_attempt.error).to eq("Player cannot make 2 attempts in a row")
    end


    it 'should allow player to play the game and finish as soon as one player wins' do
      participator = create(:user)
      starter = game.starter
      join_game_context = JoinGame.call(game: game, player: participator)

      MakeGameAttempt.call(attempt_identifier: 1, player: starter, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 4, player: participator, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 2, player: starter, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 5, player: participator, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 3, player: starter, game: game, gameplay_strategy: TicTacToeGame)

      expect(game.status).to eq('finished_with_result')
    end

    it 'should allow player to play the game and end as draw if no player wins' do
      starter = game.starter
      participator = create(:user)
      join_game_context = JoinGame.call(game: game, player: participator)

      MakeGameAttempt.call(attempt_identifier: 1, player: starter, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 5, player: participator, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 3, player: starter, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 2, player: participator, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 8, player: starter, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 6, player: participator, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 4, player: starter, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 7, player: participator, game: game, gameplay_strategy: TicTacToeGame)
      MakeGameAttempt.call(attempt_identifier: 9, player: starter, game: game, gameplay_strategy: TicTacToeGame)

      expect(game.status).to eq('finished_with_noresult')
    end


  end
end
