class GameplayAttempt < ApplicationRecord
  belongs_to :user
  belongs_to :game

  after_commit :bradcast_game_state, on: [:create]

  private

  def bradcast_game_state
    ActionCable.server.broadcast("gameplay_channel_#{game.id}", game.state)
  end
end
