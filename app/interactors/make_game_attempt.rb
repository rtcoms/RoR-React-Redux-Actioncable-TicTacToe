class MakeGameAttempt
  include Interactor

  def call
    game = context.game
    player = context.player
    strategy = context.gameplay_strategy
    attempt_identifier = context.attempt_identifier

    tictactoe_strategy = strategy.new(game.player_wise_attempts)

    context.fail!(message: "Game can't be played.") if [:waiting_for_participants, :finished_with_result, :finished_with_noresult].include?(game.status)
    context.fail!(message: "Player cannot make 2 attempts in a row") if game.player_for_next_move != player

    ActiveRecord::Base.transaction do
      game.gameplay_attempts.create!(user: player, attempt_identifier: attempt_identifier)

      tictactoe_strategy = strategy.new(game.player_wise_attempts)
      game.status = tictactoe_strategy.game_status
      game.save!
    end


  end
end
