var h1;
var progress;
var playground;
var timer;
var score;
var menuElement;

var state;

function initVars(){
	score = 0;
	progress = 0;
	
	state = {
		visible: false,
		animation: false,
		inArea: false,
		started: false,
		lost: false,
		countdown: false
	};
}

function removeElement(e){
	e.parentElement.removeChild(e);
}

function click(e){
	progress += 0.4;
	
	var tmp_color = (16-Math.ceil(progress*16)).toString(16);
	
	if( progress > 0.8){
		this.onclick = null;
		start();
	}else{
		this.style.color = "#"+tmp_color+tmp_color+tmp_color;
	}
	
	e.preventDefault();
	e.stopPropagation();
	
	return false;
}

function start(){
	console.log("Started");
	playground.style.left = "-400px";
	playground.style.opacity = "0";
	
	setTimeout(createPlayground, 500);
}

function createPlayground(){
	state.visible = true;
	state.animation = true;
	
	playground.style.left = "";
	playground.style.opacity = "";
	h1.style.color = "";
	
	removeElement(playground);
	
	
	
	playground = document.createElement("div");
	playground.id = "box";
	
	playground.onmouseenter = (function(){
		state.inArea = true;
		
		if(!state.animation){
			startCountdown();
		}
	});
	playground.onmouseleave = (function(){
		state.inArea = false;
		
		if(state.started){
			lose();
		}
	});
	
	document.body.appendChild(playground);
	
	setTimeout(function(){
		playground.className = "small";
	}, 30);
	
	setTimeout(function(){
		playground.className = "full";
	}, 200);
	
	setTimeout(playgroundAnimationDone, 1000);
}

function playgroundAnimationDone(){
	state.animation = false;
	
	if(state.inArea){
		startCountdown();
	}
}

function startCountdown(){
	if(!state.started && !state.countdown){
		state.countdown = true;
		console.log("start Countdown");
		
		countdown(3, "#c62828");
		
		setTimeout(function(){
			countdown(2, "#d84315");
		}, 1000);
		
		setTimeout(function(){
			countdown(1, "#2e7d32");
		}, 2000);
		
		setTimeout(function(){
			countdown("Go", "#1565c0")
		}, 3000);
		
		setTimeout(startGame, 3500);
	}
}

function countdown(message, color){
	var txt = document.createElement("p");
	
	txt.className = "countdown";
	txt.innerHTML = message;
	txt.style.color = color;
	
	playground.appendChild(txt);
	
	setTimeout(function(){
		removeElement(txt);
	}, 1000);
}

function startGame(){
	state.started = true;
	
	if(!state.inArea){
		lose();
	}else{
		timer = setInterval(spawn, 200);
	}
}

function spawn(){
	
}

function lose(){
	if(!state.lost && state.started){
		clearInterval(timer);
		
		console.log("Lose");
		state.lost = true;
		
		document.body.className = "disable-cursor";
		
		playground.className = "small";
		
		setTimeout(function(){
			playground.className = "";
		}, 300);
		
		setTimeout(function(){
			removeElement(playground);
			document.body.className="";
			
			displayScore();
		}, 800);
	}
}

function displayScore(){
	if(score != 0){
		playground = document.createElement("div");
		
		var h2 = document.createElement("h2");
		var input = document.createElement("input");
		
		h2.innerHTML="Score "+score;
		input.placeholder="Pseudo";
		
		playground.className = "score";
		
		playground.appendChild(h2);
		playground.appendChild(input);
		
		document.body.appendChild(playground);
	}else{
		menu();
	}
}

function menu(){
	initVars();
	
	if(playground && playground.parentElement){
		removeElement(playground);
	}
	
	document.body.appendChild(menuElement);
	playground = menuElement;
	h1.onclick = click;
}

window.onload = function(){
	initVars();
	
	h1 = document.getElementById("404");
	playground = document.getElementById("playground");
	menuElement = playground;
	
	h1.onclick = click;
}
