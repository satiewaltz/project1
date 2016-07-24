"use strict";
(function(){
$(function(){
// Start of code
// file:///Users/satiewaltz/code/project1/index.html

  // Game object
  var game = {
    allEnemies: $(".enemy"),
    level: $(".level"),
    levelWidth: $(".level").width(),
    enemySpeedModifer: 1,
    gameSpeed: [600, 700, 800, 1000],
    loseCondition: 0,
    prevTimeStamp: '',
    currTimeStamp: '',

    // Update level width on window resize
    updatelevelWidth: setInterval(function(){
      game.levelWidth = $(".level").width();
    }, 1),

    // Speed up enemy spawn rate every ten seconds
    enemySpawnRateIncreaser: setInterval(function(){
      game.gameSpeed.shift()
    }, 10000),

    // Speed up enemy move speed every second
    enemyMoveSpeedIncreaser: setInterval(function(){
      game.enemySpeedModifer /= 1.02
    }, 1000)
  }

  var enemyPosition = function(identifier, verticalPosition, spawnLocation){
    var updatePosition = setInterval(function() {
      $("#" + identifier).css({
        "top": verticalPosition,
        "left": spawnLocation += 0.5 / (1 * game.enemySpeedModifer)
      });
      if (spawnLocation >= (game.levelWidth - 100)) {
        spawnLocation = (game.levelWidth - 100);
        $("#" + identifier).remove();
        // console.log("you lose")
      }
    }, 1)
  }

  function Enemy() {
    this.randomClassGenerator = "enemy" + String(Math.floor(Math.random() * 4) + 1);
    this.randomIDgenerator = Math.round(Math.random() * 50000);
    this.randomVerticalPosition = Math.floor(Math.random() * 300);
    this.enemyHealth = Math.floor(Math.random() * 5) + 1;
    this.spawnLocation = 0;
    this.location = enemyPosition(this.randomIDgenerator, this.randomVerticalPosition, this.spawnLocation);
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
      if (enemyDIV.data().spawnLocation === (game.levelWidth - 100)) {
        game.allEnemies.remove();
        console.log("You lose!");
      }
    }, 1)
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
    game.currgamestate = requestAnimationFrame(gamestate);
    var gamePad = navigator.getGamepads()[0];
    game.currTimeStamp = gamePad.timestamp;
    // Comparing the state of the current timestamp
    // and the previous, to prevent continous button input
    // from incrementing counter.
    if (game.prevTimeStamp != game.currTimeStamp) {
      // Below took me 10 hours to figure out
      // thank you asynchronous functions!
      // Test to see if jQuery element exists
      // https://learn.jquery.com/using-jquery-core/faq/how-do-i-test-whether-an-element-exists/
      if (gamePad.buttons[0].pressed) {
        if ($(".enemy1").length){
          $(".enemy1").first().data().enemyHealth -= 1;
        }
        // $(".enemy1").first()
      }
      if (gamePad.buttons[1].pressed) {
        if ($(".enemy2").length){
          $(".enemy2").first().data().enemyHealth -= 1;
        // $(".enemy2").first().effect("explode", {pieces: 5}, 500).remove();
        }
      }
      if (gamePad.buttons[2].pressed) {
        if ($(".enemy3").length){
          $(".enemy3").first().data().enemyHealth -= 1;
        // $(".enemy3").first().effect("explode", {pieces: 5}, 500).remove();
        }
      }
      if (gamePad.buttons[3].pressed) {
        if ($(".enemy4").length){
          $(".enemy4").first().data().enemyHealth -= 1;
        // $(".enemy4").first().effect("explode", {pieces: 5}, 500).remove();
        }
      }
    }
    game.prevTimeStamp = game.currTimeStamp;
  }
gamestate();
// End of code
})
})();
