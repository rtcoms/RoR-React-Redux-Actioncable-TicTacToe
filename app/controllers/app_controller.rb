class AppController < ApplicationController
  layout 'app'

  before_action :authenticate_user!

  def index
    @user_games
  end
end
