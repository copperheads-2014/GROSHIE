$(document).ready(function () {

  var get_question_index = 0

  $(".add_question").click(function(e) {
    e.preventDefault();
    // var target=$(this)
    // var request = $.post('/questions', target.serialize(),null,'json')

    // console.log(target)
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
    console.log(this)
    $(this).parent().remove()
  });

  $(".container").on('click', '.start', function(e) {
    e.preventDefault();
    var request = $.ajax({
      type: "GET",
      url: window.location.pathname + "/" + get_question_index
    });
    request.done(function(response){
      $('.container').append(response)
      });
    $(".start").remove()
  })

  $(".container").on('click', '.next', function(e) {
    e.preventDefault();
    get_question_index += 1;
    $("#question_box").remove()
    var request = $.ajax({
      type: "GET",
      url: window.location.pathname + "/" + get_question_index
    });
    request.done(function(response){
      $('.container').append(response)
      });


    // get_question_index is defined at the top of the file.
    // console.log(window.location.pathname + "/" + get_question_index)
    // $.get('/surveys/')
  });



  // send an HTTP DELETE request for the sign-out link
  $('a#sign-out').on("click", function(e) {
    e.preventDefault();
    var request = $.ajax({ url: $(this).attr('href'), type: 'delete' });
    request.done(function () { window.location = "/"; });
  });

});
