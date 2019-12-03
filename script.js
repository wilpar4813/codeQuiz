// ON CLICK EVENT FOR START BUTTON TO LOAD A QUESTION AND HIDE THE START BUTTON 
$(".btn-dark").on("click", function () {
    // remove homepage from view 
    $(".card").hide();
    console.log("user clicked start");
    //Get the first question
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 75")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;
    quizQuestion.getQuestion();

})

// ON CLICK FOR RESET BUTTON - RESETS GAME
$(".btn-secondary").on("click", function () {
    console.log("user clicked Restart");
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 75")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;

    quizQuestion.getQuestion();
})

$("#submitInitials").on("click", function () {
    console.log("user clicked submit initials for high scores");
    $(".highScorePage").show();
    quizQuestion.highScorePage();
})

$("#resetScores").on("click", function () {
    console.log("user clicked reset high scores");
    localStorage.clear();
    $("#hsArray").hide();
})

$("#goBack").on("click", function () {
    console.log("user clicked to return from high scores high scores");
    clearInterval(quizQuestion.countDownTimer);
    $(".question-display").hide();
    $("#button-display").hide();
    $(".highScorePage").hide();
    $(".card").show();
    $(".timer").show();
    $(".timer").html("Time: 75");

    $(".highScore").show();
    $("#hsArray").empty();

})


//Determine high score to be replaced
$(".highScore").on("click", function () {
    console.log("user clicked highScore");
    quizQuestion.counter = 0;
    quizQuestion.highScorePage();
})


// ON CLICK FOR ANSWER BUTTONS
$("#button-display").on("click", ".answerButton", function (e) {
    // answerButton.clicked(e); 
    var selectedAnswer = $(e.target).attr("data-name");
    console.log(e);
    console.log(e.target);
    console.log(e.target.data);
    console.log($(e.target).attr("data-name"));
    quizQuestion.checkAnswer(selectedAnswer);
})

// Global Variables
var Counter = 0;
var hrLine = document.createElement("hr");
var highScore = 0;
var quizQuestion = {
    // current question
    currentQuestion: "",
    // correct answers 
    correctGuesses: 0,
    // incorrect answers 
    incorrectGuesses: 0,
    // counter 
    counter: 0,
    countDownTimer: null,
    // question number 
    questionNumber: 0,


    // QUESTIONS OBJECT WHICH INCLUDES AN ARRAY OF QUESTIONS
    // Questions from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JavaScript
    questions: [
        {
            // question text
            questionText: "Inside which HTML element do we put the JavaScript?",
            // question answers array
            questionAnswer: ["1.  <scripting>", "2.  <script>", "3.  <js>", "4.  <javascript>"],
            // correct answer 
            answer: "2.  <script>"
        },
        {
            questionText: "Where is the correct place to insert a JavaScript?",
            questionAnswer: ["1.  Both in the <head> section and the <body> section are correct", "2.  The <head> section", "3.  The <body> section", "4.  The <javascript> section"],
            answer: "1.  Both in the <head> section and the <body> section are correct"
        },
        {
            questionText: 'What is the correct syntax for referring to an external script called "xxx.js"?',
            questionAnswer: ['1.  <script name="xxx.js">', '2.  <script src="xxx.js">', '3.  <script href="xxx.js">', '4.  <script call="xxx.js">'],
            answer: '2.  <script src="xxx.js">',
        },
        {
            questionText: 'How do you write "Hello World" in an alert box?',
            questionAnswer: ['1.  msg("Hello World");', '2.  msgBox("Hello World");', '3.  alert("Hello World");', '4.  alertBox("Hello World");'],
            answer: '3.  alert("Hello World");',
        },
        {
            questionText: "How do you create a function in JavaScript?",
            questionAnswer: ["1.  function myFunction[]", "2.  function = myFunction()", "3.  function:myFunction()", "4.  function myFunction()"],
            answer: "2.  function = myFunction()",
        },
        {
            questionText: 'How do you call a function named "myFunction"?',
            questionAnswer: ["1.  call function myFunction()", "2.  call myFunction()", "3.  myFunction()", "4.  function.myFunction()"],
            answer: "3.  myFunction()",
        },
        {
            questionText: "How to write an IF statement in JavaScript?",
            questionAnswer: ["1.  if(i==5)", "2.  if i==5 then", "3.  if i = 5", "4.  if i = 5 then"],
            answer: "1.  if(i==5)",
        },
        {
            questionText: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
            questionAnswer: ["1.  if(i <> 5)", "2.  if i <> 5", "3.  if i =! 5 then", "4.  if (i != 5)"],
            answer: "4.  if (i != 5)",
        },
        {
            questionText: "How does a WHILE loop start?",
            questionAnswer: ["1.  while (i <= 10)", "2.  while i = 1 to 10", "3.  while(i <= 10; i++)", "4.  while i <= 10"],
            answer: "1.  while (i <= 10)",
        },
        {
            questionText: "How can you add a comment in a JavaScript?",
            questionAnswer: ["1.  <!--This is a comment-->", '"2.  This is a comment"', "3.  //This is a comment", "4.  ***This is a comment***"],
            answer: "3.  //This is a comment",
        },
    ],

    run: function () {
        clearInterval(this.countDownTimer);
        this.countDownTimer = setInterval(this.decrement, 1000);
        quizQuestion.counter = 75;
    },

    decrement: function () {
        quizQuestion.counter--;
        $(".timer").html("Time: " + quizQuestion.counter);
        if (quizQuestion.counter <= 0) {
            quizQuestion.counter = 0;
            clearInterval(quizQuestion.countDownTimer);
            quizQuestion.finalPage();
            $(".question-display").hide();
            $("#button-display").hide();
        }
    },

    // GET QUESTION METHOD
    getQuestion: function () {
        
        // clear and hide a bunch of things when the question loads
        $(".question-display").empty();
        $(".areYouRight").empty();
        $(".ready").empty();
        // display question 
        $(".question-display").html("<p>" + this.questions[this.questionNumber].questionText + "</p>");
        this.buttonGenerator();
    },

    //BUTTON GENERATOR METHOD 
    buttonGenerator: function () {
        //empty buttons 
        $("#button-display").empty();
        // for loop to display answer buttons on the screen 
        for (var i = 0; i < this.questions[this.questionNumber].questionAnswer.length; i++) {
            var a = $("<button>");
            a.addClass("answerButton");
            a.attr("data-name", this.questions[this.questionNumber].questionAnswer[i]);
            a.text(this.questions[this.questionNumber].questionAnswer[i]);
            
            $("#button-display").append(a);
            
        };
    },

    // CHECK IF THE ANSWER IS CORRECT, WRONG, OR IF THE QUESTION TIMED OUT (UNDEFINED) 
    checkAnswer: function (selectedAnswer) {
        //determine if the answer is correct 
        console.log(this.questions[this.questionNumber]);

        if (selectedAnswer === this.questions[this.questionNumber].answer) {
            console.log("win");
            // increment the number correct 
            this.correctGuesses++;
            console.log(this.correctGuesses);
            // display win message and image and play sound
            //var foo = "<hr/>";
            //$(".areYouRight").append(foo);// append the hr
            //document.body.appendChild(hrLine);
            $(".areYouRight").html("Correct!");
            // next question 
            this.questionNumber++;
        }
        else {
            console.log("lose");
            // increment incorrect guess 
            this.incorrectGuesses++;
            console.log(this.incorrectGuesses);
            //Deduct 5 seconds for incorrect answer
            quizQuestion.counter = quizQuestion.counter - 5;
            // display lose message and image and play sound
            //document.body.child[0].child[1].appendChild(hrLine);
            $(".areYouRight").html("Wrong!");
            // next question   
            this.questionNumber++;
        }
        this.answerPage();
    },

    //DISPLAY ANSWER PAGE 
    answerPage: function () {
        // check for last question
        setTimeout(function () {
            if (quizQuestion.questionNumber < quizQuestion.questions.length) {
                quizQuestion.getQuestion();
            }
            else {
                quizQuestion.finalPage();
            }
        }, 1000
        )
    },

    viewHighScore: function () {
        $(".highScore").html("Highscore: " + highScore);
    },

    // DISPLAY STATS PAGE WITH FINAL COUNTS AND A RESTART
    finalPage: function () {
        // empty and hide divs
        $(".question-display").empty();
        $("#button-display").empty();
        $(".areYouRight").empty();
        $(".timer").hide();
        $(".final-page").show();
        // set high score
        //if(quizQuestion.counter > highScore){
        //  highScore = quizQuestion.counter;
        //$(".highScore").html("Highscore: " + highScore);
        //}
        $("#message").html("<h2>All done!</h2><p>Here are your results:</p>");
        $("#score").html("Your final score is " + quizQuestion.counter);
        $("#correct").html("Correct Guesses: " + this.correctGuesses);
        $("#incorrect").html("Incorrect Guesses: " + this.incorrectGuesses);
        clearInterval(quizQuestion.countDownTimer);
    },
    highScorePage: function () {
        // Hide elements on page for highScorePage Element
        clearInterval(quizQuestion.countDownTimer);
        $(".card").hide();
        $(".final-page").hide();
        $(".timer").hide();
        $(".timer").html("Time: 75")
        $(".highScore").hide();
        $(".question-display").hide();
        $("#button-display").hide();
        $(".highScorePage").show();
        $("#hsArray").show();
        console.log("completed highScore Page");

        //Create array to hold this games score and initials
        //https://www.youtube.com/watch?v=DFhmNLKwwGw

        //Assign boxValue to equal the submitted initials
        var boxValue = document.getElementById('userInput').value; //Need help here 
        //alert(boxValue);

        // Create object to hold high score data
        const scoreValues = {
            score: quizQuestion.counter,   // Time left on clock assigned to 
            initials: boxValue   //The variable hold the initials submitted by the user
        };

        const MAX_HIGH_SCORES = 5;
        console.log(scoreValues);
        //Create array to store high scores
        const highScoresArray = JSON.parse(localStorage.getItem("highScoresArray")) || [];
        console.log(highScoresArray);

        //add new score to highScoreArray
        highScoresArray.push(scoreValues);
        console.log(highScoresArray);

        //sort scores high to low
        highScoresArray.sort((a, b) => b.score - a.score);
        console.log(highScoresArray);

        // Narrow to top 5 scores
        highScoresArray.splice(5);

        //Update local storage with revised highScoresArray
        localStorage.setItem('highScoresArray', JSON.stringify(highScoresArray));
        console.log(highScoresArray);

        // Create the list

        /*const highScoresList = document.getElementById("#hsArray");
        const highScores = JSON.parse(localStorage.getItem("highScoresArray")) || [];

        highScoresList.innerHTML = highScores
            .map(scoreValues => {
                return '<li class="high-score">${scoreValues.name}--${scoreValues.score}<li>';
            })
            .join("");*/





        for (var i = 0; i < highScoresArray.length; i++) {
            // Display the array of top 5 highest scores with initials to the screen
            if (highScoresArray[i] != null) {
                $("#hsArray").append('<li>' + JSON.stringify(highScoresArray[i]) + '</li>');
                console.log(highScoresArray[i]);
            } else {
                console.log("null value in high scores");
            }
        }
    }
}


