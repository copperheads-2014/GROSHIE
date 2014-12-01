class Question < ActiveRecord::Base
  has_many  :choices
  belongs_to  :survey

  def num_of_votes
    total = 0
    choices.each do |choice|
      total += choice.num_times_chosen
    end
    return total
  end

  def assign_percentage(choice)
    ((choice.num_times_chosen.to_f/num_of_votes.to_f)*100).round
  end

end
