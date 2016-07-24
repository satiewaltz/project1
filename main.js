"use strict";
(function(){
$(function(){
// Start of code
// file:///Users/satiewaltz/code/project1/index.html
  var game = {
    allEnemies: $(".enemy"),
    level: $(".level"),
    levelWidth: $(".level").width(),
    enemySpeedModifer: 1,
    gameSpeed: [600, 700, 800, 1000],
    loseCondition: 0,
    prevTimeStamp: '',
    currgamestate: ''
  }

  setInterval(function(){
    game.gameSpeed.shift()
  }, 1000)
  setInterval(function(){
    game.enemySpeedModifer /= 1.01
  }, 1000)

  var enemyPosition = function(currandom, currpose, currcount){
    setInterval(function() {
      $("#" + currandom).css({
        "top": currpose,
        "left": currcount += 0.3 / (1 * game.enemySpeedModifer)
      });
      if (currcount >= (game.levelWidth - 100)) {
        currcount = (game.levelWidth - 100);
        $("#" + currandom).remove();
      }
    }, 1)
  }
  var takeDamage = function(id, enemyHealth) {
    // console.log("Current Enemy Health: " + enemyHealth);

  }

  function Enemy() {
    this.randomClassGenerator = "enemy" + String(Math.floor(Math.random() * 4) + 1);
    this.randomIDgenerator = Math.round(Math.random() * 50000);
    this.randomPosition = Math.floor(Math.random() * 300);
    this.enemyHealth = Math.floor(Math.random() * 5) + 1;
    this.ouch = takeDamage(this.randomIDgenerator, this.enemyHealth);
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
    setInterval(function(){
      enemyDIV.text(enemyDIV.data().enemyHealth);
    }, 1)
    game.level.append(enemyDIV);
    if (game.allEnemies.length === 20) {
      setInterval(function(){
        game.allEnemies.last().remove();
      }, 1)
    }
    setInterval(function(){
      if (enemyDIV.data().enemyHealth <= 0) {
        $("#" + enemyDIV.data().randomIDgenerator).effect("explode", {pieces: 5}, 500).remove();
      }
    }, 1)
    if(enemyDIV.data().counter === (game.levelWidth - 100)) {
      (game.levelWidth - 100)
      enemyDIV.remove();
    }
  }
  createEnemy();
  var gamePlaying = setInterval(function(){
    createEnemy()
  }, game.gameSpeed[0]);


  if (game.loseCondition === 20) {
    game.allEnemies.remove();
    clearInterval(gamePlaying);
  }



  function gamestate() {
    // if (counter <= (levelWidth - 100)) {
    game.currgamestate = requestAnimationFrame(gamestate);
    var gamePad = navigator.getGamepads()[0];
    game.currTimestamp = gamePad.timestamp;
    // if (gamePad.timestamp === "undefined") {
    // }
    // Comparing the state of the current timestamp
    // and the previous, to prevent continous button input
    // from incrementing counter.
    if (game.prevTimeStamp != game.currTimestamp) {
      // Below took me 10 hours to figure out
      // thank you asynchronous functions!
      if (gamePad.buttons[0].pressed) {
        $(".enemy1").data().enemyHealth -= 1
      console.log($(".enemy1").first().data().enemyHealth)

        // $(".enemy1").first()
      }
      if (gamePad.buttons[1].pressed) {
        $(".enemy2").first().data().enemyHealth -= 1
        // $(".enemy2").first().effect("explode", {pieces: 5}, 500).remove();
      }
      if (gamePad.buttons[2].pressed) {
        $(".enemy3").first().data().enemyHealth -= 1

        // $(".enemy3").first().effect("explode", {pieces: 5}, 500).remove();
      }
      if (gamePad.buttons[3].pressed) {
        $(".enemy4").first().data().enemyHealth -= 1

        // $(".enemy4").first().effect("explode", {pieces: 5}, 500).remove();
      }
    }
    game.prevTimeStamp = game.currTimestamp;
  }
gamestate();
// End of code
})
})();
