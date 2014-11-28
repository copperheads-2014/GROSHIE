class Response < ActiveRecord::Base
  belongs_to  :completion
  belongs_to  :choice
end
