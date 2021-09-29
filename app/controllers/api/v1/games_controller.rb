class Api::V1::GamesController < ApplicationController
  before_action :authenticate_user!

  def index
    @active_for_user = current_user.games.active
    @available_for_user = Game.available_for_user(current_user)
    @finished_for_user = current_user.games.finished
    @waiting_for_participants = current_user.games.waiting_for_participants

    render json: { active: @active_for_user, finished: @finished_for_user, available: @available_for_user, waiting_for_participants: @waiting_for_participants}, status: :ok
  end

  def show
    @game = Game.find(params[:id])
    @game_state = Game.find(params[:id]).state

    render json: {game: @game, state: @game_state }, status: :ok
  end

  def create
    @game = Game.create!(starter: current_user)

    render json: @game, status: :ok
  end

  def join
    @game = Game.find(params[:id])

    JoinGame.call(game: @game, player: current_user)

    render json: {}, status: :ok
  end

  def player_attempt
    @game = Game.find(params[:id])

    MakeGameAttempt.call(game: @game, player: current_user, gameplay_strategy: TicTacToeGame, attempt_identifier: params[:attempt_identifier])

    render json: {}, status: :ok
  end
end
