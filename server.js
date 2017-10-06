var fs = require('fs');

var express = require('express');
var bodyParser = require('body-parser');

var myjsonAPI = require('./myjsonAPI.js');

var server = express();

server.set('views', 'views');
server.set('view engine', 'ejs');

// express middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(__dirname + '/public'));

server.get('/', function( req, res ) {
  res.render('ask', {
    dynamicMessage: 'Hello Ask'
  });
});

server.get('/answer', function( req, res ) {

  // get list of unanswered questions
  myjsonAPI.getData( function( databaseJSON ) {
    var unansweredQuestions = [];
    for ( var key in databaseJSON.questions ) {
      var questionValue = databaseJSON.questions[key];
      if ( questionValue === 'ASKED' ) {
        unansweredQuestions.push( key );
      }
    }

    res.render('answer', {
      unansweredQuestions: unansweredQuestions
    });
    return;
  });

});

server.post('/api/ask/:question_text', function( req, res ) {
  var questionText = req.params.question_text;

  myjsonAPI.getData( function( databaseJSON ) {
    // If the question is in our database, return the answer
    if ( databaseJSON.questions[questionText] ) {
      res.send({
        answer: databaseJSON.questions[questionText]
      });
      return;
    }
    // If the question is NOT in our database, add the question in an `ASKED` state,
    databaseJSON.questions[questionText] = 'ASKED';

    myjsonAPI.saveData( databaseJSON );
    res.send({
      answer: 'ASKED'
    });
    return;  
  });

});

server.post('/api/answer/:question_text', function( req, res ) {
  var questionText = req.params.question_text;
  var answer = req.body.answer;

  myjsonAPI.getData( function( databaseJSON ) {
    if ( databaseJSON.questions[questionText] ) {
      databaseJSON.questions[questionText] = answer;

      myjsonAPI.saveData( databaseJSON );
      res.send({
        success: true
      });
      return
    }
    res.send({
      success: false
    });
    return;    
  });
});

server.delete('/api/question/:question_text', function(req, res) {
  var questionText = req.params.question_text;

  myjsonAPI.getData( function( databaseJSON ) {
    if ( databaseJSON.questions[questionText] ) {
      delete databaseJSON.questions[questionText];
      myjsonAPI.saveData( databaseJSON );
      res.send({
        success: true
      });
      return;
    }
   
    res.send({
      success: false
    });
    return;    
  });

});

server.get('/ping', function( req, res ) {
  res.send('pong');
});

server.get('/hello', function( req, res ) {
  res.render('hello', {
    dynamicMessage: 'This is a dynamic server message'
  });
});

server.listen( 3000, function() {
  console.log('Web server is listening on port 3000');
});