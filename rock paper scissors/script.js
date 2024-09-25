let choice = document.querySelectorAll(".btn");
let resetBtn = document.querySelector("#resetBtn");
let yourScore = document.querySelector("#you-score");
let compScore = document.querySelector("#comp-score");
let messageBox = document.querySelector(".message-box");

let your_score = 0;
let comp_score = 0;
const checkWinner= (yourChoice) =>{
      compChoice = Math.floor(Math.random() * 3);
      
      if(yourChoice === compChoice){
           messageBox.innerText = "IT'S DRAW !";
           hideMessage();
      }
      else if((yourChoice === 0  && compChoice === 2) || (yourChoice === 1 && compChoice === 0) || (yourChoice === 2 && compChoice === 1)){
          hideMessage();
          messageBox.innerText = "YOU WON";
          displayMessage(yourChoice,compChoice);
          your_score++;
          yourScore.innerText = `${your_score}`;
        }
        else{
            hideMessage();
            messageBox.innerText = " YOU LOSE"
        displayMessage(yourChoice,compChoice);
        comp_score++;
        compScore.innerText = `${comp_score}`;
      }
}

const displayMessage = (yourChoice,compChoice) => {
    if((yourChoice === 0 && compChoice === 1) || (yourChoice === 1 && compChoice === 0)){
        messageBox.innerText = messageBox.innerText + " Paper beats Rock !"
    }
    else if((yourChoice === 1 && compChoice === 2) || (yourChoice === 2 && compChoice === 1)){
        messageBox.innerText = messageBox.innerText + " Scissor beats Paper !"
    }
    else if((yourChoice === 2 && compChoice === 0) || (yourChoice === 0 && compChoice === 2)){
        messageBox.innerText = messageBox.innerText + " Rock beats Scissor !"
    }
}

for(let i=0; i<3; i++){
    choice[i].addEventListener("click",() =>{
        checkWinner(i);
    })
}

const reset = () =>{
    your_score = 0;
    comp_score = 0;
    yourScore.innerText = `${your_score}`;
    compScore.innerText = `${comp_score}`;
}

resetBtn.addEventListener("click", reset);

const hideMessage = () => {
    messageBox.classList.remove("hidden");
    setTimeout(() => {
        messageBox.classList.add("hidden");
    }, 2000);
    
}