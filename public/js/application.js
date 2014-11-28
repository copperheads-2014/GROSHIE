$(document).ready(function () {

  $("#add_question").click(function() {
    $("#questionForm").append($("#questionTmpl").clone());
  });

  // send an HTTP DELETE request for the sign-out link
  $('a#sign-out').on("click", function (e) {
    e.preventDefault();
    var request = $.ajax({ url: $(this).attr('href'), type: 'delete' });
    request.done(function () { window.location = "/"; });
  });

  $('#add_question').click(function(event) {
    event.preventDefault();
    var request = $.ajax({ url: '/questions', type: 'get'});
    request.done(function(response) {
      console.log(response)
      $("#submit_form").before(response);
    });
  })

});
