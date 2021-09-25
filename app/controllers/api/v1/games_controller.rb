class Api::V1::GamesController < ApplicationController
  before_action :authenticate_user!

  def index
    # binding.pry
    @active_for_user = Game.active_for_user(current_user)
    @available_for_user = Game.available_for_user(current_user)

    render json: { active: @active_for_user, available: @available_for_user}, status: :created
  end
end
