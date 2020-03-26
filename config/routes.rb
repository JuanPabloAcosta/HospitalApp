Rails.application.routes.draw do
  
  get 'users/login'

  root 'users#login'
end
