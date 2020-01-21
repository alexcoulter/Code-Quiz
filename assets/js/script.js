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
  var initialsAlert = document.getElementById("initialsAlert");
  var crowd = document.getElementById("crowd");
  var mute = document.getElementById("mute");
  //var questions = JSON.parse(localStorage.getItem("questions"));
  var score = 0;
  var i = 0;
  var timeLeft = 60;
  var muteAll = false;
  var muteCount = 0;
  muteCount = localStorage.getItem("muteCount");
  console.log(muteCount);
  if((muteCount %2) !== 0) {
    mute.classList.remove("fa-microphone-alt");
    mute.classList.add("fa-microphone-alt-slash");
    muteAll = true;
  }
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
      for (var j = 1; j < 5; j++) {
        var answer = document.createElement("button");
        answer.setAttribute("q-id", j);
        quizQs.append(answer);
        answer.textContent = j + ". " + questions[i].choices[j-1];
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
    if(!muteAll && score > 4){
    crowd.play();
  }
}

  //Event Listeners
  startButton.addEventListener("click", countdown);

  quizQs.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
      event.preventDefault();
      var userGuessId = event.target.getAttribute("q-id");

      if (questions[i].choices[userGuessId - 1] == questions[i].answer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        if(!muteAll) {
        correctAudio.play();
        }
        score++;

        while (quizQs.firstChild) {
          quizQs.removeChild(quizQs.firstChild);
        }
        i++;
        newQuestion();
      }

      else {
        feedback.textContent = "Wrong!";
        feedback.style.color = "red";
        if(!muteAll) {
        incorrectAudio.play();
        }
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

  
  //   mutes/unmutes all sounds on click
    mute.addEventListener("click", function(e) {
    event.preventDefault();
    if((muteCount %2) === 0) {
      mute.classList.remove("fa-microphone-alt");
      mute.classList.add("fa-microphone-alt-slash");
      muteAll = true;
    }
    else {
      mute.classList.add("fa-microphone-alt");
      mute.classList.remove("fa-microphone-alt-slash");
      muteAll = false;
    }
      muteCount++;
      localStorage.setItem("muteCount", muteCount);
  });
 

     

  //Submits initials text box to high scores list
  initialsButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (initials.value.length > 3 || initials.value.length < 1) {
      initialsAlert.classList.remove("hidden");
    }
    else {
      var newUser = { name: initials.value, score: score };
      var allScores = JSON.parse(localStorage.getItem("allScores") || "[]");
      allScores.push(newUser);
      localStorage.setItem("allScores", JSON.stringify(allScores));
      window.open("highScores.html", "_self");
    }
  });

});
