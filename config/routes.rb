Rails.application.routes.draw do
  root 'users#login'

  get 'client_selector', to: 'users#client_selector'
  get 'doctor_selector', to: 'users#doctor_selector'
  get 'client_profile', to: 'users#client_profile'
  get 'registration', to: 'users#registration'
  get 'medical_appointments', to: 'users#medical_appointments'
end
