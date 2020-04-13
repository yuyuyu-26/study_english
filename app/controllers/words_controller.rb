class WordsController < ApplicationController
  before_action :logged_in_user, only: [:new, :index, :create, :destroy]
  
  def index
    #@words = Word.find(params[:id])
    @words = Word.paginate(page: params[:page])
  end
  
  def new
    #@word = Word.new
    @word = current_user.words.build if logged_in?
  end
  
  def create
    @word = current_user.words.build(word_params)
    if @word.save
      flash[:success] = "単語を作成しました"
      render "new"
    else
      render 'new'
    end
  end

  def destroy
  end
  
  private

    def word_params
      params.require(:word).permit(:english, :japanese)
    end
end
