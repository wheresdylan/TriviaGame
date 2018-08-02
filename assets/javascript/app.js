$(document).ready(function(){
    $('.box-2').hide();

    var info = [{question:"question two", answer:["answer one","answer two", "answer three", "answer four"], wrongAnswer:"answer four", rightAnswer:"answer two"},
    {question:"question two", answer:["answer bibbidy","answer two", "answer three", "answer 4"], wrongAnswer:"answer four", rightAnswer:"answer two"},
    {question:"question two", answer:["answer one","answer two", "answer three", "answer four"], wrongAnswer:"answer four", rightAnswer:"answer two"},
    {question:"question two", answer:["answer one","answer two", "answer three", "answer four"], wrongAnswer:"answer four", rightAnswer:"answer two"},
    {question:"question two", answer:["answer hdhsk","answer two", "answer three", "answer four"], wrongAnswer:"answer four", rightAnswer:"answer two"},
    {question:"question two", answer:["answer one","answer two", "answer three", "answer four"], wrongAnswer:"answer four", rightAnswer:"answer two"},
    {question:"question two", answer:["answer one","answer two", "answer three", "answer four"], wrongAnswer:"answer four", rightAnswer:"answer two"},];

    var questionNumber = 0;
    var questionPick;
    var answerWord;

function populateQuestions(){
    $('#question').text(info[questionNumber].question);
    $('#answerOne').text(info[questionNumber].answer[0]);
    $('#answerTwo').text(info[questionNumber].answer[1]);
    $('#answerThree').text(info[questionNumber].answer[2]);
    $('#answerFour').text(info[questionNumber].answer[3]);

    questionNumber++;
}

function questionChoice(){
    $('.answer').on('click', function(){
        questionPick = ($(this).attr('id'));
        console.log(questionPick);
        answerWord = $('#' + questionPick).text();
        console.log(answerWord);

        if(answerWord === info[questionNumber].wrongAnswer){
            console.log("that is the wrong answer");
            $('.box').hide();
            $('.box-2').show();
            $('#rightOrWrong').text("WRONG");
            $('#rightAnswer').text("The right Answer was " + info[questionNumber].rightAnswer);

           
            populateQuestions();
            setTimeout(function(){ $('.box-2').hide() }, 3000);
            setTimeout(function(){ $('.box').show() }, 3000);

        }

        if(answerWord === info[questionNumber].rightAnswer){
            console.log("that is the right answer");
            $('.box').hide();
            $('.box-2').show();
            $('#rightOrWrong').text("CORRECT!!");
            $('#rightAnswer').text("");

         
            populateQuestions();
            setTimeout(function(){ $('.box-2').hide() }, 3000);
            setTimeout(function(){ $('.box').show() }, 3000);
        }

    });

}



populateQuestions();
questionChoice();
    
});