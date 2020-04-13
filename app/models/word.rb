class Word < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true
  validates :english, presence: true, length: { maximum: 30 }
  validates :japanese, presence: true, length: { maximum: 50 }
  default_scope -> { order(english: :desc) }
end
