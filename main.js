"use strict";
(function(){
$(function(){
// Start of code
// file:///Users/satiewaltz/code/project1/index.html


var counter = 0;
var levelWidth = $(".level").width()

function enemyPosition(id, position){
  setInterval(function() {
    counter += 1 / 50;
    $("#" + id ).css({
      "margin-top": position,
      "margin-left": counter
    });
  }, 1);
}

function takeDamage(hits) {
  console.log("Current Enemy Damage: " + hits.numberOfHits);
  if (hits.numberOfHits === 0) {
    $(".enemy").remove();
  } else {
    hits.numberOfHits -= 1;
  }
}

function assignUniqueID() {
  $(".enemy").each(function(index, el) {
    var randomPosition = Math.floor(Math.random() * 250);
    var randomNum = Math.floor(Math.random() * 3000);
    $(el).attr('id', randomNum);
    enemyPosition(randomNum, randomPosition);
  });
}

function Enemy() {
  this.el = $(".level").append("<div class='enemy'>");
  this.randomIDgenerator = assignUniqueID();
  this.numberOfHits = Math.floor(Math.random() * 3);
  // this.location = enemyPosition(this.randomIDgenerator, this.randomPosition);
}

var enemyDIV = $("<div>");


for (var i = 0; i < 30; i++) {
  setInterval(function(){
      var awdo = new Enemy;

    $(".level").append(enemyDIV);


      enemyDIV.data('ident', awdo.ident);
  enemyDIV.data('location', awdo.location);
  var dataholder = enemyDIV.data();
  }, 1);


}
// for (var i = 0; i < 3; i++) {
//   setTimeout(function(){
//     $(".level").data(new Enemy)
//   }, 200)
// }
// $(".level").append(Enemy);
// $(".level").append(Enemy);

var prevTimeStamp;
var currgamestate;

var gamestate = function() {
  // if (counter <= (levelWidth - 100)) {
    currgamestate = requestAnimationFrame(gamestate);
    var gamePad = navigator.getGamepads()[0];
    var currTimestamp = gamePad.timestamp;
    // Comparing the state of the current timestamp
    // and the previous, to prevent continous button input
    // from incrementing counter.
    if (prevTimeStamp != currTimestamp) {
      if (gamePad.buttons[0].pressed) {
        takeDamage($('.enemy'));
      }
    }
    prevTimeStamp = currTimestamp;
  // } else {
  //   counter = 3000
  //   console.log("You lost!");
  // }
}

// if (requestAnimationFrame(gamestate) === 1) {

    // enemy.attr('id', enemy.data("id"));
    // console.log(newEnemys)
    // $(".enemy").attr('id;

// } else {
  requestAnimationFrame(gamestate)
// }

// End of code
})
})();
