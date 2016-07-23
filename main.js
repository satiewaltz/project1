"use strict";
(function(){
$(function(){
// Start of code
// file:///Users/satiewaltz/code/project1/index.html

var counterthing = 0;
var prevTimeStamp;
var currgamestate;
function gamestate() {
  // if (counter <= (levelWidth - 100)) {
  currgamestate = requestAnimationFrame(gamestate);
  var gamePad = navigator.getGamepads()[0];
  var currTimestamp = gamePad.timestamp;
  if (gamePad.timestamp === "undefined") {
  }
  // Comparing the state of the current timestamp
  // and the previous, to prevent continous button input
  // from incrementing counter.
  if (prevTimeStamp != currTimestamp) {
    // Below took me 10 hours to figure out
    // thank you asynchronous functions!
    setInterval(function(){
      createEnemy();
    }, 3000)
    if (gamePad.buttons[0].pressed) {
       counterthing = counterthing + 1;
       console.log(counterthing);
    }
  }

  var level = $(".level");
  var levelWidth = $(".level").width()

  var takeDamage = function(id, enemyHealth, counterthing) {
    console.log("Current Enemy Health: " + enemyHealth);
    if (enemyHealth <= 0) {
      $("#" + currandom).remove();
    } else {
      console.log(counterthing)
      enemyHealth -= counterthing;
    }
  }

  var enemyPosition = function(currandom, currpose, currcount){
    if (currcount >= 300) {
      currcount = 300;
    }
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

  function createEnemy(){
    var newEnemyData = new Enemy;
    var enemyDIV = $("<div>");
    enemyDIV.data(newEnemyData);
    enemyDIV.addClass('enemy');
    var enemyHP = enemyDIV.data().enemyHealth;
    enemyDIV.attr('id', enemyDIV.data().randomIDgenerator);
    level.append(enemyDIV);
    var allEnemies = $(".enemy");
    if (allEnemies.length === 5) {
      allEnemies.remove();
    }
  }
  prevTimeStamp = currTimestamp;
}
requestAnimationFrame(gamestate);

// End of code
})
})();
