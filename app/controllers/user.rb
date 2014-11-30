get '/users/new' do
  @user = User.new
  erb :sign_up
end

post '/users' do
  @user = User.new params[:user]
  if @user.save
    session[:user_id] = @user.id
    redirect '/'
  else
    erb :sign_up
  end
end
