$(document).ready(function () {

  $("#add_question").click(function(e) {
    e.preventDefault();
    $("#questionForm ol").append($.templates("#questionTmpl").render())
  });


  $("#questionForm").on('click', '.add_answer', function(e) {
    e.preventDefault();
    console.log()
    $(this).parent().find("ul").append($.templates("#answerTmpl").render())
  });
});

  // send an HTTP DELETE request for the sign-out link
  $('a#sign-out').on("click", function(e) {
    e.preventDefault();
    var request = $.ajax({ url: $(this).attr('href'), type: 'delete' });
    request.done(function () { window.location = "/"; });
  });

});
