Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  get '/app' => 'app#index'
  get '/app/*path' => 'app#index'
end
