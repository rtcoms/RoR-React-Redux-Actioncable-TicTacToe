require "test_helper"

class Api::V1::GamesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get api_v1_games_home_url
    assert_response :success
  end

  test "should get app" do
    get api_v1_games_app_url
    assert_response :success
  end
end
