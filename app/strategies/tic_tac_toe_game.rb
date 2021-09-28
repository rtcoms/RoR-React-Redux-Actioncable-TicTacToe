require 'set'

class TicTacToeGame
  def initialize(player_attempts)
    @grid_size = 3
    @player_attempts = player_attempts
  end

  def available_spots
    (1..@grid_size**2)
  end

  def winning_combinations
    [
      Set[1, 2, 3],
      Set[4, 5 ,6],
      Set[7, 8, 9],
      Set[1, 4, 7],
      Set[2, 5, 8],
      Set[3, 6, 9],
      Set[1, 5, 9],
      Set[3, 5, 7]
    ]
  end

  def valid_attempt?(attempt_identifier)
    available_spots.include?(attempt_identifier)
  end

  def game_status
    return :started if all_attempts.size.zero?
    return :finished_with_result if has_winning_combinations?(@player_attempts.values.first) || has_winning_combinations?(@player_attempts.values.last)
    return :finished_with_noresult if available_spots.size == all_attempts.size
    return :in_progress
  end

  def winner
    current_game_status = game_status

    raise 'Game not finished' if [:started, :in_progress].include?(current_game_status)
    return nil if current_game_status == :drawn

    @player_attempts.select{|player, attempt| has_winning_combinations?(player) }.keys.first
  end

  def next_player_for_attempt
    return nil if @player_attempts.values.map(&:size).uniq.length == 1

    return @player_attempts.keys.last if @player_attempts.values.last.size < @player_attempts.values.first.size
    return @player_attempts.keys.first if @player_attempts.values.first.size < @player_attempts.values.last.size
  end

  private

  def all_attempts
    [@player_attempts.values.first, @player_attempts.values.last].flatten
  end

  def has_winning_combinations?(attempt_identifiers)
    player_attempt_set = Set.new(attempt_identifiers)

    winning_combinations.any?{ |combination| combination.subset?(player_attempt_set) }
  end
end
