
var wins = 0;
var losses = 0;
var numArray = [];

startGame();

function startGame() {
    // clear last round:
    $("#crystals").text('');
    $("#win-or-loss").text('');
    $("#current-score").text(currentScore);

    // Random target number (between 19 and 120)
    var targetNumber = (Math.round(Math.random() * 101));
    console.log("target: " + targetNumber);
    targetNumber += 19;
    console.log("target: " + targetNumber);

    var currentScore = 0;
    // var numArray = [1, 10, 15, 20];
    numArray = randomValues();
    console.log(numArray);


    $("#number-to-guess").text(targetNumber);
    $("#current-score").text(currentScore);

    // initialize crystals:
    for (var i = 0; i < numArray.length; i++) {

        var thisCrystal = $("<img>");
        thisCrystal.addClass("crystal-image");

        // apply respective images:
        if (i === 0) thisCrystal.attr("src", "assets/images/blue.jpg");
        else if (i === 1) thisCrystal.attr("src", "assets/images/red.jpg");
        else if (i === 2) thisCrystal.attr("src", "assets/images/purple.jpg");
        else if (i === 3) thisCrystal.attr("src", "assets/images/white.jpg");

        // apply respective numerical values:
        thisCrystal.attr("data-crystalvalue", numArray[i]);

        // add crystal to crystal container:
        $("#crystals").append(thisCrystal);
    }

    // onClick for Crystal class
    $(".crystal-image").on("click", function () {

        var crystalValue = ($(this).attr("data-crystalvalue"));
        crystalValue = parseInt(crystalValue);

        // tally score:
        currentScore += crystalValue;
        $("#current-score").text(currentScore);

        // win/lose conditions:
        if (currentScore == targetNumber) {
            $("#win-or-loss").text("You win! Restarting!");
            wins++; $("#winsNow").text("Wins: " + wins);
            setTimeout(function () {
                startGame();
            }, 3000);
        }
        else if (currentScore > targetNumber) {
            $("#win-or-loss").text(currentScore + " exceeds " + targetNumber + "! You have lost! Restarting!");
            losses++; $("#lossesNow").text("Losses: " + losses);
            setTimeout(function () {
                startGame();
            }, 3000);
        }
    });
}

function randomValues() {
    var tmpArray = [];
    var curNum = 0
    var lastNum = 0
    var numIndex = "0"

    
    
    for (let i = 0; i < 4; i++) {

        curNum = Math.floor(Math.random() * 11) + 1;
        if (curNum == 0) curNum++;

        numIndex = tmpArray.indexOf(curNum);

        if (numIndex == (-1)) {
            console.log(numIndex + " not used!");
            tmpArray[i] = curNum;
        } else if (numIndex != (-1)) {
            console.log(numIndex + " used before!");
            i--;  
        }

        console.log("i: " + i + " lastNum: " + lastNum + " curNum: " + curNum + " indexOf: " + tmpArray.indexOf(curNum) + " tmpArray: " + tmpArray);
    }

    return tmpArray;
}