# frozen_string_literal: true

# class Users::SessionsController < Devise::SessionsController
#   include RackSessionFix
#   respond_to :json

#   private

#   def respond_with(resource, _opts = {})
#     render json: { message: 'Logged in sucessfully.', data: resource }, status: :ok
#   end

#   def respond_to_on_destroy
#     if current_user
#       render json: {
#         message: "logged out successfully"
#       }, status: :ok
#     else
#       render json: {
#         message: "Couldn't find an active session."
#       }, status: :unauthorized
#     end
#   end
# end


class Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: {
      message: 'Logged in successfully.',
      user: resource,
      token: request.env['warden-jwt_auth.token'] 
    }, status: :ok
  end

  def respond_to_on_destroy
    # Devise + JWT is stateless, so current_user is usually nil here.
    # Just return 200 to indicate the token was "deleted" on client side.
    render json: {
      message: "Logged out successfully"
    }, status: :ok
  end
end
