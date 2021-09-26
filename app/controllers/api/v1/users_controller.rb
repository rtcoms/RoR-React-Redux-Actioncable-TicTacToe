class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def current_user
    @user = current_user

    render json: @current_user, status: :ok
  end
end
