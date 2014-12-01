class Choice < ActiveRecord::Base
  belongs_to  :question
  has_many    :responses

  def num_times_chosen
    Response.where(choice_id: id).length
  end
end
