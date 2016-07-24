"use strict";
(function() {
$(function() {
// Start of code
// file:///Users/satiewaltz/code/project1/index.html

  // Game object
  var game = {

    // Contains all functions pertaining to enemies
    enemyGameLogic: {
      selectAllEnemies: $(".enemy"),

      // Create enemy data to append to DOM element
      CreateEnemyData: function() {
        this.randomClassGenerator = "enemy" + String(Math.floor(Math.random() * 4) + 1);
        this.randomIDgenerator = Math.round(Math.random() * 50000);
        this.randomVerticalPosition = Math.floor(Math.random() * 270);
        this.enemyHealth = Math.floor(Math.random() * 5) + 1;
        this.spawnLocation = 0;
      },

      // Set the position of the enemy using the previous data
      enemyPosition: function(identifier, verticalPosition, spawnLocation) {
        // Repeat to intialize positon on first millisecond
        $("#" + identifier).css({
          "top": verticalPosition,
          "left": spawnLocation += 0.5 / (1 * game.enemySpeedModifer)
        });
        var updatePosition = setInterval(function() {
          $("#" + identifier).css({
            "top": verticalPosition,
            "left": spawnLocation += 0.5 / (1 * game.enemySpeedModifer)
          });
          // if (spawnLocation >= (game.levelWidth - 100)) {
          //   spawnLocation = (game.levelWidth - 100);
          //   $("#" + identifier).remove();
          //   // console.log("you lose")
          // }
        }, 1);
      },

      // Append the enemy to the DOM. Along with it's data
      appendEnemyToDOM: function() {
        var newEnemyData = new this.CreateEnemyData();
        var enemyDIV = $("<div>");
        enemyDIV.data(newEnemyData);
        enemyDIV.addClass('enemy');
        enemyDIV.addClass(enemyDIV.data().randomClassGenerator);
        enemyDIV.attr('id', enemyDIV.data().randomIDgenerator);

        if ($(".enemy").length === 20) {
          setInterval(function() {
            $(".enemy").last().remove();
          }, 1);
        }

        // Below make the enemies explode upon their untimely demise.
        // It also updates health every millisecond, append it as text.
        setInterval(function() {
          // Continue if theres enemies, if not dont do anything.
          if ($(".enemy").length) {
            enemyDIV.text(enemyDIV.data().enemyHealth);

            // ** Game Win logic ** //
            //
            // Explode if the enemies health is 0 or below, and increment the win condition
            if (enemyDIV.data().enemyHealth <= 0) {
              $("#" + enemyDIV.data().randomIDgenerator).effect("explode", {pieces: 5}, 500).remove();
              game.winCondition += 1;
              //
              // If the win condition is furfilled after the player killed enemy,
              // let player know they won.
              if (game.winCondition === 2) {
                game.winCondition = 0;
                $(".enemy").effect("explode", {pieces: 5}, 500).remove();
                setTimeout(function(){
                  alert("WINRAR IS YOU");
                }, 480)
              }
            }

            // ** Game Loss logic ** //
            //
            // Get the value of the first enemy, first enemy will always have the
            // most "left" value since they spawned first. Splice the "px" suffix
            // and turn the string to a number to compare against the width of the window,
            // or the "end" of the level.
            var enemyLeftValue = Math.floor(Number($(".enemy").first().css("left").slice(0, -2)));
            if (enemyLeftValue >= (game.levelWidth - 30)) {
              $(".enemy").remove();
              console.log("You lose!");
            }
          }
        }, 1);
        game.level.append(enemyDIV);
        this.enemyPosition(enemyDIV.data().randomIDgenerator,
          enemyDIV.data().randomVerticalPosition,
          enemyDIV.data().spawnLocation);
      }
    },

    level: $(".level"),
    levelWidth: $(".level").width(),

    enemySpeedModifer: 1,
    gameSpeed: [600, 700, 800, 1000],
    // Update level width on window resize
    updatelevelWidth: setInterval(function() {
      game.levelWidth = $(".level").width();
    }, 1),
    // Speed up enemy spawn rate every ten seconds
    enemySpawnRateIncreaser: setInterval(function() {
      game.gameSpeed.shift();
    }, 10000),
    // Speed up enemy move speed every second
    enemyMoveSpeedIncreaser: setInterval(function() {
      game.enemySpeedModifer /= 1.02;
    }, 1000),

    prevTimeStamp: '',
    currTimeStamp: '',

    winCondition: 0,
    loseCondition: 0
  };

  // Main Game Loop - Makes the enemies move.
  game.enemyGameLogic.appendEnemyToDOM();
  var gamePlaying = setInterval(function() {
    game.enemyGameLogic.appendEnemyToDOM();
  }, game.gameSpeed[0]);

  // Controller polling loop - Listens to buttons presses.
  (function listenToGamepad() {
    requestAnimationFrame(listenToGamepad);
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

      // Green Button
      if (gamePad.buttons[0].pressed && $(".enemy1").length) {
        $(".enemy1").first().data().enemyHealth -= 1;
      }

      // Red Button
      if (gamePad.buttons[1].pressed && $(".enemy2").length) {
        $(".enemy2").first().data().enemyHealth -= 1;
      }

      // Blue Button
      if (gamePad.buttons[2].pressed && $(".enemy3").length) {
        $(".enemy3").first().data().enemyHealth -= 1;
      }

      // Yellow Button
      if (gamePad.buttons[3].pressed && $(".enemy4").length) {
        $(".enemy4").first().data().enemyHealth -= 1;
      }
    }
    // Reassign the previous timestamp as the current.
    // To compare over again.
    game.prevTimeStamp = game.currTimeStamp;
  })();
// End of code
});
})();
