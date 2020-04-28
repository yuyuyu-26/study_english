require 'rails_helper'
RSpec.describe User, type: :model do
  describe 'ユーザー確認' do
    it "has a valid factory" do
      expect(build(:user)).to be_valid
    end
  end
  
  describe '名無しユーザー無効' do
    it "is invalid without name" do
      user = build(:user, name: nil)
      user.valid?
      expect(user.errors[:name]).to include("can't be blank")
    end
  end
  
  describe 'メールアドレスなしユーザー無効' do
    it "is invalid without  email" do
      user = build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end
  end
  
  describe 'パスワードなしユーザー無効' do
    it "is invalid without  password" do
      user = build(:user, password: nil)
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end
  end
  
  describe 'メールアドレス重複ユーザー無効' do
    it "is invalid duble email" do
      user = create(:user)
      other = build(:user)
      other.valid?
      expect(other.errors[:email]).to include("has already been taken")
    end
  end
end