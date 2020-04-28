require 'rails_helper'
RSpec.describe PagesController, type: :request do
  
  let(:user) { create(:user) }
  describe "Get #home" do
    it "正常なレスポンスが返ってくる" do
      get root_url
      expect(response).to be_success
    end
    it "リクエストは200 OKとなること" do
      get root_url
      expect(response.status).to eq 200
    end
  end
  
end