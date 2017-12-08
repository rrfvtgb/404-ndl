var h1;
var progress;
var playground;
var timer;
var score;
var menuElement;
var cars;
var hint;
var overlay

var state;
var proba;

function initVars(){
	cars = [];
	score = 0;
	progress = 0;
	proba = 1;
	
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
	progress += 0.9;
	
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
	
	hint = document.createElement("div");
	hint.innerHTML = "Esquivez les voitures à l'aide de votre souris tout en restant dans la zone blanche";
	hint.className = "hint";
	
	overlay = document.createElement("div");
	overlay.id= "overlay";
	
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
	
		playground.appendChild(hint);
		playground.appendChild(overlay);
	}, 200);
	
	setTimeout(playgroundAnimationDone, 2500);
}

function playgroundAnimationDone(){
	state.animation = false;
	
	if(state.inArea){
		startCountdown();
	}
}

function startCountdown(){
	if(!state.started && !state.countdown){
		hint.className += " fade";
		
		setTimeout((function(){
			removeElement(hint);
		}), 1000);
		
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
	
	document.body.appendChild(txt);
	
	setTimeout(function(){
		removeElement(txt);
	}, 700);
}

function startGame(){
	state.started = true;
	
	if(!state.inArea){
		lose();
	}else{
		timer = setInterval(go, 100);
	}
}

function randomInt(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomItem(list){
	return list[randomInt(0, list.length)];
}

function spawn(){
	proba *= 0.995;
	
	if(Math.random()< proba && cars.length > 5){
		return;
	}
	
	var orient = randomInt(1, 5);
	var veh;
	var voiture = randomItem([{
		id: 1,
		speed: 30,
		pts: 50
	},{
		id: 2,
		speed: 40,
		pts: 100
	},{
		id: 3,
		speed: 50,
		pts: 150
	},{
		id: 4,
		speed: 60,
		pts: 200
	}]);
	
	var speed = voiture.speed;
	var id = "car-"+voiture.id;
	var size = 200;
	var pts = voiture.pts;
	
	if(orient ==1){
		veh = document.createElement("span");
		veh.className = "car car-left "+id;
		var left =  -size;
		veh.style.left = left+"px";
		veh.style.top = "50%";
		veh.style.marginTop = (randomInt(0, 3)*50 -25)+"px";
		
		cars.push({
			element: veh,
			left: left,
			inc: speed,
			pts: pts
		})
		
		document.body.appendChild(veh);
	}else if(orient == 2){
		veh = document.createElement("span");
		veh.className = "car car-right "+id;
		var right =  -size;
		veh.style.right = right+"px";
		veh.style.top = "50%";
		veh.style.marginTop = (randomInt(-3, 0)*50 -25)+"px";
		
		cars.push({
			element: veh,
			right: right,
			inc: speed,
			pts: pts
		})
		
		document.body.appendChild(veh);
	}else if(orient == 3){
		veh = document.createElement("span");
		veh.className = "car car-top "+id;
		var top =  -size;
		veh.style.top = top+"px";
		veh.style.left = "50%";
		veh.style.marginLeft = (randomInt(-6, 0)*50)+"px";
		
		cars.push({
			element: veh,
			top: top,
			inc: speed,
			pts: pts
		})
		
		document.body.appendChild(veh);
	}else if(orient == 4){
		veh = document.createElement("span");
		veh.className = "car car-bottom "+id;
		var bottom =  -size;
		veh.style.bottom = bottom+"px";
		veh.style.left = "50%";
		veh.style.marginLeft = (randomInt(0, 6)*50)+"px";
		
		cars.push({
			element: veh,
			bottom: bottom,
			inc: speed,
			pts: pts
		})
		
		document.body.appendChild(veh);
	}
}

function run(){
	for(var i=0; i<cars.length; i++){
		var veh = cars[i];
		
		if(veh.left !== undefined){
			veh.left += veh.inc;
			veh.element.style.left = veh.left+"px";
			
			
			if(veh.left > window.innerWidth+200){
				removeElement(veh.element);
				cars.splice(i, 1);
				i--;
				score += veh.pts;
			}
		}else if(veh.right !== undefined){
			veh.right += veh.inc;
			veh.element.style.right = veh.right+"px";
			
			if(veh.right > window.innerWidth+200){
				removeElement(veh.element);
				cars.splice(i, 1);
				i--;
				score += veh.pts;
			}
		}else if(veh.top !== undefined){
			veh.top += veh.inc;
			veh.element.style.top = veh.top+"px";
			
			if(veh.top > window.innerHeight+200){
				removeElement(veh.element);
				cars.splice(i, 1);
				i--;
				score += veh.pts;
			}
		}else if(veh.bottom !== undefined){
			veh.bottom += veh.inc;
			veh.element.style.bottom = veh.bottom+"px";
			
			if(veh.bottom > window.innerHeight+200){
				removeElement(veh.element);
				cars.splice(i, 1);
				i--;
				score += veh.pts;
			}
		}
	}
}

function go(){
	run();
	spawn();
}

function lose(){
	if(!state.lost && state.started){
		removeElement(overlay);
		for(var i=0; i<cars.length; i++){
			removeElement(cars[i].element);
		}
		
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
		input.onkeydown = (function(e){
			if(e.key == "Enter" && input.value.length > 2){
				sendScore(input.value);
			}
		});
		
		playground.className = "score";
		
		playground.appendChild(h2);
		playground.appendChild(input);
		
		document.body.appendChild(playground);
	}else{
		menu();
	}
}

function sendScore(name){
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4){
			if (xhr.status == 200 || xhr.status == 0) {
				showScore(JSON.parse(xhr.responseText));
			}else{
				menu();
			}
		}
	};
	xhr.open("GET", "scoreboard.php?nom="+encodeURIComponent(name)+"&score="+encodeURIComponent(score), true);
	xhr.send(null);
}

function showScore(score){
	console.log("Score:");
	console.log(score);
	
	removeElement(playground);
	
	playground = document.createElement("div");
	playground.className = "score";
	
	for(var i=0; i<score.length; i++){
		var p = document.createElement("p");
		p.innerHTML = score[i][1] +" - "+ score[i][2];
		playground.appendChild(p);
	}
	
	var button = document.createElement("button");
	button.innerHTML = "Retour";
	button.onclick = menu;
	
	playground.appendChild(button);
	
	document.body.appendChild(playground);
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
