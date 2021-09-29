FactoryBot.define do
  factory :game do
    starter { FactoryBot.build(:user) }
    participator { }
  end
end
