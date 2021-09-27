class Game < ApplicationRecord
  belongs_to :starter, class_name: 'User'
  belongs_to :participator, class_name: 'User', optional: true
  has_many :gameplay_attempts, dependent: :destroy

  scope :active_for_user, ->(user) { where(starter: user).or(Game.where(participator: user)) }
  scope :available_for_user, ->(user) { where(participator: nil).where.not(starter: user) }


  def state
    state = {}
    state[starter.id] = gameplay_attempts.where(user: starter).map(&:attempt_identifier)
    state[participator.id] = gameplay_attempts.where(user: participator).map(&:attempt_identifier) if participator
    state[:user_for_current_attempt] = player_for_next_move

    state
  end


  private

  def player_for_next_move
    ([starter, participator] - [gameplay_attempts.last&.user]).first
  end
end
