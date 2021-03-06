$(document).ready(function(){
    $('.box-2').hide();
    $('.box').hide();
    $('.endGame').hide();

    //variables for the music (game of thrones is not working for some reason)
    var gameOfThrones = document.getElementById("gameOFThrones");
    var rickAndMorty = document.getElementById("rickAndMorty");
    var sonsOfAnarchy = document.getElementById("sonsOfAnarchy");
    var theWalkingDead = document.getElementById("theWalkingDead");
    var greysAnatomy = document.getElementById("greysAnatomy");
    var breakingBad = document.getElementById("breakingBad");
    var ocean = document.getElementById("ocean");

    //object that stores the info for each question page
    var info = [{question:"In Rick and Morty, Who is Rick's best friend?", answer:["Jerry","Mr.Poopybutthole", "BirdMan", "Morty"], wrongAnswer:["Jerry","Mr.Poopybutthole", "Morty"], rightAnswer:"BirdMan", image:"<img src='assets/images/Rick.gif'>", song: rickAndMorty},
    {question:"In The Walking Dead, What was Glenns job before the outbreak?", answer:["Mailman","Pizza delivery boy", "Programmer", "Student"], wrongAnswer:["Mailman","Programmer", "Student"], rightAnswer:"Pizza delivery boy", image:"<img src='assets/images/WalkingDead.gif'>", song: theWalkingDead},
    {question:"On the hit show Breaking Bad, which character gets shot?", answer:["Hank","Walter", "Walter Jr.", "Skyler"], wrongAnswer:["Walter","Walter Jr.", "Skyler"], rightAnswer:"Hank", image:"<img src='assets/images/Walter.gif'>", song: breakingBad},
    {question:"In Sons of Anarachy, What was Jax real fathers name?", answer:["Jason Teller","Clay Morrel", "Jackson Teller", "John Teller"], wrongAnswer:["Jason Teller","Clay Morrel", "Jackson Teller"], rightAnswer:"John Teller", image:"<img src='assets/images/Jax.gif'>", song: sonsOfAnarchy},
    {question:"In Grey's Anatomy, What is Callie's middle name?", answer:["Carlie","Iphegenia", "Mary", "Isophegenia"], wrongAnswer:["Isophegenia","Carlie", "Mary"], rightAnswer:"Iphegenia", image:"<img src='assets/images/Alex.gif'>", song: greysAnatomy},
    {question:"In Game of Thrones, What was the name of Arya's direwolf?", answer:["Grey Wind","Lady", "Ghost", "Nymeria"], wrongAnswer:["Grey Wind","Lady", "Ghost"], rightAnswer:"Nymeria", image:"<img src='assets/images/Hodor.gif'>", song: gameOfThrones},
    {question:"Is water wet?", answer:["not a chance","yeah obviously", "where's my tin foil", "I am water"], wrongAnswer:["I am water","where's my tin foil", "not a chance"], rightAnswer:"yeah obviously", image:"<img src='assets/images/water.gif'>", song: ocean}];

    //declared variables
    var questionNumber = 0;
    var questionPick;
    var answerWord;
    var time = 20;
    var intervalId;
    var wins = 0;
    var losses = 0;

//object for the game
var triviaGame = {

    //function that populates the answers
    populateQuestions: function(){
        $('#question').text(info[questionNumber].question);
        $('#answerOne').text(info[questionNumber].answer[0]);
        $('#answerTwo').text(info[questionNumber].answer[1]);
        $('#answerThree').text(info[questionNumber].answer[2]);
        $('#answerFour').text(info[questionNumber].answer[3]);

        setTimeout(function(){ info[questionNumber].song.play(); }, 5000);
        setTimeout(function(){ info[questionNumber - 1].song.pause() }, 5000);
    },

    //function that gives the outcome depending on answer chosen
    questionChoice: function(){
            questionPick = ($(this).attr('id'));
            answerWord = $('#' + questionPick).text();


            if(answerWord === info[questionNumber].wrongAnswer[0] || answerWord === info[questionNumber].wrongAnswer[1] || answerWord === info[questionNumber].wrongAnswer[2]){
                losses++;
                $('.box').hide();
                $('.box-2').show();
                $('#rightOrWrong').text("WRONG!!");
                $('#rightAnswer').text("The right Answer was " + info[questionNumber].rightAnswer);
                $('#image-Holder').html("<img src='assets/images/trump.gif'>");

                triviaGame.stop();

                time = 20;

                questionNumber++;
             
            
                if(questionNumber < info.length){
                    triviaGame.populateQuestions();
                    setTimeout(function(){ triviaGame.runTimer() }, 4000);
                    setTimeout(function(){ $('.box-2').hide() }, 5000);
                    setTimeout(function(){ $('.box').show() }, 5000);
                }

                if(questionNumber === info.length){
                    setTimeout(function(){endGame()}, 5000);
                }


            }

            if(answerWord === info[questionNumber].rightAnswer){
                wins++
                $('.box').hide();
                $('.box-2').show();
                $('#rightOrWrong').text("CORRECT!!");
                $('#rightAnswer').empty();
                $('#image-Holder').html(info[questionNumber].image);

                triviaGame.stop();

                time = 20;

                questionNumber++;

                if(questionNumber < info.length){
                    triviaGame.populateQuestions();
                    setTimeout(function(){ triviaGame.runTimer() }, 4000);
                    setTimeout(function(){ $('.box-2').hide() }, 5000);
                    setTimeout(function(){ $('.box').show() }, 5000);
                }

                if(questionNumber === info.length){
                    setTimeout(function(){endGame()}, 5000);
                }
            }
    },

    //function that runs the timer
    runTimer: function(){
        clearInterval(intervalId);
        intervalId = setInterval(triviaGame.decrement,1000);
    },

    //function to decremenet the timer
    decrement: function(){
        time--;

        $('#time').text("TIME REMAINING " + time)

        if(time === 0){
            losses++;
            triviaGame.stop();
            
            $('.box').hide();
            $('.box-2').show();
            $('#rightOrWrong').text("TIMES UP!!");
            $('#rightAnswer').empty();
            $('#image-Holder').html("<img src='assets/images/timesUp.gif'>");

            time = 20;

            questionNumber++;

            if(questionNumber < info.length){
                triviaGame.populateQuestions();
                setTimeout(function(){ triviaGame.runTimer() }, 4000);
                setTimeout(function(){ $('.box-2').hide() }, 5000);
                setTimeout(function(){ $('.box').show() }, 5000);
            }

            if(questionNumber === info.length){
                setTimeout(function(){endGame()}, 5000);
            }
        }
    },

    //function that clears the interval
    stop: function(){
        clearInterval(intervalId);
    },

    //function to start the game
    startGame: function() {
        info[info.length - 1].song.pause()
        info[questionNumber].song.play()
        $('.box').hide();
        $('.box').show();

        $('.endGame').hide();
        triviaGame.runTimer();
        triviaGame.populateQuestions();
        triviaGame.questionChoice();
    }
}

//function that ends the game
function endGame(){
        $('.box-2').hide();
        $('.endGame').show();

        $('#correct').text("Correct Answers " + wins);
        $('#wrong').text("Wrong Answers " + losses);
        $('#restart').text("RESTART");

        questionNumber = 0;
        time = 20;
        wins = 0;
        losses = 0;
        answerWord = "";
        questionPick = "";
}

//restart button
$('#restart').on('click', triviaGame.startGame);

//start button
$('#startButton').on('click', function(){
    $('.box-1').hide();
    triviaGame.startGame();
});

//button for answers
$('.answer').on('click', triviaGame.questionChoice);

});