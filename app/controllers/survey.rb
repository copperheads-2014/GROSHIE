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

get '/questions' do
  erb :'/surveys/_question', layout: false if request.xhr?
end

post '/questions' do
  Question.create(body: params[:question], survey_id: "#{@survey.id}")
end

get '/surveys/:id' do
  find_user_and_survey

  erb :"surveys/show"
end

post '/surveys/:id/begin' do
  find_user_and_survey
  # binding.pry
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
  find_user_and_survey
  find_completion
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





