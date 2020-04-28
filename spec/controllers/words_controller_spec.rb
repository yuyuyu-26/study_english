require 'rails_helper'
include SessionsHelper
RSpec.describe WordsController, type: :controller do
  
  describe 'Get #index' do
    let(:user) { create(:user) }
    let(:word) { create(:word, user: user) }
    
    it 'リクエストが成功すること' do
      log_in(user)
      get :index
      expect(response.status).to eq 200
    end
  end
  
  describe 'Get #practice' do
    let(:user) { create(:user) }
    let(:word2) { create(:word2, user: user) }
    
    it 'リクエストが成功すること' do
      log_in(user)
      get :practice
      expect(response.status).to eq 200
    end
  end
  
  describe 'Get #new' do
    let(:user) { create(:user) }
    before do
      log_in(user)
      get :new
    end
    
    it 'リクエストは200 OKとなること' do
      expect(response.status).to eq 200
    end
    it 'userに新しいユーザーを割り当てること' do
      expect(assigns(:word)).to be_a_new(Word)
    end
    it 'newテンプレートを表示すること' do
      expect(response).to render_template :new
    end
  end
  
  describe 'Post #create' do
    context '有効なパラメータの場合' do
      let(:user) { create(:user) }
      let(:word) { attributes_for(:word) }
      before do
        log_in(user)
      end
      it 'リクエストは302 リダイレクトとなること' do
        post :create, params: { word: word }
        expect(response.status).to eq 302
      end
      it 'データベースに新しい単語が登録されること' do
        expect{
          post :create, params: { word: word }
        }.to change(Word, :count).by(1)
      end
      it 'newにリダイレクトすること' do
        post :create, params: { word: word }
        expect(response).to redirect_to "/words/new"
      end
    end
    
    context '無効なパラメータの場合' do
      let(:user) { create(:user) }
      let(:miss) { attributes_for(:miss) }
      before do
        log_in(user)
        post :create, params: { word: miss }
      end
      it 'リクエストは200 OKとなること' do
        expect(response.status).to eq 200
      end
      it 'データベースに新しい単語が登録されないこと' do
        expect{
          post :create, params: { word: miss }
        }.not_to change(Word, :count)
      end
      it 'newテンプレートを再表示すること' do
        expect(response).to render_template :new
      end
    end
  end
    
  describe 'Patch #update' do
    context '存在する単語の場合' do
      let(:user) { create :user }
      let(:word) { create :word, user: user }
      let(:upword) { attributes_for(:upword) }
      let(:word1) { attributes_for(:word1) }
      before do
        log_in(user)
        patch :update, params: {id: word, word: upword }
      end
      context '有効なパラメータの場合' do
        it 'リクエストは302 リダイレクトとなること' do
          expect(response.status).to eq 302
        end
        it 'データベースの単語が更新されること' do
          expect do
            patch :update, params: {id: word, word: word1 }
          end.to change { Word.find(word.id).complete }.from(true).to(false)
        end
        it 'words#indexにリダイレクトすること' do
          expect(response).to redirect_to "/words" 
        end
      end
    end
  end
  
  describe 'Get #practice' do
    let(:user) { create(:user) }
    before do
      log_in(user)
      get :question
    end
    it 'リクエストが成功すること' do
      expect(response.status).to eq 200
    end
    it 'questionテンプレートを再表示すること' do
      expect(response).to render_template :question
    end
  end
end