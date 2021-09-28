class MakeGameAttempt
  include Interactor

  def call
    game = context.game
    player = context.player
    strategy = context.gameplay_strategy
    attempt_identiier = context.attempt_identiier

    context.fail!(message: "Game can't be played.") if [:waiting_for_participants, :finished_with_result, :finished_with_noresult].include(game.status)
    context.fail!(message: "Player cannot make 2 attempts in a row") if game.gameplay_attempts.last.user == player

    ActiveRecord::Base.transaction do
      game.gamplay_attempts.create!(user: player, identifier: attempt_identifier)

      tictactoe_strategy = strategy.new(game.player_wise_attempts)

      game_status = tictactoe_strategy.game_status
    end


  end
end
