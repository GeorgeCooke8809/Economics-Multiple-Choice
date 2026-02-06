async function getQuestion(){
    console.log("Getting Question");

    response = await fetch("/api/get-question", {
        method: "POST"
        });
    JSON = await response.json();
    console.log(JSON);

    displayQuestion(JSON);
}

function displayQuestion(json){
    document.getElementById("question-paragraph").textContent=json.question;

    document.getElementById("answer-1").textContent=json.answers.one[0];
    document.getElementById("answer-2").textContent=json.answers.two[0];
    document.getElementById("answer-3").textContent=json.answers.three[0];
    document.getElementById("answer-4").textContent=json.answers.four[0];
}

function checkAnswer(){

}

score = 0

getQuestion()