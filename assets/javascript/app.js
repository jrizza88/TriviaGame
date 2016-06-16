//--------------------------------------------------------//
//Load page///
//--------------------------------------------------------//

$(document).ready(function() {



//--------------------------------------------------------//
//Functions///
//--------------------------------------------------------//


/*function startGame(){
$('#start').on('click', function(e) {

  e.preventDefault();
console.log("start the game");
});
}
*/
$(document).one('click', function() {  // .one() helps to set the timer for the entire game
var globalTimer = 40;
var counter = setInterval(timer, 1000);
function timer() {
  globalTimer -=1;
  if (globalTimer == 0) {
    gameQuestions.noAnswer++
    $('#gameOver').html('<p>You\'re out of time!');
    clearInterval(counter);
    $('#next').hide();
    $('#start-over').show();
    $('#quiz-time-left').show();
  }


    /*} else if (globalTimer == answer) {
      gameQuestions.correctAnswer++
      $('#result').html('<p>You\'re Right!</p>');
    } else {
      gameQuestions.wrong++
      $('#result').html('<p>Sorry, that is not correct.</p>');
      $('#'+globalTimer).addClass('wrong');
*/

  $('#quiz-time-left').html('<h2>Time Remaining: ' + globalTimer + ' seconds</h2>');
}
});
//--------------------------------------------------------//
//Variables///
//--------------------------------------------------------//
  var questionCounter = 0; //Tracks question number
  var noAnswer = 0;
  //var correctAnswer = 0;
  //var wrong = 0;
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object


  var gameQuestions = [

  //{
  //  startMenu: "Welcome to the game!" + "<br />" + "click start!"
 // } 


  {
    question: "Which country is the largest on the planet?",
    questionChoices: ["Canada", "Russia", "United States", "China"],
    answer: 1

  },

  {
    question: "Which country has the highest population in the world?",
    questionChoices: ["Brazil", "Nigeria", "China", "India"],
    answer: 2
    
  },

  {
    question: "Which city is the highest populated in the world?",
    questionChoices: ["Tokyo", "Mexico City", "New Delhi", "Shanghai"],
    answer: 0
    
  },

  {
    question: "Which mountain is the closest to the moon?",
    questionChoices: ["Mt. Everest", "Lhotse", "Kangchenjunga", "Mount Chimborazo"],
    answer: 3
    
  },

  {
    question: "Which country in the Middle East is the only one to not have a desert?",
    questionChoices: ["Lebanon", "Syria", "Iran", "Jordan"],
    answer: 0
    
  },

  {
    question: "Which of these countries is the only one not completely surrounded by one other country?",
    questionChoices: ["Lesotho", "Vatican City", "Istanbul", "San Marino"],
    answer: 2
    
  },

  {
    question: "Which country has the greatest number of islands in the world?",
    questionChoices: ["Russia", "Finland", "Sweden", "Tuvalu"],
    answer: 1
    
  }
]

var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
    // alert('You have to choose an answer!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  /*$('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });*/
  
  // Click handler for the 'Start Over' button
  $('#start-over').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start-over').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the gameQuestions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(gameQuestions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < gameQuestions[index].questionChoices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += gameQuestions[index].questionChoices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < gameQuestions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of next and restart
       if(questionCounter === 0){
          
          $('#start').hide();
          $('#next').show();
          $('#start-over').hide();
          $('#quiz-time-left').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#start').hide();
        $('#start-over').show();
        $('#quiz-time-left').hide();
        $('#gameOver').hide();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === gameQuestions[i].answer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 gameQuestions.length + ' right!');
    return score;

   /*
    if (score >=5){
    score.append('You got ' + numCorrect + ' questions out of ' +
                 gameQuestions.length + ' right!!');
    return score;
    console.log('good game!'); 
    }
    
    
    else if (score <=4) {
    score.append('You got ' + numCorrect + ' questions out of ' +
                 gameQuestions.length + ' right.. try again');
    return score;
    console.log('meh game!');
    }

    else {
      score.append('You got ' + numCorrect + ' questions out of ' +
                 gameQuestions.length + ' right.. Terrible');
    
    return score;}
    */
  }

});

