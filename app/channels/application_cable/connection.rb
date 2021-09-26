module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      # binding.pry

      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user.email
    end

    def find_verified_user
      # binding.pry
      # should check for exact user here
      if verified_user = env['warden'].user
        verified_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
