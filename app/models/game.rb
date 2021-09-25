class Game < ApplicationRecord
  belongs_to :starter, class_name: 'User'
  belongs_to :participator, class_name: 'User', optional: true

  scope :active_for_user, ->(user) { where(starter: user).or(Game.where(participator: user)) }
  scope :available_for_user, ->(user) { where(participator: nil).where.not(starter: user) }
end
