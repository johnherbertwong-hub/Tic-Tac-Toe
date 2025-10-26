const table = document.getElementById("game-container");
const continueBtn = document.getElementById("continue-btn");
const aftermath_section = document.getElementById("game-aftermath");
const main_section = document.getElementById("main-container");
const menu_btn = document.getElementById('menu-btn');


const crossImg = "./assets/cross_white.png";
const circleImg = "./assets/circle_white.png";

let ttt_map = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let turn = "X";
let gameFinish = false;

continueBtn.addEventListener("click", () => {

    aftermath_section.style.height = "0";
    aftermath_section.style.marginTop = "0";

    main_section.style.padding = "20px 0";

    setTimeout(resetDisplay, 200);
    turn = "X";
    gameFinish = false;
});

let menuShown = true;

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

    
    win_status = checkWin(ttt_map);

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

        gameFinish = true;

        ttt_map = ttt_map.map(x => x.map(y => null));

        aftermath_section.style.marginTop = "20px";
        main_section.style.padding = "50px 0";
        document.getElementById("game-aftermath").style.height = "130px";
    }
});

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