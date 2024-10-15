const questions = [
    {
        title: "Qual a cor da Maçã?",
        time: 10,
        answers: [
            ["Azul", false],
            ["Marrom", false],
            ["Laranja", false],
            ["Vermelha", true]]
        },
]

let correctAnswer
let timeLeft = 120;



function formatTime(seconds){
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2,'0')}:${String(remainingSeconds).padStart(2,'0')}`
}


function isCorrect(id){

    alert(questions[0].answers[id][1])
    if(questions[0].answers[id][1] === true){
        return true;
    }else{
        return false;
    }
}




function setQuestion(){
    const title = document.getElementById("title");
    const answers = document.getElementById("answers_tab");
    const time = document.getElementById("time");
    const reply = document.getElementById("replyText");
    reply.textContent = '';
    title.textContent = questions[0].title;
    timeLeft = questions[0].time
    time.textContent = formatTime(timeLeft);
    answers.innerHTML = '';
    
    questions[0].answers.forEach(function(answer, index){
        
        if(answer[1] === true){
            correctAnswer = index;
        }

        const buttonElement = document.createElement("button");
        
        buttonElement.addEventListener("click", function(e){
            
            if(isCorrect(parseInt(e.target.id))){
                reply.textContent = "Você Acertou!";
            }else {
                reply.textContent = "Você Errou!";
            }
        }
        )
        buttonElement.textContent = answer[0];
        buttonElement.id = index
        answers.append(buttonElement);
    })

    const timer = setInterval(()=>{
        timeLeft--;
        
        time.textContent = formatTime(timeLeft);
    
        if(timeLeft <= 0){
            time.textContent = "Time's Up!";
            clearInterval(timer);
        }}, 1000)

}