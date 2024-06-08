let gameSeq=[];
let userSeq=[];
let highestScore=0;
let btns=["red","green","yellow","blue"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function() {
    if(!started) {
        console.log("game started");
        started=true;
        levelUp();
    }
});

document.addEventListener("click",function() {
    if(!started) {
        console.log("game started");
        started=true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },150);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(()=>{
        btn.classList.remove("userFlash");
    },150);
}

function levelUp() {
    userSeq=[];
    level++;
    h2.innerText = `Current Level ${level}`;

    let randomIndex = Math.floor(Math.random()*4);
    let randomClr = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomClr}`);
    gameSeq.push(randomClr);
    // console.log(randomIndex);
    // console.log(randomClr);
    // console.log(randomBtn);

    gameFlash(randomBtn);
}

function checkAns(index) {
    // let index = level-1;
    if(userSeq[index] === gameSeq[index]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(()=>{
                levelUp();
            },800);
        }
    } else {
        document.querySelector("p").innerText = `Highest Score ${Math.max(highestScore,level-1)}`;
        document.querySelector("body").style.backgroundColor="red";   
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white";
        },150);
        h2.innerHTML = `Game Over<br> <b>Score: ${level-1}</b><BR> Press any key to restart.`;
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn=this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(_ of allBtns) {
    _.addEventListener("click",btnPress);
}

function reset() {
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
