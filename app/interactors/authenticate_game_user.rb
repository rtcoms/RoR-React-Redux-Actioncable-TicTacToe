class AuthenticateGameAttempt
  include Interactor

  def call
    game = context.game
    player = context.player
    game_strategy = context.game_strategy

    unless [game.starter, game.participator].include?(player)
      context.fail!(message: "User not a player for the game")
    end


  end
end
