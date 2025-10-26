const table = document.getElementById("game-container");
const continueBtn = document.getElementById("continue-btn");
const aftermath_section = document.getElementById("game-aftermath");
const main_section = document.getElementById("main-container");
const menu_btn = document.getElementById('menu-btn');
const swab_shape_btn = document.getElementById('swab-shape-btn');
const reset_score_btn = document.getElementById('reset-score-btn');

const player1_turn_display = document.getElementById('player1-turn');
const player2_turn_display = document.getElementById('player2-turn');
// ADDING HTML OBJECT OF PLAYER 1 INFORMATION
const player1_status_display = document.getElementById('player1-status');
const player1_score_display = document.getElementById('player1-score');

// ADDING HTML OBJECT OF PLAYER 2 INFORMATION
const player2_status_display = document.getElementById('player2-status');
const player2_score_display = document.getElementById('player2-score');

// ADDING XO IMAGES
const crossImg = "./assets/cross_white.png";
const circleImg = "./assets/circle_white.png";

// ADDING PLAYER 1 AND PLAYER 2 OBJECTS
const player1 = {shape: "X", turn: 1, wins: 0};
const player2 = {shape: "O", turn: 2, wins: 0};

let ttt_map = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let firstTurn = "Player 1"
let turn = player1.shape;
let gameFinish = false;

reset_score_btn.addEventListener("click", () => {
    if (gameFinish) return;

    player1.wins = 0;
    player2.wins = 0;

    player1_score_display.innerHTML = player1.wins;
    player2_score_display.innerHTML = player2.wins;

    ttt_map = ttt_map.map(x => x.map(y => null));

    gameFinish = false;
    setTimeout(resetDisplay, 50);

    swabPlayerTurnDisplay();
});

swab_shape_btn.addEventListener("click", () => {
    if (gameFinish) return;

    ttt_map = ttt_map.map(x => x.map(y => null));

    gameFinish = false;
    setTimeout(resetDisplay, 50);

    player1.shape = (player1.shape === "X") ? "O" : "X";
    player2.shape = (player2.shape === "X") ? "O" : "X";

    turn = firstTurn === "Player 1" ? player1.shape : player2.shape;

    swabPlayerTurnDisplay();

    player1_status_display.innerHTML = `P1 (${player1.shape})`;
    player2_status_display.innerHTML = `P2 (${player2.shape})`;
});

continueBtn.addEventListener("click", () => {
    firstTurn = firstTurn === "Player 1" ? "Player 2" : "Player 1";
    turn = firstTurn === "Player 1" ? player1.shape : player2.shape;

    swabPlayerTurnDisplay();

    aftermath_section.style.height = "0";
    aftermath_section.style.marginTop = "0";

    main_section.style.padding = "20px 0";
    gameFinish = false;

    setTimeout(resetDisplay, 200);
    

});

let menuShown = false;

menu_btn.addEventListener("click", () => {

    const menu_selection_section = document.getElementById('menu-choice-container');
    const menu_section = document.getElementById('menu-container');
    const menu_btn_section = document.getElementById('menu-btn-container');


    if (menuShown == true) {
        menu_selection_section.style.flex = "0";
        menu_section.style.width = "50px";
        menu_section.style.height = "50px";
        menu_section.style.boxShadow = "3px 3px 10px hsl(0, 0%, 10%)";
        menuShown = false;
    } else {
        menu_selection_section.style.flex = "auto";
        menu_section.style.width = "250px";
        menu_section.style.height = "70%";
        menu_section.style.boxShadow = "none";
        menuShown = true;
    }
    
});

table.addEventListener("click", (event) => {

    const button = event.target.closest("button");
    if (!button) return;
    if (gameFinish) return;
    
    const cell = button.closest("td");
    const row = cell.closest("tr");

    const cellIndex = cell.cellIndex;
    const rowIndex = row.rowIndex;  

    

    // FOR DEBUGGING

    // console.log(ttt_map[0]);
    // console.log(ttt_map[1]);
    // console.log(ttt_map[2]);

    if (button.style.backgroundImage != "") {
        console.log("Hello")
        return
    } else if (turn === "X") {
        ttt_map[rowIndex][cellIndex] = turn;
        button.style.backgroundImage = `url('${crossImg}')`;
        turn = "O";
    } else if (turn === "O") {
        ttt_map[rowIndex][cellIndex] = turn;
        button.style.backgroundImage = `url('${circleImg}')`;
        turn = "X";
    }
    console.log("Bye")

    swabPlayerTurnDisplay();
    
    win_status = checkWin(ttt_map);

    if (win_status != null) {
        player1_turn_display.style.minHeight = "0";
        player2_turn_display.style.minHeight = "0";
    }

    if (win_status === null) {
        // do nothing
    } else if (win_status === "DRAW"){
        document.getElementById("paragraph-aftermath").innerHTML = `IT'S A DRAW!!!`;

        gameFinish = true;

        ttt_map = ttt_map.map(x => x.map(y => null));

        aftermath_section.style.marginTop = "20px";
        main_section.style.padding = "50px 0";
        document.getElementById("game-aftermath").style.height = "130px";

    } else {
        document.getElementById("paragraph-aftermath").innerHTML = `${win_status} WINS!!!`;

        if (win_status === player1.shape) {
            player1.wins ++;
            player1_score_display.innerHTML = player1.wins;
        } else {
            player2.wins ++;
            player2_score_display.innerHTML = player2.wins;
        }

        gameFinish = true;

        ttt_map = ttt_map.map(x => x.map(y => null));

        aftermath_section.style.marginTop = "20px";
        main_section.style.padding = "50px 0";
        document.getElementById("game-aftermath").style.height = "130px";
    }
});

function swabTurn() {
    player1.turn = (player1.turn === 1) ? 2 : 1;
    player2.turn = (player2.turn === 1) ? 2 : 1;
}

function swabPlayerTurnDisplay() {
    let current_turn = (turn === player1.shape) ? "Player 1" : "Player 2";

    if (current_turn === "Player 2") {
        player1_turn_display.style.minHeight = "0";
        player2_turn_display.style.minHeight = "420px";
    } else {
        player1_turn_display.style.minHeight = "420px";
        player2_turn_display.style.minHeight = "0";
    }
}

function checkWin(map) {
    let shape = null;
    let count = 0;
    let countNotNull = 0;

    for (let i = 0; i < map.length; i++) {
        shape = null;
        count = 0;
        for (let j = 0; j < map.length; j++) {
            if (map[i][j] === null){
                break;
            } else {
                countNotNull ++;
                if (shape === null) {
                    shape = map[i][j];
                    count ++ ;
                } else if (shape != map[i][j]) {
                    count = 0;
                    shape = map[i][j];
                } else {
                    count ++ ;
                }   
                
            }
            if (count == 3) {
                console.log("HERE1")
                return shape;
            }  
        }
        
    }

    for (let i = 0; i < map.length; i++) {
        shape = null;
        count = 0;
        for (let j = 0; j < map.length; j++) {
            if (map[j][i] === null){
                break;
            } else {
                if (shape === null) {
                    shape = map[j][i];
                    count ++ ;
                } else if (shape != map[j][i]) {
                    count = 0;
                    break
                } else {
                    count ++ ;
                }
            }
        }

        if (count == 3) {
            console.log("HERE2")
            return shape;
        }
    }


    shape = null;
    count = 0;
    for (let i = 0; i < map.length; i++) {
        
        if (map[i][i] === null){
            break;
        } else {
            if (shape === null) {
                shape = map[i][i];
                count ++ ;
            } else if (shape != map[i][i]) {
                count = 0;
                break
            } else {
                count ++;
            }
        }

        if (count == 3) {
            console.log("HERE3")
            return shape;
        }
    }

    shape = null;
    count = 0;
    index = 2;
    for (let i = 0; i < map.length; i++) {
        
        if (map[i][index] === null){
            break;
        } else {
            if (shape === null) {
                shape = map[i][index];
                count ++ ;
            } else if (shape != map[i][index]) {
                count = 0;
                break
            } else {
                count ++ ;
            }
        }

        if (count == 3) {
            console.log("HERE4")
            return shape;
        }
        index --;
    }

    if (countNotNull == 9) {
        return "DRAW";
    }

    return null;
}

function resetDisplay(){
    const buttons = document.querySelectorAll("#game-container button");

    buttons.forEach((btn) => {
        btn.style.backgroundImage = "";
    });

}

swabPlayerTurnDisplay();