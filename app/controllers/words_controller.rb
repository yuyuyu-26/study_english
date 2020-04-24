class WordsController < ApplicationController
  before_action :logged_in_user, only: [:new, :index, :create, :practice, :answer, :question]
  
  def index
    @words = Word.paginate(page: params[:page], per_page: 10).where(complete: false, user_id: current_user.id)
  end
  
  def new
    @word = current_user.words.build if logged_in?
  end
  
  def create
    @word = current_user.words.build(word_params)
    if @word.save
      flash[:success] = "単語を作成しました"
      redirect_to '/words/new'
    else
      render 'new'
    end
  end
  
  def update
    word = Word.find(params[:id])
    if word.update_attributes(word_params)
      if word.complete?
        redirect_to '/words'
      else !word.complete?
        redirect_to '/practice'
      end
    end
  end
  
  def practice
    @answers = Word.paginate(page: params[:page], per_page: 10).where(complete: true, user_id: current_user.id)
  end
  
  def answer
    words = Word.find(params[:word])
    @answers = []
    words.each do |w|
       @answers << {word: w.english, japan: w.japanese, japanese: w.japanese?(params["word#{w.id}"])}
    end
  end
  
  def question
    @words = Word.where(complete: false, user_id: current_user.id).sample(10)
  end
  
  
  private

    def word_params
      params.require(:word).permit(:english, :japanese, :complete)
    end
end
