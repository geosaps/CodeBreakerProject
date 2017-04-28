let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
	if (answer.innerHTML == "" || attempt.innerHTML == "") {
		setHiddenFields();
	}
	if (!validateInput(input.value)) {
		return false;
	} else {
		attempt++;
	}
	if (getResults(input.value)) {
		showAnswer(true);
		showReplay();
		return setMessage("You Win! :)");
	} else if (attempt >= 10){
		return setMessage('You Lose! :(');
		showAnswer(false);
	} else {
		return setMessage("Incorrect, try again.");
	}
}

//set a random hidden number

function setHiddenFields () {
	attempt = 0;
	answer = Math.floor(Math.random()*9999);
	answer = answer.toString();
	while (answer.length < 4) {
		answer = 0 + answer;
		console.log(answer);
	}
}

// set an error message

function setMessage (param1) {
	document.getElementById('message').innerHTML = param1;
}

function validateInput (number) {
	if (number.length == 4) {
		return true;
	} else { 
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}


//  set an image to user attempt

function getResults(result) {
	let block = '<div class="row"><span class="col-md-6">' + result + 
	'</span><div class="col-md-6">';
	let inPlace = '<span class="glyphicon glyphicon-ok"></span>';
  	let notInPlace = '<span class="glyphicon glyphicon-transfer"></span>';
 	 let wrong = '<span class="glyphicon glyphicon-remove"></span>'
 	 let correct = 0;
 	 result = result.toString();
		for (var i = 0; i < result.length; i++) {
        if(result.charAt(i) == answer.charAt(i))
        {
            block += inPlace;
            correct++;
        } else if (answer.indexOf(result.charAt(i)) > -1) {
            block += notInPlace;;
        } else {
            block += wrong;
        }
      	}	 
	block += '</div></div>';
	document.getElementById('results').innerHTML += block;


	if (correct == 4) {
		return true;
	} else {		
		return false;
	}
}


function showAnswer(detector) {
	var code = document.getElementById('code');
	code.innerHTML = answer;
	if (detector == true) {
		code.className += ' success';
	} else {
		code.className += ' failure';
	}
}


function showReplay() {
	document.getElementById('guessing-div').style.display = "none";
	document.getElementById('replay-div').style.display = "block";
}

