Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :games
    end
  end
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  get '/app' => 'app#index'
  get '/app/*path' => 'app#index'
end
