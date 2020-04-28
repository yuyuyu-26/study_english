require 'rails_helper'
RSpec.describe Word, type: :model do
  describe '単語確認' do
    it "has a valid factory" do
      expect(build(:word)).to be_valid
    end
  end

  describe '単語なし無効' do
    it "is invalid without a word english" do
      word = build(:word, english: nil)
      word.valid?
      expect(word.errors[:english]).to include("can't be blank")
    end
  end
  
  describe '和訳なし無効' do
    it "is invalid without a word japanese" do
      word = build(:word, japanese: nil)
      word.valid?
      expect(word.errors[:japanese]).to include("can't be blank")
    end
  end
end