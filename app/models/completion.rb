class Completion < ActiveRecord::Base
  belongs_to  :responder, class_name: "User"
  belongs_to  :survey
  has_many    :responses
end
