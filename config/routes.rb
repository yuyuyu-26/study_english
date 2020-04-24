Rails.application.routes.draw do
 

  get 'sessions/new'

  root 'pages#home'
  get 'pages/home'
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get  '/help',    to: 'users#help'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  get '/practice', to: 'words#practice'
  post '/answers', to: 'words#answer'
  get '/question', to: 'words#question'
  
  
  resources :users
  resources :words, only: [:new, :index, :create, :update]
  
  

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
