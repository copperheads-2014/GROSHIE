helpers do

  def current_user
    @user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def create_survey(params)
    @user = User.find(session[:user_id])
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
