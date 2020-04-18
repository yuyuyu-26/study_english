Rails.application.routes.draw do
 

  get 'sessions/new'

  root 'pages#home'
  get "pages/home"
  get  '/help',    to: 'static_pages#help'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  get '/practice', to: 'words#practice'
  
  
  resources :users
  resources :words, only: [:new, :index, :create, :destroy, :update]
  
  

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
