"use strict";
(function(){
$(function(){
// Start of code
// file:///Users/satiewaltz/code/project1/index.html

var levelWidth = $(".level").width()

var takeDamage = function(id, enemyHealth) {
  console.log("Current Enemy Damage: " + enemyHealth);
  if (enemyHealth === 0) {
    $("#" + currandom).remove();
  } else {
    enemyHealth -= 1;
  }
}

var enemyPosition = function(currandom, currpose, currcount){
  setInterval(function() {
    $("#" + currandom).css({
      "margin-top": currpose,
      "margin-left": currcount += 1 / 5
    });
  }, 1)
}

function Enemy() {
  this.randomIDgenerator = Math.round(Math.random() * 10000);
  this.randomPosition = Math.floor(Math.random() * 300);
  this.enemyHealth = Math.floor(Math.random() * 2) + 1;
  this.takeDamage = takeDamage(this.randomIDgenerator, this.enemyHealth);
  this.counter = 0;
  this.location = enemyPosition(this.randomIDgenerator, this.randomPosition, this.counter);
}

setInterval(function() {
  var newEnemyData = new Enemy;
  var enemyDIV = $("<div>");
  enemyDIV.data(newEnemyData);
  enemyDIV.addClass('enemy');
  enemyDIV.attr('id', enemyDIV.data().randomIDgenerator);
  $(".level").append(enemyDIV);
  var allEnemies = $(".enemy");
  console.log(allEnemies.length)
  if (allEnemies.length === 5) {
    allEnemies.remove();
  }
}, 2000)

var prevTimeStamp;
var currgamestate;

// var gamestate = function() {
//   // if (counter <= (levelWidth - 100)) {
//     currgamestate = requestAnimationFrame(gamestate);
//     var gamePad = navigator.getGamepads()[0];
//     var currTimestamp = gamePad.timestamp;
//     if (timestamp === "undefined") {
//       return;
//     }
//     // Comparing the state of the current timestamp
//     // and the previous, to prevent continous button input
//     // from incrementing counter.
//     if (prevTimeStamp != currTimestamp) {
//       if (gamePad.buttons[0].pressed) {
//         takeDamage($('.enemy'));
//       }
//     }
//     prevTimeStamp = currTimestamp;
//   // } else {
//   //   counter = 3000
//   //   console.log("You lost!");
//   // }
// }

// // if (requestAnimationFrame(gamestate) === 1) {

//     // enemy.attr('id', enemy.data("id"));
//     // console.log(newEnemys)
//     // $(".enemy").attr('id;

// // } else {
//   requestAnimationFrame(gamestate)
// // }

// End of code
})
})();
