var gamePlaying, character, characterSelect, goodCharacter, badCharacter, health, attack, counterAttack, fighter, goodPony, badPony, ponyOne, ponyTwo, healthPointsSave, rounds;

var badCharacterObj = {};
var goodCharacterObj = {};

// Start new game
newgame();
goodCharacterHide();
badCharacterHide();


// caracter opjects
character = function (name, healthPoints, attackPower, counterPower) {
    this.name = name;
    this.healthPoints = 0;
    this.attackPower = 0;
    this.counterPower = 0;
};

// class seclection
// Good
$('.good').on('click', function () {
    $('body').css('background-image', 'url(assets/images/Battle.png)');
    clearToCharacter();
    goodCharacterShow();
});

//Bad
$('.bad').on('click', function () {
    $('body').css('background-image', 'url(assets/images/Battle.png)');
    clearToCharacter();
    badCharacterShow();
});

// caracter selection

$('.goodCar').on('click', function () {
    $('.fighting1').hide();
    $('.fighting3').hide();
    $('.battle').hide();
    characterSelect = $(this).attr('id');
    goodCharacterHide();
    $('.' + characterSelect).show();
    $('#' + characterSelect).appendTo('.fighting1');
    $('.selectOpp').show();
    goodPony = true;
    if (badPony === true) {
        ponyTwo = goodCharacterObj[characterSelect];
    } else {
        ponyOne = goodCharacterObj[characterSelect];
        healthPointsSave = ponyOne.healthPoints;
    }
    $('.fighting1').show();
    $('.fighting3').show();
    begin();
});

$('.badCar').on('click', function () {
    $('.fighting1').hide();
    $('.fighting3').hide();
    $('.battle').hide();
    characterSelect = $(this).attr('id');
    badCharacterHide();
    $('.' + characterSelect).show();
    $('.fighting3').show();
    $('#' + characterSelect).appendTo('.fighting3');
    badPony = true;
    if (goodPony === true) {
        ponyTwo = badCharacterObj[characterSelect];
    } else {
        ponyOne = badCharacterObj[characterSelect];
        healthPointsSave = ponyOne.healthPoints;
    }
    $('.fighting1').show();
    $('.fighting3').show();
    begin();
});

function createOppBad() {
    badCharacter = $('.badCar');
    for (var i = 0; i < badCharacter.length; i++) {
        var badCharacterName = $(badCharacter[i]).attr('id');
        console.log(badCharacterName);
        var bad = badCharacterName;
        bad = {};
        bad.name = badCharacterName;
        calculateHealth();
        calculateAttack();
        bad.healthPoints = healthPoints;
        bad.attackPower = attackPower;
        bad.side = 'Bad';
        $("#" + bad.name + "Att").append("HP: " + bad.healthPoints + "</break>" + "Att: " + bad.attackPower);
        badCharacterObj[bad.name] = bad;
    }
}

function createOppGood() {
    goodCharacter = $('.goodCar');
    for (var j = 0; j < goodCharacter.length; j++) {
        var goodCharacterName = $(goodCharacter[j]).attr('id');
        var good = goodCharacterName;
        good = {};
        good.name = goodCharacterName;
        calculateHealth();
        calculateAttack();
        good.healthPoints = healthPoints;
        good.attackPower = attackPower;
        good.side = 'Good';
        $("#" + good.name + "Att").append("HP: " + good.healthPoints + "</break>" + " Att: " + good.attackPower);
        goodCharacterObj[good.name] = good;
    }
}



// calculate Health Attack power and counter attack power

function calculateHealth() {
    healthPoints = Math.floor(Math.random() * (500 - 200) + 200);
}

function calculateAttack() {
    attackPower = Math.floor(Math.random() * (80 - 20) + 20);
}

function calculateCounterAttack() {
    counterPower = Math.floor(Math.random() * (80 - 20) + 20);
}

// Display Health and attack
function fightAtt() {
    $('#' + ponyOne.name + 'Att').empty();
    $('#' + ponyTwo.name + 'Att').empty();
    $('#' + ponyOne.name + 'Att').append("HP: " + ponyOne.healthPoints + "</break>" + " Att: " + ponyOne.attackPower);
    $('#' + ponyTwo.name + 'Att').append("HP: " + ponyTwo.healthPoints + "</break>" + " Att: " + ponyTwo.attackPower);
}

// Move caracter to playing area

// Move oponnents to oponnets selection area.

// opnnets selection

$('.selectOpp').on('click', function () {
    $('.fighting1').hide();
    $('.fighting3').hide();
    badCharacterShow();
    $('.selectOpp').hide();
    $('.fighing2').show();
    $('.battle').show();
    $('.result').empty();
    ponyOne.healthPoints = healthPointsSave;
});

$('.selectOppBad').on('click', function () {
    $('.fighting1').hide();
    $('.fighting3').hide();
    goodCharacterShow();
    $('.selectOppBad').hide();
    $('.fighing2').show();
    $('.battle').show();
    $('.result').empty();
    ponyOne.healthPoints = healthPointsSave;
});

// remove the rest of the oppennets.

// battle
function begin() {
    if (goodPony === true && badPony === true) {
        $('.fighting2').show();
        $('.battle').show();
        $('.selectOpp').hide();
        $('.selectOppBad').hide();
        console.log(ponyOne);
        console.log(ponyTwo);
    }
}

$('.battle').on('click', function () {
    $('.attackBtn').show();
    $('.battle').hide();
    $('.restart').show();
    ponyOne.healthPoints = healthPointsSave;
    $('body').css('background-image','url(assets/images/battle1.jpg)');
    fightAtt();
});

$('.attackBtn').on('click', function () {
    ponyTwo.healthPoints -= ponyOne.attackPower;
    ponyOne.healthPoints -= ponyTwo.attackPower;
    ponyOne.attackPower += 15;
    fightAtt();
    if (ponyOne.healthPoints < 0) {
        $('.result').append('You Lose');
        gamePlaying = false;
    } else if (ponyTwo.healthPoints < 0) {
        $('.result').append('You survived');
        $('#' + ponyTwo.name).addClass('faild');
        $('.attackBtn').hide();
        rounds++;
        if (rounds === 6) {
            $('.selectOpp').hide();
            $('.selectOppbad').hide();
            $('.attackBtn').hide();
            $('.fighting1').hide();
            $('.fighting3').hide();
            $('.result').empty();
            $('.result').append('You Win!!');
            $('#' + ponyOne.name).appendTo('.fighting2').removeClass('.fighting1', '.fighting2');
            gamePlaying = false;
        } else if (ponyTwo.side === 'Good') {
            $('#' + ponyTwo.name).removeClass(goodCar);
            $('.selectOppBad').show();
            goodPony = false;
        } else if (ponyTwo.side === 'Bad') {
            $('#' + ponyTwo.name).removeClass(badCar);
            $('.selectOpp').show();
            badPony = false;
        }
    }

});

$('.restart').on('click', function () {
    newgame();
});

function clearToCharacter() {
    $('.bad').hide();
    $('.good').hide();
}

function goodCharacterHide() {
    $('.apple').hide();
    $('.appleAtt').hide();
    $('.fluttershy').hide();
    $('.pinkie').hide();
    $('.rainbow').hide();
    $('.rarity').hide();
    $('.twilight').hide();
}

function goodCharacterShow() {
    $('.apple').show();
    $('.fluttershy').show();
    $('.pinkie').show();
    $('.rainbow').show();
    $('.rarity').show();
    $('.twilight').show();
    $('.faild').hide();
    $('body').css('background-image','url(assets/images/good.png)');
}

function badCharacterHide() {
    $('.chrysalis').hide();
    $('.discord').hide();
    $('.nightmare').hide();
    $('.sombra').hide();
    $('.storm').hide();
    $('.tirek').hide();
}

function badCharacterShow() {
    $('.chrysalis').show();
    $('.discord').show();
    $('.nightmare').show();
    $('.sombra').show();
    $('.storm').show();
    $('.tirek').show();
    $('.faild').hide();
    $('body').css('background-image','url(assets/images/bad.png)');
}

// win or lose

// new game function
function newgame() {
    $('body').css('background-image', 'url(assets/images/select.jpg)');
    $('.badCar')
    gamePlaying = true;
    goodPony = false;
    badPony = false;
    rounds = 0;
    createOppGood();
    createOppBad();
    $('.selectOpp').hide();
    $('.selectOppBad').hide();
    $('.attackBtn').hide();
    $('.restart').hide();
    $('.fighting1').hide();
    $('.fighting2').hide();
    $('.fighting3').hide();
    $('.battle').hide();
    $('.good').show();
    $('.bad').show();
}