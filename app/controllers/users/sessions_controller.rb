module Users
  # Sessions controller
  class SessionsController < Devise::SessionsController
    # GET /resource/sign_in
    def new
    end
    
    # POST /resource/sign_in
    def create
      user = User.find_by_username(params[:username])
      if user
        if user.valid_password?(params[:password])
          sign_in(:user, user)
          redirect_to resolve_redirection_url
        else
          flash[:notice] = 'Contraseña invalida'
          redirect_to root_url
        end
      else
        flash[:notice] = 'Usuario invalido'
        redirect_to root_url
      end
    end

    # DELETE /resource/sign_out
    def destroy
      sign_out(:user)
      flash[:message] = 'Salida exitosa del sistema'
      redirect_to root_url
    end
  end
end
  