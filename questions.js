document.addEventListener("DOMContentLoaded", function () {


  var questions = [
    {
      title: "Which of these coding languages is most useful for styling websites and applications?",
      choices: ["CSS", "HTML", "Javascript", "Python"],
      answer: "CSS"
    },
    {
      title: "Which of these functions parses an argument and returns a floating point number:",
      choices: ["numberify()", "parseFloat()", "parseInt()", "toNum()"],
      answer: "parseFloat()"
    },
    {
      title: "Which of these values would evalaute to false when it's boolean value is checked?",
      choices: ["0", "null", "undefined", "All of the above"],
      answer: "All of the above"
    },
    {
      title: "What method would you use to turn a string into an array of substrings?",
      choices: ["substr()", "split()", "slice()", "constructor()"],
      answer: "split()"
    },
    {
      title: "Which comparison operator would you use if you wanted to see if two variables have the same data types and values:",
      choices: ["===", "==", "=", "!=="],
      answer: "==="
    },
    {
      title: "Which of these functions would execute every 5 seconds?",
      choices: ["for(i = 0; i < 5sec; i++){}", "setTimeout(function(){}, 5000);", "for(i = 0; i < total; i = i + 5 sec){}", "setTimeout(function(){}, 5); "],
      answer: "setTimeout(function(){}, 5000);"
    },
    {
      title: "Which of these id's is written using camelcase:",
      choices: ["#first-button", "#fIrStBuTtOn", "#first_BUTTON", "#firstButton"],
      answer: "#firstButton"
    },
    {
      title: "What is the world's most popular front-end component library?",
      choices: ["Javascript", "JQuery", "Bootstrap", "Angular"],
      answer: "Bootstrap"
    },
    {
      title: "Which of these CSS rules would target all buttons with a class of 'hidden':",
      choices: ["button('hidden'){}", "#hidden button{}", ".hidden button{}", "hidden.button"],
      answer: ".hidden button{}"
    },
    {
      title: "Which CSS declaration prioritizes a line of code and overrides inline styles:",
      choices: ["&Amnesty", "*Special*", "$Priority", "!important"],
      answer: "!important"
    }
  ];

  //Randomize question order
  function shuffle(array) {
    var currentIndex = array.length, tempValue, ranIndex;

    while (0 !== currentIndex) {

      ranIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = array[currentIndex];
      array[currentIndex] = array[ranIndex];
      array[ranIndex] = tempValue;
    }
    return array;
  }

  shuffle(questions);
  localStorage.setItem("questions", JSON.stringify(questions));

});