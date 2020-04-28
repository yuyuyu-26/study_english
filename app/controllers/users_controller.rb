class UsersController < ApplicationController
  before_action :logged_in_user, only: [:edit, :update, :show, :help]
  before_action :correct_user,   only: [:edit, :update, :show]
  
  def new
    @user = User.new
  end
  
  def show
    @user = User.find(params[:id])
    @words = @user.words
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "英単語学習アプリへようこそ！"
      redirect_to @user
    else
      render 'new'
    end
  end
  
  def edit
    @user = User.find(params[:id])
  end
  
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:success] = "プロフィールが更新されました"
      redirect_to @user
    else
      render 'edit'
    end
  end
  
  def help
  end
  
  private

    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation, :image_name)
    end
    
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end
end
