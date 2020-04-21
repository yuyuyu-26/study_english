class WordsController < ApplicationController
  before_action :logged_in_user, only: [:new, :index, :create, :destroy]
  
  def index
    #@word = Word.find(params[:id])
    #@word = Word.new
    #@word = Word.find_by(params[:complete])
    #@word.update_attributes(:complete, "true")
    #@words = Word.paginate(page: params[:page], per_page: 10)
    @words = Word.paginate(page: params[:page], per_page: 10).where(complete: false)
     #if @word.complete.checked_value == "true"
      # @word.update_attributes(:complete, "true")
     #else @word.complete.unchecked_value == "false"
     #  @word.update_attributes(:complete, "false")
     #end
  end
  
  def new
    #@word = Word.new
    @word = current_user.words.build if logged_in?
  end
  
  def create
    @word = current_user.words.build(word_params)
    if @word.save
      flash[:success] = "単語を作成しました"
      redirect_to "/words/new"
      #render "new"
    else
      render 'new'
    end
  end

  def destroy
  end
  
  def update
    #word = Word.find_by(params[:complete])
    word = Word.find(params[:id])
    if word.update_attributes(word_params)
      if word.complete?
        redirect_to "/words"
      else !word.complete?
        redirect_to "/practice"
      end
    end
  end
  
  def practice
    #word = Word.find(params[:id])
    #@answers_page = Word.paginate(page: params[:page], per_page: 10)
    @answers = Word.paginate(page: params[:page], per_page: 10).where(complete: true)
  end
  
  def answer
  end
  
  
  private

    def word_params
      params.require(:word).permit(:english, :japanese, :complete)
    end
end
