//getting things from html
const rng = document.querySelector(".volume"); //volume scroll
const bt = document.querySelector(".button"); //playback controller button
const qlt = document.querySelector(".res_ct"); //resolution options
const qlt_opt = document.querySelector(".res"); //resolution options
const dpt = document.querySelector(".timer"); //time stuff
const dr = document.querySelector(".duration");
const bar = document.querySelector(".bar"); //main (time/progress) bar stuff
const bar_num = document.querySelector(".bar_num");

//inserting the youtube api
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//starting the video
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '506',
    width: '900',
    videoId: 'Wx3by7ZaaZA',
    playerVars: {'controls': 0,'rel':0},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

//DEFAULT OPTIONS
function onPlayerReady(event) {
    event.target.pauseVideo();
    event.target.setVolume(50);
    event.target.setPlaybackQuality('large');
    //displaying time
    var d = event.target.getDuration() - 1; // youtube cookie-monster-like eats 1 second
    var duration = round(d);
    dr.innerHTML = duration;
    dpt.innerHTML = "00:00";
    bar.setAttribute("max", d);
}

//rounding seconds to mm:ss function - will be used further
function round(x){
    x = Number(x);
    var m = Math.floor(x / 60);
    var s = Math.floor(x - m * 60);
    return ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
}

//PLAYBACK CONTROL - BUTTONS AND TIMER
var v;
var z;

/*
    on the function below, v will return an object - v.data will return a number that tells us the state of the video player
    according to my tests (z beign v.data):
    z = 0 - Video done playing
    z = 1 - Video is playing
    z = 2 - Video is paused
    z = 3 - Video is loading
*/

function onPlayerStateChange(v){
//buttons
    z = v.data;
    if(z===undefined || z==2){
      bt.innerHTML = '►';
    }
    else if(z==0){
    	bt.innerHTML = '<b>&#10227;</b>';
    }
    else{
        bt.innerHTML = '❚❚';
//time setting
        setInterval(function(){ 
            var t = player.getCurrentTime();
            dpt.innerHTML = round(t);
        }, 100);
  } 
}

function control(){
	if(z===undefined || z==2){
  	player.playVideo();
  }
  else if(z==0){
  	player.playVideo();
  }
  else{
  	player.pauseVideo();
  }
}

//VOLUME CONTROL
react("mousemove");
react("mousedown");

function react(e) {
  rng.addEventListener(e, function() {
  	player.setVolume(rng.value);
  });
}

//RESOLUTION CONTROL
function res(btt){
    //getting things fancy
    var a = btt.className;
    //get current time - because when the video stops it returns to 0
    var currentTime = player.getCurrentTime();
    //stopping video for quality change
    player.stopVideo();
    //setting quality, playing the video and setting the correct time (back)
    player.setPlaybackQuality(a);
    player.playVideo();
    player.seekTo(currentTime, false);
}


//displaying resolution controls
var c = false;

qlt.onclick = function() {
    if(c===false){
        qlt_opt.style.display="block";
        c=true;
    }
    else{
        qlt_opt.style.display="none";
        c=false;
    }
}

//controlling the bar
var isPaused = false;

setInterval(function(){ 
    if(!isPaused){
        var t = player.getCurrentTime();
        bar.value = t;
    }
}, 100);

bar.addEventListener("change",function(){
    player.seekTo(bar.value);
    player.playVideo();
});

bar.addEventListener("mousedown",function(){
    isPaused = true;
    player.pauseVideo();
    dpt.style.display="none";
    bar_num.style.display="inline-block";
});

bar.addEventListener("mouseup", function(){
    isPaused = false;
    player.playVideo();
    dpt.style.display="inline-block";
    bar_num.style.display="none";
});

barra("mousedown")
barra("mousemove")
function barra(e){
    bar.addEventListener(e, function(){
        bar_num.innerHTML = round(bar.value);
    });
}