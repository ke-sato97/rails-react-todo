class Todo < ApplicationRecord
  validate :title, presence: true, length: { maximum: 140 }
end
