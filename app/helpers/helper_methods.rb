helpers do

  def current_user
    @user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def find_current_survey
    @survey = Survey.find(params[:id])
  end

  def find_user_and_survey
    current_user
    find_current_survey
  end

  def find_completion
    @completion = Completion.where(responder_id: @user.id, survey_id: @survey.id).last
  end

  # I KNOW THIS SUCKS, BUT YOU KNOW WHAT? YOU SUCK.
  def create_survey(params)
    current_user
    @survey = Survey.create(name: params['title'])
    @user.surveys << @survey

    params['survey'][0]['question'].each do |element|
      if element.class == String
        @question = Question.create(body: element)
        @survey.questions << @question
      elsif element.class == Hash
        element.each_value do |choices|
          choices.each do |choice|
            @question.choices << Choice.create(body: choice)
          end
        end
      else
        next
      end

    end

  end

end
