FactoryBot.define do
  
  factory :user do
    name {"assasin"}
    email {"caster@seihai.com"}
    password {"caster"}
    password_confirmation {"caster"}
    image_name {"default.png"}
    id {1}
      trait :invalid do
        name {nil}
      end
  end
  
  factory :other, class: User do
    name {"kirutugu"}
    email {"airi@seihai.com"}
    password {"airisu"}
    password_digest {"airisu"}
    id {2}
  end
  
  factory :fake, class: User do
    name {""}
    email {""}
    password {""}
    password_digest {""}
    id {3}
  end
  
  factory :satoshi, class: User do
    name {"satoshi"}
    email {"satoshi@example.com"}
  end
  
  factory :katuo, class: User do
    name {"katuo"}
    email {"katuo@example.com"}
  end
  
end
