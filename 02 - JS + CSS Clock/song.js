var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1',
    width: '1',
    videoId: 'O5sRtU9lius',
    events: {
      'onReady': onPlayerReady,
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

var done = false;

function pauseVideo() {
  player.pauseVideo();
}

function vaiVideo() {
  player.playVideo();
}
