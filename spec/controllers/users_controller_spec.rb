require 'rails_helper'
include SessionsHelper
RSpec.describe UsersController, type: :controller do

  describe 'Get #new' do
    before do
      get :new
    end
    it 'リクエストは200 OKとなること' do
      expect(response.status).to eq 200
    end
    it 'userに新しいユーザーを割り当てること' do
      expect(assigns(:user)).to be_a_new(User)
    end
    it 'newテンプレートを表示すること' do
      expect(response).to render_template :new
    end
  end
  
  describe 'Get #edit' do
    let(:user) { create(:user) }
    before do
      log_in(user)
      get :edit, params: { id: user.id }
    end
    it 'リクエストは200 OKとなること' do
      expect(response.status).to eq(200)
    end
    it 'editテンプレートを表示すること' do
      expect(response).to render_template :edit
    end
  end
  
  describe 'Get #show' do
    let(:user) { create(:user) }
    let(:other) { create(:other) }

    context 'ユーザーが存在する場合' do
      before do
        log_in(user)
        get :show, params: { id: user.id }
      end
      it 'リクエストは200 OKとなること' do
        expect(response.status).to eq 200
      end
      it 'userに要求されたユーザーを割り当てること' do
        expect(assigns(:user)).to eq user
      end
      it 'showテンプレートを表示すること' do
        expect(response).to render_template :show
      end
    end
    
    #let(:user) { create(:user) }
    #let(:other) { create(:other) }
    
    context 'ユーザーが存在しない場合' do
      before do
        log_in(user)
        get :show, params: { id: other.id }
      end
      it 'ルートにリダイレクトされること' do
        expect(response.status).to redirect_to root_path
      end
    end
  end
  
  describe 'Post #create' do
    context '有効なパラメータの場合' do
      let(:user) { attributes_for(:user) }
      it 'リクエストは302 リダイレクトとなること' do
        post :create, params: { user: user }
        expect(response.status).to eq 302
      end
      it 'データベースに新しいユーザーが登録されること' do
        expect{
          post :create, params: { user: user }
        }.to change(User, :count).by(1)
      end
      it 'rootにリダイレクトすること' do
        post :create, params: { user: user }
        expect(response).to redirect_to user_path(user[:id]) 
      end
    end
    
    context '無効なパラメータの場合' do
      let(:fake) { attributes_for(:fake) }
      before do
        post :create, params: { user: fake }
      end
      it 'リクエストは200 OKとなること' do
        expect(response.status).to eq 200
      end
      it 'データベースに新しいユーザーが登録されないこと' do
        expect{
          post :create, params: { user: fake }
        }.not_to change(User, :count)
      end
      it 'newテンプレートを再表示すること' do
        expect(response).to render_template :new
      end
    end
  end
  
  describe 'Patch #update' do
    context '存在するユーザーの場合' do
      let(:user) { create :user }
      let(:katuo) { attributes_for(:katuo) }
      let(:satoshi) { attributes_for(:satoshi) }
      before do
        log_in(user)
        patch :update, params: {id: user, user: katuo }
      end
      context '有効なパラメータの場合' do
        it 'リクエストは302 リダイレクトとなること' do
          expect(response.status).to eq 302
        end
        it 'データベースのユーザーが更新されること' do
          expect do
            patch :update, params: {id: user, user: satoshi }
          end.to change { User.find(user.id).name }.from('katuo').to('satoshi')
        end
        it 'users#showにリダイレクトすること' do
          expect(response).to redirect_to user_path(user[:id]) 
        end
      end
    end
    
    context 'パラメータが不正な場合' do
      let(:user) { create :user }
      let(:nuser) { attributes_for(:user, :invalid) }
      before do
        log_in(user)
        put :update, params: { id: user, user: nuser }
      end
      it 'リクエストが成功すること' do
        expect(response.status).to eq 200
      end
      it 'ユーザー名が変更されないこと' do
        expect do
          put :update, params: { id: user, user: nuser }
        end.to_not change(User.find(user.id), :name)
      end
      it 'editテンプレートで表示されること' do
        expect(response).to render_template :edit
      end
      it 'エラーが表示されること' do
        expect(assigns(:user).errors.any?).to be_truthy
      end
    end
  end
end