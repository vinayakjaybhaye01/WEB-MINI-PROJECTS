let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newGameBtn = document.querySelector("#newbtn");
let messageContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turno = true;

const winPatterns = [
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6]  ];

let count = 0;
boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        count++;
        if(turno){
            box.innerText= "O";
            turno = false;
        }else{
            box.innerText = "X"
            turno = true;
        }
        box.disabled = true;

        checkWinner();
    })
} )

const checkWinner = () => {
    for(pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                count = 0;
            }
            if(count == 9){
                printDraw();
                count = 0;
            }
        }
    }
}

const resetGame = () => {
    count = 0;
      turno = true;
      enableButtons();
      messageContainer.classList.add("hide");
}

resetbtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click", resetGame);

const showWinner = (winner) =>{
    msg.innerText = `Winner is ${winner}!`;
    messageContainer.classList.remove("hide");
    disableButtons();
}

const printDraw = () => {
    msg.innerText = "Game is draw !";
    messageContainer.classList.remove("hide");
    disableButtons();
}



const disableButtons = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableButtons = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}