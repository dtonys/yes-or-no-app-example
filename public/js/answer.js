$(document).ready(function(){
  // declare variables
  var $unansweredQuestions = $('.unanswered-questions')

  // functions
  function answerYes( questionText ){
    $.ajax({
      method: 'POST',
      url: '/api/answer/'+ encodeURIComponent( questionText ),
      data: {
        answer: 'YES'
      }
    });
  }
  function answerNo( questionText ){
    $.ajax({
      method: 'POST',
      url: '/api/answer/'+ encodeURIComponent( questionText ),
      data: {
        answer: 'NO'
      }
    });
  }
  function deleteQuestion( questionText ){
    $.ajax({
      method: 'DELETE',
      url: '/api/question/'+ encodeURIComponent( questionText )
    });    
  }

  // setup events
  $unansweredQuestions
    .on('click', '.btn-success', function( event ){
      var $target = $(event.currentTarget);
      var $row = $target.closest('.row');
      var questionText = $row.find('h3').html().trim();
      answerYes( questionText );
      $row.slideUp();
    })
    .on('click', '.btn-danger', function( event ){
      var $target = $(event.currentTarget);
      var $row = $target.closest('.row');
      var questionText = $row.find('h3').html().trim();
      answerNo( questionText );
      $row.slideUp();
    })
    .on('click', '.btn-secondary', function( event ){
      var $target = $(event.currentTarget);
      var $row = $target.closest('.row');
      var questionText = $row.find('h3').html().trim();
      deleteQuestion( questionText );
      $row.slideUp();
    });
});