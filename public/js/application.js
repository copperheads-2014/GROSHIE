$(document).ready(function () {

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

  $("#questionForm").on('focusout', 'input:first-child', function(e) {
    var request = $.ajax({url: '/surveys', type: 'post'})
    console.log(this)
  });

  $("#questionForm").on('focusout', 'ol > li', function(e) {
    var request = $.ajax({url: '/questions', type: 'post'})
    console.log(this)
  });

  // $("#questionForm").on('focusout', 'ul > li', function(e) {
  //   var request = $.ajax({url: '/answers', type: 'post'})
  //   console.log(this)
  // });


  $("#questionForm").on('click', '.add_answer', function(e) {
    e.preventDefault();
    $(this).parent().find("ul").append($.templates("#answerTmpl").render())
  });

  $("#questionForm").on('click', '.delete_answer', function(e) {
    e.preventDefault();
    console.log(this)
    $(this).parent().remove()
  });

  // send an HTTP DELETE request for the sign-out link
  $('a#sign-out').on("click", function(e) {
    e.preventDefault();
    var request = $.ajax({ url: $(this).attr('href'), type: 'delete' });
    request.done(function () { window.location = "/"; });
  });

});
