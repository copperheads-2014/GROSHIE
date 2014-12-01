$(document).ready(function () {

  var get_question_index = 0
  var survey_length;
  var selection = {};
  selection.user_selection = "";

  //////////////////Making the Survey//////////////////////

  $(".add_question").click(function(e) {
    e.preventDefault();
    $("#questionForm ol").append($.templates("#questionTmpl").render())
  });

  $("#minus_question").click(function(e) {
    e.preventDefault();
    $("#questionForm ol > li:last-child").remove()
  });

  $("#questionForm").on('click', '.delete_question', function(e) {
    e.preventDefault();
    $(this).parent().remove()
  });


  $("#questionForm").on('click', '.add_answer', function(e) {
    e.preventDefault();
    $(this).parent().find("ul").append($.templates("#answerTmpl").render())
  });

  $("#questionForm").on('click', '.delete_answer', function(e) {
    e.preventDefault();
    $(this).parent().remove()
  });


  //////////////////Making the Survey Inactive//////////////////////

  $(".admin_surveys").on('click', '.toggle_survey', function(e) {
    e.preventDefault();
    var survey_to_toggle = {}
    var $active_survey = $(this).parent().siblings().eq(3);
    survey_to_toggle.survey_id = $(this).parent().siblings().eq(2).val();
    var deactivate_request = $.ajax({
      url: '/my_surveys/toggle',
      type: 'post',
      dataType: 'json',
      data: survey_to_toggle
    });
    if ($active_survey.text() == "active: true") {
        $active_survey.text("active: false");
      }
      else {
        $active_survey.text("active: true");
      }

  });

  //////////////////Taking the Survey//////////////////////

  // **** START BUTTON CODE BEGIN **** //
  // This starts the survey, creates a completion row in the database, and moves
  // you on to the next question.

  $(".container").on('click', '.start', function(e) {
    e.preventDefault();

    var request = $.get(window.location.pathname + "/" + get_question_index)

    request.done(function(response){
      $('.container').append(response)
    });

    var answer = {
      name: "josh"
    }

    var request2 = $.ajax({
                    url: window.location.pathname+"/begin",
                    type: "POST",
                    dataType: 'json',
                    data: answer
    });


    // This sets the survey length so we can tell when to end the survey.
    request2.done(function(response){
      survey_length = response.length
    });

    $(".start").remove()

  });

  // **** START BUTTON CODE END **** //


  // Here we set the selection variable to whatever radio button is clicked on.
  $(".container").on('click', '.radio', function(e) {
    selection.user_selection = $(this).parent().text();
  });



  // **** NEXT BUTTON CODE BEGIN **** //
  // The code for what happens when the user clicks on the next button.

  $(".container").on('click', '.next', function(e) {
    e.preventDefault();

    if (selection.user_selection == "") {
      alert("ERROR. YOU MUST SELECT A BUTTON, HUMAN.")
      // $('.next').after('             ERROR. YOU MUST SELECT A BUTTON, HUMAN.')
      callbacks.disable()
    }

    // console.log($(".radio").prop("checked", true))

    get_question_index += 1;
    selection.question_id = $(".question_id").attr('value')

    // Ends the survey if the user is past the last question index.
    if(get_question_index >= survey_length) {
      var end_request = $.ajax({
        url: window.location.pathname+"/end",
        type: "POST"
      });
      end_request.done(function(response){
        window.location.pathname="/surveys/index"
      });
    }


    // console.log(selection)


    $("#question_box").remove()

    // This posts to the /surveys/:id/responses path the user selection request.
    // We still need to grab
    var user_selection_request = $.ajax({
                    url: window.location.pathname+"/responses",
                    type: "POST",
                    dataType: 'json',
                    data: selection,
                    success: function (data) {}
    });

    selection.user_selection = "";

    var next_request = $.get(window.location.pathname + "/" + get_question_index)

    next_request.done(function(response){
      $('.container').append(response)
    });

  });

  // **** NEXT BUTTON CODE END **** //

  // standard ajax request:
    // var request = $.ajax({
    //   type: "GET",
    //   url: window.location.pathname + "/" + get_question_index
    // });

  //////////////// send an HTTP DELETE request for the sign-out link //////////////

  $('a#sign-out').on("click", function(e) {
    e.preventDefault();
    var request = $.ajax({ url: $(this).attr('href'), type: 'delete' });
    request.done(function () { window.location = "/"; });
  });

});
