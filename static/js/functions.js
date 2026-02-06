async function getQuestion(){
    document.getElementById("score").textContent=score;

    document.getElementById("answer-1").className="answer-button";
    document.getElementById("answer-2").className="answer-button";
    document.getElementById("answer-3").className="answer-button";
    document.getElementById("answer-4").className="answer-button";


    response = await fetch("/api/get-question", {
        method: "POST"
        });
    global_json = await response.json();
    console.log(global_json);

    displayQuestion();
}

function displayQuestion(){
    document.getElementById("question-paragraph").textContent=global_json.question;

    document.getElementById("answer-1").textContent=global_json.answers.one[0];
    document.getElementById("answer-2").textContent=global_json.answers.two[0];
    document.getElementById("answer-3").textContent=global_json.answers.three[0];
    document.getElementById("answer-4").textContent=global_json.answers.four[0];
}

async function checkAnswer(id){
    if (accepting_answers){ // makes sure user cannot spam press buttons
        if (id == "answer-1"){
            choice = global_json.answers.one[1];
        }
        else if (id == "answer-2"){
            choice = global_json.answers.two[1];
        }
        else if (id == "answer-3"){
            choice = global_json.answers.three[1];
        }
        else if (id == "answer-4"){
            choice = global_json.answers.four[1];
        }

        console.log(choice);

        response = await fetch(`/api/check-question/${global_json.questionID}/${choice}`, {
            method: "POST"
            });
        user_correct = (await response.json()).correct;

        if (user_correct){
            document.getElementById(id).className="correct-choice";
            /*
            TODO: play sound
            */
            score += 10;
        }
        else{
            /*
            TODO: play sound
            TODO: Update hearts
            */
            if (lives == 3){
                document.getElementById("healthy-heart-1").classList.add("hidden-heart");
                document.getElementById("healthy-heart-1").classList.remove("shown-heart");

                document.getElementById("dead-heart-1").classList.add("shown-heart");
                document.getElementById("dead-heart-1").classList.remove("hidden-heart");
            }
            else if (lives == 2){
                document.getElementById("healthy-heart-2").classList.add("hidden-heart");
                document.getElementById("healthy-heart-2").classList.remove("shown-heart");

                document.getElementById("dead-heart-2").classList.add("shown-heart");
                document.getElementById("dead-heart-2").classList.remove("hidden-heart");
            }
            else if (lives == 1){
                document.getElementById("healthy-heart-3").classList.add("hidden-heart");
                document.getElementById("healthy-heart-3").classList.remove("shown-heart");

                document.getElementById("dead-heart-3").classList.add("shown-heart");
                document.getElementById("dead-heart-3").classList.remove("hidden-heart");
            };

            lives -= 1;

            document.getElementById(id).className="incorrect-choice";
        }

        accepting_answers = false
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (lives>0){
            accepting_answers = true
            getQuestion();
        }
    }
}

let score = 0;
let global_json = {};
let lives = 3;
let accepting_answers = true;

getQuestion();