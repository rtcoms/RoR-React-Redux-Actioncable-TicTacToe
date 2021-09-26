class GameChannel < ApplicationCable::Channel
  def subscribed
    puts '==============>'
    Rails.logger.info "Subscribing to: gameplay_channel_#{params[:game_id]}"
    stream_from "gameplay_channel_#{params[:game_id]}"
  end

  def unsubscribed
  end
end
