Rails.application.routes.draw do
  mount ActionCable.server => '/websocket'
  namespace :api do
    namespace :v1 do
      resources :games
      get '/current_user' => 'users#profile'
    end
  end
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  get '/app' => 'app#index'
  get '/app/*path' => 'app#index'
end
