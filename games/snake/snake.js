snakeHeadPos = ["11", "02"];
snakePos = ["11", "01", "11", "02"];
length = 4;
richting = 3;
score = 0;
stop = true;
eerstekeer = true;
snelheid = 300;
apple = "apple";
cooldown = 0;
settings = 0;

let Gapple = new Audio('pickupCoin.mp3');
let Napple = new Audio('pickupCoin(1).mp3');
let dood = new Audio('hitHurt.mp3');

document.addEventListener('keydown', function(event) {
    if (event.key == " " && cooldown <= 0) {
        if (stop == true) {stop = false;} else {stop = true; cooldown = 50; goFurther();}
    }
    if (inputGiven == 0){
        if (event.key == "a" && richting != 3 || event.key == "A" && richting != 3 || event.key == "ArrowLeft" && richting != 3) {richting = 0;}
        if (event.key == "s" && richting != 2 || event.key == "S" && richting != 2 || event.key == "ArrowDown" && richting != 2) {richting = 1;}
        if (event.key == "w" && richting != 1 || event.key == "W" && richting != 1 || event.key == "ArrowUp" && richting != 1) {richting = 2;}
        if (event.key == "d" && richting != 0 || event.key == "D" && richting != 0 || event.key == "ArrowRight" && richting != 0) {richting = 3;}
        inputGiven = 1;
    }
});

function start() {
    scoretext = "Score: " + score;
    document.getElementById("scoreText").textContent=scoretext;
    spauwnApple();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function spauwnApple() {
    if (getRandomInt(16) == 1) {apple = "GoldApple";} else if (getRandomInt(60) == 1) {apple = "DiamondApple";} else if (getRandomInt(200) == 1) {apple = "RGBapple";} else {apple = "apple";}
    appleYPos = getRandomInt(19) + 1;
    appleXPos = getRandomInt(19) + 1;
    if (appleYPos < 10) {
        appleYPos = "0" + appleYPos;
    }
    if (appleXPos < 10) {
        appleXPos = "0" + appleXPos;
    }
    appleYPos = appleYPos.toString();
    appleXPos = appleXPos.toString();

    colCheck = snakePos.length / 2;
    for (let i = 0; i < colCheck; i++) {
        segmentY = snakePos[i * 2];
        segmentX = snakePos[i * 2 + 1];
        if (appleXPos === segmentX && appleYPos === segmentY) {
            spauwnApple();
        } else if (snakeHeadPos[0] === appleXPos && snakeHeadPos[1] === appleYPos) {
            spauwnApple();
        }
    }

    document.getElementById(appleYPos + appleXPos).setAttribute("class", apple);
    if (eerstekeer == true) {
        eerstekeer = false;
        stapje();
    }
}

function stapje() {
    //check voor appel
    if (snakeHeadPos[0] === appleYPos && snakeHeadPos[1] === appleXPos) {
        if (apple == "GoldApple") {
            Gapple.play();
            length = length + 2;
        } else if (apple == "DiamondApple") {
            Gapple.play();
            length = length + 9;
        } else if (apple == "RGBapple") {
            Gapple.play();
            length = length + 19;
        } else {Napple.play();}
        length++;
        score = length - 4;
        scoretext = "Score: " + score;
        document.getElementById("scoreText").textContent=scoretext;
        spauwnApple();
    }

    //bereken volgende stap
    //rechts
    if (richting ==3) {
        snakeHeadPos[1] = Number(snakeHeadPos[1]) + 1;
        if (snakeHeadPos[1] < 10) {
            snakeHeadPos[1] = "0" + snakeHeadPos[1];
        }
        snakeHeadPos[1] = snakeHeadPos[1].toString()
    }
    //links
    if (richting ==0) {
        snakeHeadPos[1] = Number(snakeHeadPos[1]) - 1;
        if (snakeHeadPos[1] < 10) {
            snakeHeadPos[1] = "0" + snakeHeadPos[1];
        }
        snakeHeadPos[1] = snakeHeadPos[1].toString()
    }
    //omhoog
    if (richting ==2) {
        snakeHeadPos[0] = Number(snakeHeadPos[0]) - 1;
        if (snakeHeadPos[0] < 10) {
            snakeHeadPos[0] = "0" + snakeHeadPos[0];
        }
        snakeHeadPos[0] = snakeHeadPos[0].toString()
    }
    //omlaag
    if (richting ==1) {
        snakeHeadPos[0] = Number(snakeHeadPos[0]) + 1;
        if (snakeHeadPos[0] < 10) {
            snakeHeadPos[0] = "0" + snakeHeadPos[0];
        }
        snakeHeadPos[0] = snakeHeadPos[0].toString()
    }
    inputGiven = 0;

    //check voor botsing
    colCheck = snakePos.length / 2;
    for (let i = 0; i < colCheck; i++) {
        const segmentX = snakePos[i * 2];
        const segmentY = snakePos[i * 2 + 1];
        if (snakeHeadPos[0] === segmentX && snakeHeadPos[1] === segmentY) {
            stop = false;   
            dood.play();
            setTimeout(reset, 2000);
        }
    }

    //check voor muur
    if (snakeHeadPos[0] == "21") {
        snakeHeadPos[0] = "01";
        richting = 1;
    }
    if (snakeHeadPos[0] == "00") {
        snakeHeadPos[0] = "20";
        richting = 2;
    }
    if (snakeHeadPos[1] == "21") {
        snakeHeadPos[1] = "01";
        richting = 3;
    }
    if (snakeHeadPos[1] == "00") {
        snakeHeadPos[1] = "20";
        richting = 0;
    }

    goFurther();
}   

//beweeg
function goFurther() {
    if (stop == true) {
        snakePos.push(snakeHeadPos[0], snakeHeadPos[1]);
        if (length ==  snakePos.length/2) {
        document.getElementById(snakePos[0] + snakePos[1]).setAttribute("class", "");
        snakePos = snakePos.slice(2); 
        }

        document.getElementById(snakeHeadPos[0] + snakeHeadPos[1]).setAttribute("class", "on"); 
        if (score > 3) {snelheid = 290;}
        if (score > 8) {snelheid = 280;}
        if (score > 15) {snelheid = 265;}
        if (score > 25) {snelheid = 240;}
        if (score > 40) {snelheid = 200;}
        if (score > 60) {snelheid = 180;}
        if (score > 90) {snelheid = 150;}
        cooldown--;
        if (cooldown > 0) {
            countdownText = "Pause is on cooldown!!!";
            console.log(countdownText);
            document.getElementById("countdown").textContent=countdownText;
        } else {
            document.getElementById("countdown").textContent=" ";
        }
        if (stop == true) {
            setTimeout(stapje, snelheid);
        }
    }
}

function reset() {
    while (snakePos.length > 0){
        document.getElementById(snakePos[0] + snakePos[1]).setAttribute("class", "");
        snakePos = snakePos.slice(2);
    }
    document.getElementById(appleYPos + appleXPos).setAttribute("class", "");
    snakeHeadPos = ["11", "02"];
    snakePos = ["11", "01", "11", "02"];
    length = 4;
    richting = 3;
    stop = true;
    eerstekeer = true;
    score = 0;
    document.getElementById("scoreText").textContent="Score: 0";
    apple = "apple";
    cooldown = 0;
    snelheid = 300;
    settings = 0;
    spauwnApple();
}

function settingsOpend() {
    if (settings == 0) {
        if (length == 4) {
            console.log("opend");
            stop = false;
            while (snakePos.length > 0){
                document.getElementById(snakePos[0] + snakePos[1]).setAttribute("class", "");
                snakePos = snakePos.slice(2);
            }
            document.getElementById(appleYPos + appleXPos).setAttribute("class", "");
            document.getElementById("scoreText").textContent="Menu";

            const text1 = MakeElement(0, "menuText", "menuText", "h3");
            document.getElementById("0201").appendChild(text1);
            text1.textContent = "Teleporteer door muur: ";
            document.getElementById("0201").setAttribute("style", "width: 50%");
            document.getElementById("menuText").setAttribute("style", "margin-left: 10px");

            MakeSwitch("0202");
            settings = 1;
        }
    } else {reset();}
}

function MakeElement(mode, ClassN, IDName, eleType) {
    if (mode == 0) {
        const eleme = document.createElement(eleType);
        eleme.className = ClassN;
        eleme.id = IDName;
        return eleme;
    } else {

    }
}

function MakeSwitch(nummerr) {
    const lable1 = MakeElement(0, "switch", "lable1", "label");
        document.getElementById(nummerr).appendChild(lable1);

        const input1 = document.createElement("input");
        document.getElementById("lable1").appendChild(input1);
        input1.checked = true;
        input1.setAttribute("type", "checkbox");
        
        span1 = document.createElement("span");
        document.getElementById("lable1").append(span1);
        span1.className = "slider round";
}
