class GameplayAttempt < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates :attempt_identifier, presence: true

  after_commit :bradcast_game_state, on: [:create]

  private

  def bradcast_game_state
    {game: game, state: game.state}
    ActionCable.server.broadcast("gameplay_channel_#{game.id}", {game: game, state: game.state})
  end
end
