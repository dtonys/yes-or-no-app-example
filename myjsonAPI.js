var request = require('request');

var myjsonUrl = 'https://api.myjson.com/bins/g88at';

function getData( callback ) {

  var options = {
    method: 'GET',
    url: myjsonUrl,
    json: true
  };

  request( options, function( error, response, body ){
    console.log( body );
    callback( body );
  });

}


function saveData( updatedData, callback ) {

  // var existingValue = { questions: 
  //    { 'question 1': 'YES',
  //      'question 2': 'NO',
  //      'question 2.5': 'NO',
  //      'question 3': 'YES',
  //      'Is the moon blue': 'YES',
  //      'is something true or false': 'NO',
  //      'question 10': 'YES',
  //      'question 11': 'ASKED',
  //      'question 20': 'YES',
  //      'question 22': 'ASKED',
  //      'question 30': 'ASKED',
  //      'Is black a color': 'ASKED',
  //      'Is blue a color?': 'YES',
  //      'Is the earth made of chocolate?': 'NO',
  //      'afoij dfoijf ofij foij f': 'ASKED' } };

  var options = {
    method: 'PUT',
    url: myjsonUrl,
    body: updatedData,
    json: true
  };

  request( options, function( error, response, body ){
    console.log( body );
    if ( callback ) {
      callback( body );
    }
  });

}

module.exports = {
  getData: getData,
  saveData: saveData
};

