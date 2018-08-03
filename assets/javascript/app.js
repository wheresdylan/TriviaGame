$(document).ready(function(){
    $('.box-2').hide();
    $('.box').hide();
    $('.endGame').hide();

    var info = [{question:"In Rick and Morty, Who is Rick's best friend?", answer:["Jerry","Mr.Poopybuttwhole", "BirdMan", "Morty"], wrongAnswer:["Jerry","Mr.Poopybuttwhole", "Morty"], rightAnswer:"BirdMan", image:"<img src='assets/images/Rick.gif'>"},
    {question:"In The Walking Dead, What was Glenns job before the outbreak?", answer:["Mailman","Pizza delivery boy", "Computer programmer", "Student"], wrongAnswer:["Mailman","Computer programmer", "Student"], rightAnswer:"Pizza delivery boy", image:"<img src='assets/images/WalkingDead.gif'>"},
    {question:"On the hit show Breaking Bad, which character is shot?", answer:["Hank","Walter", "Walter Jr.", "Skyler"], wrongAnswer:["Walter","Walter Jr.", "Skyler"], rightAnswer:"Hank", image:"<img src='assets/images/Walter.gif'>"},
    {question:"In Sons of Anarachy, What was Jax real fathers name?", answer:["Jason Teller","Clay Morrel", "Jackson Teller", "John Teller"], wrongAnswer:["Jason Teller","Clay Morrel", "Jackson Teller"], rightAnswer:"John Teller", image:"<img src='assets/images/Jax.gif'>"},
    {question:"In Grey's Anatomy, What is Callie's middle name?", answer:["Carlie","Iphegenia", "Mary", "Isophegenia"], wrongAnswer:["Isophegenia","Carlie", "Mary"], rightAnswer:"Iphegenia", image:"<img src='assets/images/Alex.gif'>"},
    {question:"In Game of Thrones, What was the name of Arya's direwolf?", answer:["Grey Wind","Lady", "Ghost", "Nymeria"], wrongAnswer:["Grey Wind","Lady", "Ghost"], rightAnswer:"Nymeria", image:"<img src='assets/images/Hodor.gif'>"},
    {question:"Is water wet?", answer:["not a chance","yeah obviously", "where's my tin foil hat?", "I am water"], wrongAnswer:["I am water","where's my tin foil hat?", "not a chance"], rightAnswer:"yeah obviously", image:"<img src='assets/images/water.gif'>"}];

    var questionNumber = 0;
    var questionPick;
    var answerWord;
    var time = 20;
    var intervalId;
    wins = 0;
    losses = 0;

function triviaGame(){

    $('.box').show();

    function populateQuestions(){
        $('#question').text(info[questionNumber].question);
        $('#answerOne').text(info[questionNumber].answer[0]);
        $('#answerTwo').text(info[questionNumber].answer[1]);
        $('#answerThree').text(info[questionNumber].answer[2]);
        $('#answerFour').text(info[questionNumber].answer[3]);

    }

    function questionChoice(){
        $('.answer').on('click', function(){
            questionPick = ($(this).attr('id'));
            answerWord = $('#' + questionPick).text();

            if(answerWord === info[questionNumber].wrongAnswer[0] || answerWord === info[questionNumber].wrongAnswer[1] || answerWord === info[questionNumber].wrongAnswer[2]){
                losses++;
                $('.box').hide();
                $('.box-2').show();
                $('#rightOrWrong').text("WRONG!!");
                $('#rightAnswer').text("The right Answer was " + info[questionNumber].rightAnswer);
                $('#image-Holder').html("<img src='assets/images/trump.gif'>");

                stop();

                time = 20;

                questionNumber++;

                setTimeout(function(){endGame()}, 5000);
                
             
            
                populateQuestions();
                setTimeout(function(){ runTimer() }, 4000);
                setTimeout(function(){ $('.box-2').hide() }, 5000);
                setTimeout(function(){ $('.box').show() }, 5000);


            }

            if(answerWord === info[questionNumber].rightAnswer){
                wins++
                $('.box').hide();
                $('.box-2').show();
                $('#rightOrWrong').text("CORRECT!!");
                $('#rightAnswer').empty();
                $('#image-Holder').html(info[questionNumber].image);

                stop();

                time = 20;

                questionNumber++;

                setTimeout(function(){endGame()}, 5000);
            
                populateQuestions();
                setTimeout(function(){ runTimer() }, 4000);
                setTimeout(function(){ $('.box-2').hide() }, 5000);
                setTimeout(function(){ $('.box').show() }, 5000);
            }


        });

    }

    function runTimer(){
        clearInterval(intervalId);
        intervalId = setInterval(decrement,1000);
    }

    function decrement(){
        time--;

        $('#time').text("TIME REMAINING " + time)

        if(time === 0){
            losses++;
            stop();
            
            $('.box').hide();
            $('.box-2').show();
            $('#rightOrWrong').text("TIMES UP!!");
            $('#rightAnswer').empty();
            $('#image-Holder').html("<img src='assets/images/timesUp.gif'>");

            time = 20;

            questionNumber++;

            setTimeout(function(){endGame()}, 5000);

        
            populateQuestions();
            setTimeout(function(){ runTimer() }, 4000);
            setTimeout(function(){ $('.box-2').hide() }, 5000);
            setTimeout(function(){ $('.box').show() }, 5000);

        }
    }

    function stop(){
        clearInterval(intervalId);
    }

    runTimer();
    populateQuestions();
    questionChoice();
}

function endGame(){
    if (questionNumber === info.length){
        $('.box-2').hide();
        $('.endGame').show();

        $('#correct').text("Correct Answers " + wins);
        $('#wrong').text("Wrong Answers " + losses);
        $('#restart').text("RESTART");

        $('#restart').on('click',function(){
            questionNumber = 0;
            time = 20;
            wins = 0;
            losses = 0;


            $('.endGame').hide();
            triviaGame();
        })

    }
}

$('#startButton').on('click', function(){
    $('.box-1').hide();

    triviaGame();
})




    
});