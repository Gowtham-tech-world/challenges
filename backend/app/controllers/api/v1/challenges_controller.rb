module Api
    module V1
      class ChallengesController < ApplicationController
        before_action :authenticate_user!, only: [:create, :update, :destroy]
        before_action :set_challenge, only: [:update, :destroy]
        before_action :authorize_admin, only: [:create, :update, :destroy]
  
        # GET /api/v1/challenges
        def index
          challenges = Challenge.all
          render json: challenges
        end
  
        # GET /api/v1/challenges/:id
        def show
          render json: @challenge
        end
  
        # POST /api/v1/challenges
        def create
          puts"==========="
          puts current_user.id
          puts current_user.email
          puts"==========="
          challenge = Challenge.new(challenge_params.merge(user_id: current_user.id))
          if challenge.save
            render json: challenge, status: :created
          else
            render json: { errors: challenge.errors.full_messages }, status: :unprocessable_entity
          end
        end
  
        # PATCH/PUT /api/v1/challenges/:id
        def update
          if @challenge.update(challenge_params)
            render json: @challenge
          else
            render json: { errors: @challenge.errors.full_messages }, status: :unprocessable_entity
          end
        end
  
        # DELETE /api/v1/challenges/:id
        def destroy
          @challenge.destroy
          head :no_content
        end
  
        private

        def authorize_admin
          render json:{ message: "Forbidden action !!" } unless current_user.email=="admin@gmail.com"
        end
  
        def set_challenge
          @challenge = Challenge.find(params[:id])
        end
  
        def challenge_params
          params.require(:challenge).permit(:title, :description, :start_date, :end_date)
        end
      end
    end
  end
  