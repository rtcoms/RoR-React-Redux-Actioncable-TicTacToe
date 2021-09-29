class MakeGameAttempt
  include Interactor

  def call
    game = context.game
    player = context.player
    strategy = context.gameplay_strategy
    attempt_identifier = context.attempt_identifier

    tictactoe_strategy = strategy.new(game.player_wise_attempts)

    puts "identifiers: #{game.gameplay_attempts.pluck(:attempt_identifier).include?(attempt_identifier)}"
    context.fail!(error: 'Spot not avilable') if game.gameplay_attempts.pluck(:attempt_identifier).include?(attempt_identifier)
    context.fail!(error: "Game can't be played.") if [:waiting_for_participants, :finished_with_result, :finished_with_noresult].include?(game.status)
    context.fail!(error: "Player cannot make 2 attempts in a row") if game.player_for_next_move != player

    ActiveRecord::Base.transaction do
      game.gameplay_attempts.create!(user: player, attempt_identifier: attempt_identifier)

      tictactoe_strategy = strategy.new(game.player_wise_attempts)
      game.status = tictactoe_strategy.game_status
      game.save!
    end


  end
end
