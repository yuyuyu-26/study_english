FactoryBot.define do
  
  factory :word do
    english {"japan"}
    japanese {"日本"}
    complete {"false"}
    id {1}
    user_id {1}
    association :user
  end
  
  factory :word2, class: Word do
    english {"practice"}
    japanese {"練習"}
    complete {"true"}
    id {2}
    user_id {1}
    association :user
  end
  
  factory :miss, class: Word do
    english {""}
    japanese {""}
    complete {""}
    user_id {}
    association :user
  end
  
  factory :upword, class: Word do
    complete {"true"}
  end
  
  factory :word1, class: Word do
    complete {"false"}
  end
  
  
end