const table = document.getElementById("game-container");
const continueBtn = document.getElementById("continue-btn")
const aftermath_section = document.getElementById("game-aftermath");
const main_section = document.getElementById("main-container");

const crossImg = "/assets/cross_white.png"
const circleImg = "/assets/circle_white.png"

let ttt_map = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

let turn = "X"
let gameFinish = false

continueBtn.addEventListener("click", () => {

    aftermath_section.style.height = "0";
    aftermath_section.style.marginTop = "0";

    main_section.style.padding = "20px 0";

    setTimeout(resetDisplay, 200);
    turn = "X";
    gameFinish = false
});

table.addEventListener("click", (event) => {

    const button = event.target.closest("button");
    if (!button) return;
    if (gameFinish) return;
    
    const cell = button.closest("td");
    const row = cell.closest("tr");

    const cellIndex = cell.cellIndex;
    const rowIndex = row.rowIndex;  

    ttt_map[rowIndex][cellIndex] = turn;

    console.log(ttt_map[0]);
    console.log(ttt_map[1]);
    console.log(ttt_map[2]);

    if (button.style.backgroundImage) {
        // nothing
    } else if (turn === "X") {
        button.style.backgroundImage = `url('${crossImg}')`;
        turn = "O";
    } else if (turn === "O") {
        button.style.backgroundImage = `url('${circleImg}')`;
        turn = "X";
    }

    win_status = checkWin(ttt_map)

    if (win_status === null) {
        // do nothing
    } else {
        document.getElementById("paragraph-aftermath").innerHTML = `${win_status} WINS!!!`

        gameFinish = true

        ttt_map = ttt_map.map(x => x.map(y => null))

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
    index = 2
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
        return "draw";
    }

    return null;
}

function resetDisplay(){
    const buttons = document.querySelectorAll("#game-container button");

    buttons.forEach((btn) => {
        btn.style.backgroundImage = "";
    });

}