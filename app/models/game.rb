class Game < ApplicationRecord
  include AASM

  enum status: {waiting_for_participants: 0, started: 1, in_progress: 2, finished_with_result: 3, finished_with_noresult: 4}
  belongs_to :starter, class_name: 'User'
  belongs_to :participator, class_name: 'User', optional: true
  has_many :gameplay_attempts, dependent: :destroy

  scope :active, -> { where(status: [:started, :in_progress])}
  scope :finished, -> { where(status: [:finished_with_result, :finished_with_noresult]) }
  scope :available_for_user, ->(user) { waiting_for_participants.where(participator: nil).where.not(starter: user) }
  scope :associated_with_user, ->(user) { where(starter: user).or(Game.where(participator: user)) }


  aasm column: :status, enum: true do
    state :waiting_for_participants, initial: true
    state :started, :in_progress, :finished_with_result, :finished_with_noresult

    event :start do
      transitions from: :waiting_for_participants, to: :started
    end

    event :mark_in_progress do
      transitions from: :started, to: :in_progress
    end

    event :end_with_result do
      transitions from: :in_progress, to: :finished_with_result
    end

    event :end_without_result do
      transitions from: :in_progress, to: :finished_with_noresult
    end
  end


  def state
    state = {}
    state[starter.id] = attempts_for_player(starter)
    state[participator.id] = attempts_for_player(participator) if participator
    state[:user_for_current_attempt] = [:started, :in_progress].include?(self.status.to_sym) ? player_for_next_move : nil
    state[:winner] = winner

    state
  end

  def player_wise_attempts
    {
      starter => attempts_for_player(starter),
      participator => attempts_for_player(participator)
    }
  end

  def player_for_next_move
    return starter if self.started?

    return TicTacToeGame.new(player_wise_attempts).next_player_for_attempt || starter
  end

  def winner
    return nil unless status == 'finished_with_result'

    TicTacToeGame.new(player_wise_attempts).winner
  end

  private


  def attempts_for_player(player)
    gameplay_attempts.where(user: player).pluck(:attempt_identifier)
  end
end
