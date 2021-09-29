class JoinGame
  include Interactor

  def call
    game = context.game
    player = context.player

    context.fail!(message: "Game already started with all participants.") unless game.waiting_for_participants?
    context.fail!(message: "Creator can't join game as participants") if game.starter == player

    ActiveRecord::Base.transaction do

      game.with_lock do
        game.update!(participator: player)
        game.start!
      end

    end


  end
end
