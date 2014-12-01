get '/surveys/index' do
  @surveys = Survey.all

  erb :"surveys/index"
end

get '/surveys/new' do
  erb :'surveys/new'
end

post '/surveys' do
  create_survey(params)
  redirect '/'
end

get '/my_surveys/show' do
  current_user
  erb :"surveys/user_show"
end


post '/my_surveys/toggle' do
  @survey = Survey.find(params[:survey_id])
  if @survey.active == true
    @survey.update(active: false)
  else
    @survey.update(active: true)
  end
end

get '/questions' do
  erb :'/surveys/_question', layout: false if request.xhr?
end

post '/questions' do
  Question.create(body: params[:question], survey_id: "#{@survey.id}")
end

get '/statistics/:id' do
  @survey = Survey.find(params[:id])

  erb :"statistics/show"
end

get '/surveys/:id' do
  find_user_and_survey

  erb :"surveys/show"
end

post '/surveys/:id/begin' do
  find_user_and_survey
  @user.completions << Completion.create(started_at: Time.now, survey_id: @survey.id)
  content_type :json
  {length: @survey.questions.length}.to_json
end

post '/surveys/:id/end' do
  find_user_and_survey
  find_completion
  @completion.update(ended_at: Time.now)
  redirect '/'
end

post '/surveys/:id/responses' do
  # unless params[:user_selection] == ""
    find_user_and_survey
    find_completion
    @question = @survey.questions.find(params[:question_id])
    choice = params[:user_selection].strip
    @choice = @question.choices.find_by(body: choice)
    @completion.responses << Response.create(choice_id: @choice.id)
  # end
  # @completion.responses << Response.create(choice_id: )
end

# This loads new questions to the survey show page.
get '/surveys/:id/:question_index' do
    if request.xhr?
      @survey = Survey.find(params[:id])
      @question = @survey.questions[params[:question_index].to_i]
      @question_id = @question.id
      erb :"surveys/_show_question", layout: false
    end
end





