var currentscrumbledword = "";
var currentans = "";
var currentindex = 0;
var wordDictionay = [];
var score = 0;
var timer = "";
var myTimer;
var clickedcharacter = [];
var backenable = true;
var spacecontaning = false;
var enablenextbtn = false;
wordDictionay = [
    // { question: "A subversive Parisian luxury beauty brand", key: shuffle("YVES SAINT LAURENT BEAUTÉ"), value: "YVES SAINT LAURENT BEAUTÉ", Hint: "YVES SAINT LAURENT BEAUTÉ" },
    { question: "This is one of UnitedHealth Group/ Optum’s value", key: shuffle("RELATIONSHIPS"), value: "RELATIONSHIPS", Hint: "RELATIONSHIPS" },
    { question: "One Optum’s office location in APAC region", key: shuffle("TAGUIG"), value: "TAGUIG", Hint: "TAGUIG" },
    // { question: "CEO of Optum", key: shuffle("SIR ANDREW WITTY"), value: "SIR ANDREW WITTY", Hint: "SIR ANDREW WITTY" },
    { question: "This is the headquarters of UnitedHealth Group", key: shuffle("MINNESOTA"), value: "MINNESOTA", Hint: "MINNESOTA" },
    { question: "This is one of the regions which participated in Stratethon Season 2", key: shuffle("MALAYSIA"), value: "MALAYSIA", Hint: "MALAYSIA" },
    { question: "Name of one of the finalist’s teams", key: shuffle("HUSTLERS"), value: "HUSTLERS", Hint: "HUSTLERS" },
    { question: "This college was the business round winner of Optum Stratethon Season 1", key: shuffle("SYMBIOSIS"), value: "SYMBIOSIS", Hint: "SYMBIOSIS" },
    { question: "This is global Optum site with highest headcount in India", key: shuffle("HYDERABAD"), value: "HYDERABAD", Hint: "HYDERABAD" },
    // { question: "United Health Group is a listed member of", key: shuffle("DOW JONES INDUSTRIAL AVERAGE"), value: "DOW JONES INDUSTRIAL AVERAGE", Hint: "DOW JONES INDUSTRIAL AVERAGE" },
    { question: "We invest 3.3 billion in technology and", key: shuffle("INNOVATION"), value: "INNOVATION", Hint: "INNOVATION" },
]

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}



function shuffle(s) {
    var arr = s.split(' '); // Convert String to array
    let finalarr;
    if (arr.length > 2) {
        arr.forEach( (element, index) => {
            var arr1 = element.split('');
            let shuffled = arr1
                .map((a) => ({ sort: Math.random(), value: a }))
                .sort((a, b) => a.sort - b.sort)
                .map((a) => a.value)
                shuffled.push(" ");
                if(index === 0)
                {
                    finalarr = shuffled;
                }else
                {
                    finalarr = finalarr.concat(shuffled);
                }
        });
    }
    else if (arr.length > 1) {
        var arr1 = arr[0].split('');
        var arr2 = arr[1].split('');
        let shuffled1 = arr1
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
        let shuffled2 = arr2
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
        shuffled1.push(" ");
        finalarr = shuffled1.concat(shuffled2);
    }
    else {
        var arr1 = s.split('');
        finalarr = arr1
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
    }

    s = finalarr.join(''); // Convert Array to string

    console.log(s)
    return s; // Return shuffled string
}

function onload() {
    LoadGui();
    localStorage.setItem("totalquestion", wordDictionay.length);
}

function LoadGui() {
    if (currentindex < wordDictionay.length) {
        clearBox();
        clearInterval(myTimer);
        disableBtn();
        spacecontaning = false;
        document.getElementById("answer").innerHTML = "Answer";
        document.getElementById("answer").style.color = "rgba(0,0,0,0)";
        document.getElementById("answer").setAttribute("visibilty", "hidden")
        currentscrumbledword = wordDictionay[currentindex].key;
        currentans = wordDictionay[currentindex].value;
        var count = Object(currentscrumbledword).length;
        document.getElementById("question").innerHTML = wordDictionay[currentindex].question;
        DrawWords(currentscrumbledword, count);
        var arr = currentscrumbledword.split(' ');
        if (arr.length > 1) {
            var textbox = document.getElementById("puzzlesolution");
            textbox.value = "_".repeat(arr[0].length) + " " + "_".repeat(arr[1].length);
        }
        else {
            var textbox = document.getElementById("puzzlesolution");
            textbox.value = "_".repeat(arr[0].length);
        }


        if (count > 12) {
            textbox.setAttribute('rows', 1);
            textbox.setAttribute('cols', count / 1.5);
        } else {
            textbox.setAttribute('rows', 1);
            textbox.setAttribute('cols', count);
        }

        display = document.querySelector('#timer');
        setTimer();
        currentindex++;
        document.getElementById("questionnumber").innerHTML = currentindex + "/10";

    }
    else {
        localStorage.setItem("storageName", score);
        location.replace("share.html")
    }
}

function setTimer() {
    myTimer = setInterval(myClock, 1000);
    var c = 40;
    function myClock() {
        document.getElementById("timer").innerHTML = "00:" + ("0" + --c).slice(-2);
        if (c == 0) {
            clearInterval(myTimer);
            enableBtn();
            showrightanswer();
        }
    }
}

function disableBtn() {
    enablenextbtn = false;
    document.getElementById("next-btn").disabled = true;
    document.getElementById("next-btn").setAttribute("class", "puzzle-next disablecharacter");
    document.getElementById("puzzlesolution").style.backgroundColor = "#e2e2e2";//#14C4ED"; 
    disablebackBtn();
}

function enableBtn() {
    enablenextbtn = true;
    document.getElementById("next-btn").disabled = false;
    document.getElementById("next-btn").setAttribute("class", "puzzle-next");
    disablebackBtn();
}


function disablebackBtn() {
    if (backenable) {
        backenable = false;
        document.getElementById("back-btn").disabled = true;
        document.getElementById("back-btn").setAttribute("class", "puzzle-back disablecharacter");

    }
}

function enablebackBtn() {

    if (!backenable) {
        backenable = true;
        document.getElementById("back-btn").disabled = false;
        document.getElementById("back-btn").setAttribute("class", "puzzle-back");

    }
}

function randomKeyFromDict(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function DrawWords(word, wordlength) {
    var input = 0;
    word.split('').forEach(function (c) {
        drawLabel(c, wordlength, input);
        input++;
    });
}

function clearBox() {
    document.getElementById("puzzleword1").innerHTML = "";
    document.getElementById("puzzleword2").innerHTML = "";
    // document.getElementById("puzzleword3").innerHTML = "";
    // document.getElementById("puzzleword2").innerHTML = "";
    document.getElementById("puzzlesolution").value = "";
}

function drawLabel(cha, count, input) {
    var size = count - 3;
    var font = size - 2;
    if (cha == " ") {
        spacecontaning = true;
    }

    if (spacecontaning) {
        if (cha != " ")
            $("#puzzleword2").append("<input type='button' class='puzzle-char' id='" + cha + input + "' onmousedown= 'charOnClick(this.value,this.id);' value ='" + cha + "'></input>");
    }

    else {
        $("#puzzleword1").append("<input type='button' class='puzzle-char' id='" + cha + input + "' onmousedown= 'charOnClick(this.value,this.id);' value ='" + cha + "'></input>");
    }

}

function charOnClick(chrs, id) {

    if (!enablenextbtn) {
        document.getElementById("puzzlesolution").value = replaceChar(chrs);
        document.getElementById(id).setAttribute("class", "puzzle-char hidecharacter");
        document.getElementById(id).disabled = true;
        enablebackBtn();
        clickedcharacter.push({
            id
        });
        Logic();
    }
}

function clickOnBackBTN() {
    document.getElementById(clickedcharacter[clickedcharacter.length - 1].id).setAttribute("class", "puzzle-char");
    document.getElementById(clickedcharacter[clickedcharacter.length - 1].id).disabled = false;
    clickedcharacter.pop(clickedcharacter.length - 1);
    var origString = document.getElementById("puzzlesolution").value;
    var index = origString.indexOf("_");

    if (origString[index - 1] == " ") {
        let firstPart = origString.substr(0, index - 2);
        let lastPart = origString.substr(index);
        document.getElementById("puzzlesolution").value = firstPart + "_ " + lastPart;

    }
    else {
        let firstPart = origString.substr(0, index - 1);
        let lastPart = origString.substr(index);
        document.getElementById("puzzlesolution").value = firstPart + "_" + lastPart;
    }

    if (index == 1)
        disablebackBtn();
}

function replaceChar(replaceChar) {
    var origString = document.getElementById("puzzlesolution").value;
    var index = origString.indexOf("_");
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);
    let newString =
        firstPart + replaceChar + lastPart;
    return newString;
}

function Logic() {

    var input = document.getElementById("puzzlesolution").value;
    if (input.includes("_")) {
        return;
    }

    if (input.length == currentans.length) {
        if (wordDictionay[currentindex - 1].value == input) {
            score += 1;
            changecolorAccordingtoResult(1);
        }
        else {
            showrightanswer();
        }
    }
}
function showrightanswer() {
    document.getElementById("answer").innerHTML = wordDictionay[currentindex - 1].Hint;
    changecolorAccordingtoResult(0);
}

// function showAlert(status, msg, type, thumb) {
//     document.getElementById("myAlert").innerHTML = "";
//     $("#myAlert").append("<div class='jumbotron jumbotron-fluid bg-" + type + "'>  <div class='container'><h1><i class='fas fa-thumbs-" + thumb + "'></i> " + status + "</h1><p style='padding-left:9%;'>" + msg + "</p></div></div>");
//     $("#myAlert").css('visibilty', 'visible');
// }

function changecolorAccordingtoResult(colorcode) {
    clearInterval(myTimer);
    enableBtn();
    if (colorcode == 1)
        document.getElementById("puzzlesolution").style.backgroundColor = "rgb(57,181,74)";
    else {
        document.getElementById("puzzlesolution").style.backgroundColor = "rgb(239,28,37)";
        document.getElementById("answer").setAttribute("visibilty", "visible")
        document.getElementById("answer").style.color = "rgb(239,28,37)";
    }
}

if (window.performance) {
    console.info("window.performance works fine on this browser");
}
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    location.replace("index.html")
} else {
    console.info("This page is not reloaded");
}

