"use strict";
(function() {
$(function() {
// Start of code
// file:///Users/satiewaltz/code/project1/index.html

  // Game object
  var game = {
    score: 0,
    // Contains all functions pertaining to enemies
    enemyGameLogic: {
      selectAllEnemies: $(".enemy"),

      // Create enemy data to append to DOM element
      CreateEnemyData: function() {
        this.randomClassGenerator = "enemy" + String(Math.floor(Math.random() * 4) + 1);
        this.randomIDgenerator = Math.round(Math.random() * 50000);
        this.randomVerticalPosition = Math.floor(Math.random() * ($(".level").height() - 50));
        this.enemyHealth = Math.floor(Math.random() * 3) + 1;
        this.spawnLocation = 0;
      },

      // Set the position of the enemy using the previous data
      // Also controls enemy move speed
      enemyPosition: function(identifier, verticalPosition, spawnLocation) {
        // Repeat to intialize positon on first millisecond
        $("#" + identifier).css({
          "top": verticalPosition,
          "left": spawnLocation += game.enemySpeedModifer
        });
        setInterval(function() {
          $("#" + identifier).css({
            "top": verticalPosition,
            "left": spawnLocation += game.enemySpeedModifer
          });
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
        game.level.append(enemyDIV);
        this.enemyPosition(enemyDIV.data().randomIDgenerator,
          enemyDIV.data().randomVerticalPosition,
          enemyDIV.data().spawnLocation);
      }
    },

    // Level and Level Width
    level: $(".level"),
    levelWidth: $(".level").width(),
    levelHeight: $(".level").height(),
    // Update level width on window resize
    // Makes game responsive
    updateLevelSize: setInterval(function() {
      game.levelHeight = $(".level").height();
      game.levelWidth = $(".level").width();
    }, 1),

    // Enemy Speed
    enemySpeedModifer: 1,
    gameSpeed: [600, 700, 800, 1000],
    // Speed up enemy spawn rate every ten seconds
    enemySpawnRateIncreaser: setInterval(function() {
      game.gameSpeed.shift();
    }, 100),
    // Speed up enemy move speed every second
    enemyMoveSpeedIncreaser: setInterval(function() {
      game.enemySpeedModifer += 0.04;
    }, 1000),
    // Keep track of gamepad timestamps
    prevTimeStamp: '',
    currTimeStamp: '',

    comboMultiplier: 1,
    comboText: $(".superCombo"),
    comboStreak: 0,
    nextStreak: 5
  };
  // Main Game Loop - Makes the enemies move.
  setInterval(function() {
    game.enemyGameLogic.appendEnemyToDOM();
  }, game.gameSpeed[0]);

  // Controller polling loop - Listens to button presses.
  (function listenToGamepad() {
    requestAnimationFrame(listenToGamepad);
    var gamePad = navigator.getGamepads()[0];
    game.currTimeStamp = gamePad.timestamp;
    // Comparing the state of the current timestamp
    // and the previous, to prevent continous button input
    // from incrementing counter.
    /////////////////////////////////////////////////////////////////
    // ** Code below updates if previous timestamp is different ** //
    //
    if (game.prevTimeStamp != game.currTimeStamp) {
      // Below took me 10 hours to figure out
      // thank you asynchronous functions!
      // Test to see if the jQuery element exists
      // https://learn.jquery.com/using-jquery-core/faq/how-do-i-test-whether-an-element-exists/
      //
      // Green Button on gamepad
      if (gamePad.buttons[0].pressed && $(".enemy1").length) {
        $(".enemy1").first().data().enemyHealth -= 1;
      }
      // Red Button on gamepad
      if (gamePad.buttons[1].pressed && $(".enemy2").length) {
        $(".enemy2").first().data().enemyHealth -= 1;
      }
      // Blue Button on gamepad
      if (gamePad.buttons[2].pressed && $(".enemy3").length) {
        $(".enemy3").first().data().enemyHealth -= 1;
      }
      // Yellow Button on gamepad
      if (gamePad.buttons[3].pressed && $(".enemy4").length) {
        $(".enemy4").first().data().enemyHealth -= 1;
      }
    }
    //////////////////////////////////////////
    // ** Code Below Updates Every Frame ** //
    //
    // Below make the enemies explode upon their untimely demise.
    // It also updates health every millisecond, append it as text.
    // Continue if theres enemies, if not dont do anything.
    if ($(".enemy").length) {
      // Grabs lastest enemy, and appends their health to them.
      $("#" + $(".enemy").data().randomIDgenerator).text($(".enemy").data().enemyHealth);

      //////////////////////////
      // ** Game Win logic ** //
      //
      // Explode if the enemies health is 0 or below, and increment the win condition
      if ($(".enemy").data().enemyHealth <= 0) {
        $(".enemy").data().enemyHealth = 0;
        game.score += (1 * game.comboMultiplier);
        $("#" + $(".enemy").data().randomIDgenerator).effect("explode", {pieces: 5}, 500).remove();
        game.comboStreak += 1;
        //

        // Display message depending on current combo streak
        if (game.comboStreak === game.nextStreak) {
          $(".enemy").effect("explode", {pieces: 5}, 500).remove();
          switch(game.comboStreak) {
            case 5:
              game.comboText.show().text("Nice combo! 👍");
              game.comboMultiplier = 2;
              break;
            case 15:
              game.comboText.show().text("Pretty good combo! Show those bugs no mercy! 👍");
              game.comboMultiplier = 3;
              break;
            case 25:
              game.comboText.show().text("Great combo! 👍");
              game.comboMultiplier = 4;
              break;
            case 45:
              game.comboText.show().text("Fantastic combo you silly coder! 👍");
              game.comboMultiplier = 5;
              break;
            case 65:
              game.comboText.show().text("Are you Linus?! 👍");
              game.comboMultiplier = 10;
              break;
            case 95:
              game.comboText.show().text("Paul Irish is proud of you! 👍");
              game.comboMultiplier = 100;
              break;
          }
          game.nextStreak += (5 * game.comboMultiplier);
          setTimeout(function(){
            game.comboText.fadeOut('slow');
          }, 1200);
          console.log(game.nextStreak);
        }
      }
      //
      ///////////////////////////
      // ** Game Loss logic ** //
      //
      // Get the value of the first enemy, first enemy will always have the
      // most "left" value since they spawned first. Splice the "px" suffix
      // or the "end" of the level.
      var enemyLeftValue = Math.floor(Number($(".enemy").first().css("left").slice(0, -2)));
      if (enemyLeftValue >= (game.levelWidth - 50)) {
        // $(".superCombo").text("");
        $(".enemy").remove();
        game.score = 0;
        game.comboStreak = 0;
        game.comboMultiplier = 1;
        game.nextStreak = 5;
        game.enemySpeedModifer = 1;
        console.log("You lose!");
      }
      // Update score and streak on DOM after everything
      $("#streak").text(game.comboMultiplier);
      $("#score").text(game.score);
    }
    // Reassign the previous timestamp as the current.
    // To compare over again.
    game.prevTimeStamp = game.currTimeStamp;
  })();
// End of code
});
})();
