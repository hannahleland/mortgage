"use strict";
var $ = function(id) { return document.getElementById(id); };

var getRandomNumber = function(max) {
	var random;
	if (!isNaN(max)) {
		random = Math.random(); // generates a seed value >=0.0 and < 1.0
		random = Math.floor(random * max); // gives an integer between 0 and (max - 1) 
		random = random +1; // gives an integer between 1 and max
	}
	return random; // sends random number back to where it's called from (in this case, 'die'). if max Nan, returns undefined
};

var changePlayer = function() {
	if ($("current").innerHTML == $("player1").value) { // can use .firstChild.nodeValue instead
		$("current").innerHTML = $("player2").value;
	}
	else {
		$("current").innerHTML = $("player1").value;
	};
	
	$("die").value = "0";
	$("total").value = "0";
	$("roll").focus();
};

var newGame = function() {
	$("score1").value = "0";
	$("score2").value = "0";
	
	if ($("player1").value == "" || $("player2").value == "") { // validating
		$("turn").removeAttribute("class"); // hides or keeps hidden the HTML section 'turn'
		alert("Please enter two player names.");
	}
	else {
		$("turn").setAttribute("class", "open"); // dynamically adding a CSS class 
		changePlayer();
	};
};

var rollDice = function() {
	var total = parseInt($("total").value); // reading box and turning it into an integer 
    var die = getRandomNumber(6); // six sided die 	
    if (die == 1) {
    	total = 0;
    	changePlayer();
    }
    else {
    	total = total + die;
    	$("die").value = die;
    	$("total").value = total;
    };
};

var holdTurn = function() {
	var score;
	var total = parseInt($("total").value); // reads total in box on screen instead of saving it in a variable in the JS
	
	if ($("current").innerHTML == $("player1").value) {
		score = $("score1");
	}
	else {
		score = $("score2");
	}
	
	score.value = parseInt(score.value) + total; //parseInt important to keep it from concatenating and displaying incorrect score
	if(score.value >= 100) {
		alert($("current").innerHTML + " Wins!");
		newGame();
	}
	else {
		changePlayer();
	};
};

window.onload = function() {
	$("new_game").onclick = newGame;
	$("roll").onclick = rollDice;
	$("hold").onclick = holdTurn;
};