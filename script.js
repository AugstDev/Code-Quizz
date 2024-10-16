const questions = [
    {
        title: "Qual destas é uma linguagem de programação?",
        time: 60,
        answers: [
            ["HTML", false],
            ["CSS", false],
            ["JavaScript", true],
            ["SQL", false]]
    },
    {
        title: "O que significa 'CSS'?",
        time: 60,
        answers: [
            ["Cascading Style Sheets", true],
            ["Computer Style System", false],
            ["Creative Style Syntax", false],
            ["Complex Script Styles", false]]
    },
    {
        title: "Qual dessas estruturas de controle é um loop?",
        time: 60,
        answers: [
            ["if", false],
            ["for", true],
            ["switch", false],
            ["try", false]]
    },
    {
        title: "Qual destes operadores é usado para atribuição em JavaScript?",
        time: 60,
        answers: [
            ["==", false],
            ["=", true],
            ["===", false],
            ["!=", false]]
    },
    {
        title: "Qual desses frameworks é usado com JavaScript?",
        time: 60,
        answers: [
            ["React", true],
            ["Laravel", false],
            ["Django", false],
            ["Spring", false]]
    },
    {
        title: "Em qual linguagem usamos 'print()' para exibir algo no console?",
        time: 60,
        answers: [
            ["Java", false],
            ["Python", true],
            ["C++", false],
            ["JavaScript", false]]
    },
    {
        title: "O que 'NaN' representa em JavaScript?",
        time: 60,
        answers: [
            ["Null", false],
            ["Not a Number", true],
            ["New Array Number", false],
            ["Negative Answer Null", false]]
    },
    {
        title: "O que 'DOM' significa em desenvolvimento web?",
        time: 60,
        answers: [
            ["Document Object Model", true],
            ["Data Output Method", false],
            ["Direct Object Manipulation", false],
            ["Dynamic Operation Model", false]]
    },
    {
        title: "Qual comando é usado para criar uma função em JavaScript?",
        time: 60,
        answers: [
            ["def", false],
            ["function", true],
            ["fun", false],
            ["func", false]]
    },
    {
        title: "O que 'Git' é utilizado para?",
        time: 60,
        answers: [
            ["Controlar versões de código", true],
            ["Executar testes automatizados", false],
            ["Criar interfaces gráficas", false],
            ["Gerenciar bancos de dados", false]]
    }
];



let correctAnswer
let timeLeft = 0;
let countCorrect = 0;


function formatTime(seconds){
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2,'0')}:${String(remainingSeconds).padStart(2,'0')}`
}


function isCorrect(id,questionNumber){

    if(questions[questionNumber].answers[id][1] === true){
        return true;
    }else{
        return false;
    }
}

function getNextQuestion(actualQuestion){
    try {
        setQuestion(actualQuestion + 1);
    } catch (error) {
        alert(`Você acertou ${countCorrect}/${actualQuestion + 1} questões!`);
    }
}




function setQuestion(number){
    let questionNumber = number;
    const playButton = document.getElementById("playButton");
    const title = document.getElementById("title");
    const answers = document.getElementById("answers_tab");
    const time = document.getElementById("time");
    title.textContent = questions[questionNumber].title;
    timeLeft = questions[questionNumber].time
    time.textContent = formatTime(timeLeft);
    answers.innerHTML = '';
    playButton.style.display = 'none';
    questions[questionNumber].answers.forEach(function(answer, index){
        
        if(answer[1] === true){
            correctAnswer = index;
        }

        const buttonElement = document.createElement("button");
        
        buttonElement.addEventListener("click", function(e){
            if(isCorrect(parseInt(e.target.id),questionNumber)){
                buttonElement.style.animation = "correct 1s 1 ease-in-out forwards";
                countCorrect++;
            }else {
                buttonElement.style.animation = "wrong 1s 1 ease-in-out forwards";
            }
        
            buttonElement.addEventListener("animationend", (event) => {
                clearInterval(timer);
                getNextQuestion(questionNumber);
            });
        })
        
        buttonElement.textContent = answer[0];
        buttonElement.className = "answer"
        buttonElement.id = index
        answers.append(buttonElement);
    })

    const timer = setInterval(()=>{
        timeLeft--;
        
        time.textContent = formatTime(timeLeft);
    
        if(timeLeft <= 0){
            time.textContent = "Acabou o Tempo!";
            clearInterval(timer);
            getNextQuestion(questionNumber);
        }}, 1000)

}