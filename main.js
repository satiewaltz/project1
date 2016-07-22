"use strict";
(function(){
$(function(){
// Start of code

var buttonCounter = 0;
var counter = 0;
// file:///Users/satiewaltz/code/project1/index.html
function enemyMovement(id, position){
  setInterval(function() {
    counter += 1;
    $("#" + id ).css({
      "margin-left": counter
    });
    if (counter >= 300) {
      counter = 300;
    }
  }, 100 / 10);
}

function enemyPosition(id, position){
  $("#" + id ).css({
      "margin-top": position
    });;
}

function Enemy(){
  this.randomPosition = Math.floor(Math.random() * 100);
  this.randomID = Math.floor(Math.random() * 1000);
  this.htmltag = $("<div class='enemy' id=" + this.randomID + ">");
  this.movement = enemyMovement(this.randomID);
  this.position = enemyPosition(this.randomID, this.randomPosition)
}

var ah = new Enemy;
$(".level").append(ah.htmltag);



function buttonIncret() {
  buttonCounter += 1;
}
var gamePad = navigator.getGamepads()[0];

var prevTimeStamp;
function getCurrentGamePadState() {
  requestAnimationFrame(getCurrentGamePadState);
  var gamePad = navigator.getGamepads()[0];
  var currTimestamp = gamePad.timestamp;
  // Comparing the state of the current timestamp
  // and the previous, to prevent continous button input
  // from incrementing counter.
  if (prevTimeStamp != currTimestamp) {
    if (gamePad.buttons[0].pressed) {
      buttonIncret();
    }
  }
  if (buttonCounter === 3) {
    $(".enemy").remove();
  }
  prevTimeStamp = currTimestamp;
}
requestAnimationFrame(getCurrentGamePadState);

// End of code
})
})();
