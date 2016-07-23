"use strict";
(function(){
$(function(){
// Start of code
// file:///Users/satiewaltz/code/project1/index.html

var prevTimeStamp;
var currgamestate;

    var level = $(".level");
    var levelWidth = $(".level").width()

    var counterthing = 0;
    var enemyPosition = function(currandom, currpose, currcount){
      setInterval(function() {
        $("#" + currandom).css({
          "margin-top": currpose,
          "margin-left": currcount += 1
        });
        if (currcount >= (levelWidth - 100)) {
          currcount = (levelWidth - 100);
          $("#" + currandom).remove()
        }
      }, 1)
    }
// use classes // assaign random callss
    var takeDamage = function(id, enemyHealth, counterthing) {
      // console.log("Current Enemy Health: " + enemyHealth);
      if (enemyHealth <= 0) {
        $("#" + currandom).remove();
      } else if(false) {
        enemyHealth -= 1;
      }
    }

    function Enemy() {
      this.randomClassGenerator = "enemy" + String(Math.floor(Math.random() * 4) + 1);
      this.randomIDgenerator = Math.round(Math.random() * 10000);
      this.randomPosition = Math.floor(Math.random() * 300);
      this.enemyHealth = Math.floor(Math.random() * 2) + 1;
      this.ouch = takeDamage(this.randomIDgenerator, this.enemyHealth, counterthing);
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
      enemyDIV.addClass(enemyDIV.data().randomClassGenerator);
      level.append(enemyDIV);
      if ($(".enemy").length === 10) {
        $(".enemy").remove();
      }
    }
   createEnemy();
    setInterval(function(){
      createEnemy()
    }, 1000);
function gamestate() {
  // if (counter <= (levelWidth - 100)) {
  currgamestate = requestAnimationFrame(gamestate);
  var gamePad = navigator.getGamepads()[0];
  var currTimestamp = gamePad.timestamp;
  // if (gamePad.timestamp === "undefined") {
  // }
  // Comparing the state of the current timestamp
  // and the previous, to prevent continous button input
  // from incrementing counter.
  if (prevTimeStamp != currTimestamp) {
    // Below took me 10 hours to figure out
    // thank you asynchronous functions!
    if (gamePad.buttons[0].pressed) {
      $(".enemy1").first().remove()
    }
    if (gamePad.buttons[1].pressed) {
      $(".enemy2").first().remove()
    }
    if (gamePad.buttons[2].pressed) {
      $(".enemy3").first().remove()
    }
    if (gamePad.buttons[3].pressed) {
      $(".enemy4").first().remove()
    }
  }
  prevTimeStamp = currTimestamp;
}
requestAnimationFrame(gamestate);

// End of code
})
})();
