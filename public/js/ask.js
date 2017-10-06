$(document).ready(function(){

  // declare variables
  var $askBtn = $('.ask-btn');
  var $askInput = $('.ask-input');
  var $responseText = $('.response-text');

  // functions
  function executeAsk( questionText ) {
    $.ajax({
      method: 'POST',
      url: '/api/ask/' + encodeURIComponent( questionText ),
      success: function( data ) {
        $responseText.slideUp(function(){
          $responseText.html( data.answer );
          $responseText.slideDown();
        });
      }
    });
  }

  // setup events
  $askBtn.on('click', function() {
    // get value of the user input
    var questionText = $askInput.val();

    // handle blank questionText
    if ( questionText !== "" ) {
      // pass to executeAsk
      executeAsk(questionText);
    }
  });

});