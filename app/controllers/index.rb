get '/' do
  # render home page
  @surveys = Survey.all


  erb :index
end

#----------- SURVEYS ------------

get '/surveys/new' do
  erb :'surveys/new'
end

post '/surveys' do
  create_survey(params)
  # @survey = Survey.create(name: params[:title])
  # @output = params[:survey]
  redirect '/'
end

get '/surveys/:id' do
  @user = User.find(session[:user_id])
  @survey = Survey.find(params[:id])

  erb :"surveys/show"


end

get '/questions' do
  erb :'/surveys/_question', layout: false if request.xhr?

end

post '/questions' do
  Question.create(body: params[:question], survey_id: "#{@survey.id}")
end

#----------- SESSIONS -----------

get '/sessions/new' do
  # render sign-in page
  @email = nil
  erb :sign_in
end

post '/sessions' do
  # sign-in
  @email = params[:email]
  user = User.authenticate(@email, params[:password])
  if user
    # successfully authenticated; set up session and redirect
    session[:user_id] = user.id
    redirect '/'
  else
    # an error occurred, re-render the sign-in form, displaying an error
    @error = "Invalid email or password."
    erb :sign_in
  end
end

delete '/sessions/:id' do
  # sign-out -- invoked via AJAX
  return 401 unless params[:id].to_i == session[:user_id].to_i
  session.clear
  200
end


#----------- USERS -----------

get '/users/new' do
  # render sign-up page
  @user = User.new
  erb :sign_up
end

post '/users' do
  # sign-up
  @user = User.new params[:user]
  if @user.save
    # successfully created new account; set up the session and redirect
    session[:user_id] = @user.id
    redirect '/'
  else
    # an error occurred, re-render the sign-up form, displaying errors
    erb :sign_up
  end
end
