document.addEventListener("DOMContentLoaded", function () {

  var startButton = document.getElementById("startQuiz");
  var timer = document.getElementById("timer");
  var h1content = document.getElementById("h1content");
  var h4content = document.getElementById("h4content");
  var question = document.getElementById("question");
  var intro = document.getElementById("intro");
  var quiz = document.getElementById("quiz");
  var quizQs = document.getElementById("quizQs");
  var feedback = document.getElementById("feedback");
  var initialsSubmit = document.getElementById("initialsSubmit");
  var initialsButton = document.getElementById("initialsButton");
  var initials = document.getElementById("initials");
  //var goBack = document.getElementById("goBack");
  var correctAudio = document.getElementById("correctAudio");
  var incorrectAudio = document.getElementById("incorrectAudio");
  var crowd = document.getElementById("crowd");
  var questions = JSON.parse(localStorage.getItem("questions"));
  var score = 0;
  var i = 0;
  var timeLeft = 60;
  timer.textContent = "Time: 0";


  //Timing function
  function countdown() {
    var timeInterval = setInterval(function () {
      timer.textContent = "Time: " + timeLeft;
      timeLeft--;

      if (timeLeft < 0) {
        timer.textContent = "Time: 0";
        clearInterval(timeInterval);
        gameOver();
      }
    }, 1000);
    intro.classList.add("hidden");
    quiz.classList.remove("hidden");
    newQuestion(questions);
  }



  //generate new question
  function newQuestion() {

    if (i < questions.length) {
      question.textContent = questions[i].title;
      for (var j = 0; j < 4; j++) {
        var answer = document.createElement("button");
        answer.setAttribute("q-id", j + 1);
        quizQs.append(answer);
        answer.textContent = j + 1 + ". " + questions[i].choices[j];
      }
    }
    else {
      gameOver();
    }
  }


  //code for when timer ends
  function gameOver() {
    timeLeft = 0;
    intro.classList.remove("hidden");
    quiz.classList.add("hidden");
    h1content.textContent = "The coding quiz is over!";
    h4content.textContent = "Your final score was: " + score + " points";
    startButton.classList.add("hidden");
    initialsSubmit.classList.remove("hidden");
    crowd.play();
  }

  //Event Listeners
  startButton.addEventListener("click", countdown);

  quizQs.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
      event.preventDefault();
      var userGuessId = event.target.getAttribute("q-id");

      if (questions[i].choices[userGuessId - 1] == questions[i].answer) {
        feedback.textContent = "Correct!";
        feedback.classList.add("green");
        feedback.classList.remove("red");
        correctAudio.play();
        score++;

        while (quizQs.firstChild) {
          quizQs.removeChild(quizQs.firstChild);
        }
        i++;
        newQuestion();
      }


      else {
        feedback.textContent = "Wrong!";
        feedback.classList.add("red");
        feedback.classList.remove("green");
        incorrectAudio.play();

        while (quizQs.firstChild) {
          quizQs.removeChild(quizQs.firstChild);
        }
        i++;
        timeLeft = timeLeft - 10;
        newQuestion();
      }
    }
    else {
      console.log("not a button");
    }
  });


  //Submits initials text box to high scores list
  initialsButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (initials.value.length > 3 || initials.value.length < 1) {
      alert("Enter 3 or fewer characters to submit your initials")
    }
    else {
      var newUser = { name: initials.value, score: score };
      var allScores = JSON.parse(localStorage.getItem("allScores") || "[]");

      console.log(allScores);
      allScores.push(newUser);
      localStorage.setItem("allScores", JSON.stringify(allScores));
      console.log(allScores);
      window.open("highScores.html", "_self");
    }
  });

});
