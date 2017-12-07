var h1;
var progress = 0;
var playground;

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
		this.style.color = "#"+tmp_color+tmp_color+tmp_color+tmp_color+tmp_color+tmp_color;
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
	removeElement(playground);
	
	playground = document.createElement("div");
	playground.id = "box";
	
	document.body.appendChild(playground);
	
	setTimeout(function(){
		playground.className = "small";
	}, 30);
	
	setTimeout(function(){
		playground.className = "full";
	}, 500);
	
	setTimeout(startCountdown, 2000);
}

function startCountdown(){
	
}

window.onload = function(){
	h1 = document.getElementById("404");
	playground = document.getElementById("playground");
	
	h1.onclick = click;
}
