# Project 1 - Dave Barthly

## Pseudo Code

_This pseudo code was written as a reference to help me start off when I first began working, the finished code is significantly in form from what I wrote here. Due to working around bugs, and discovering how certain things behaved._

_Though this and the final are similar on a conceptual level now that I read it over again._
***
Var Bat Counter: 0; Gets incremented by the Bat object each time it is created

Bat Object: Property: increments Bat counter Method: Randomizer - produces a random number Method of random Buttons: invoke a random button from the gamepad array using the Randomizer method: and number of buttons to add, passes in randomizer as a method. Each of the buttons will have an event listener to listen for button presses. Adds times to click to defeat as a property Each of the event listeners will decrement a counter on button press, if this counter is 0 the entire object should be removed from the dom. Display button from an array as an image, to tell player what button to press Successful button presses should increase the score Display method: call the above code to display above the sprite, and sprite itself. Append Bat objects to dom. But only if it has button property If counter 0: play an animation showing you celebrating

SetInterval - callback: Adds a new Bat object to the page. At a random location. The setInterval’s second parameter will be randomly generated. Random location will be determined by the ‘top’ css property. By a random-generator that takes a range according the page’s height, but contained enough for the sprites to fully appear at each generation.

Defining how the Bats will be declared as winners: Set a function that takes the margin right as a parameter: check if that number exceeds a certain value

Input from pad: A button press should modify the properties of the Bat object, decrementing the counter assigned to each object. Once the button is pressed it should have its event reset, to avoid continuous presses be held as valid input.

Bats number function: Should be used to define the number of Bats to create. It takes a parameter, a randomly generated number that just defines the number to produce.

Bat constructor: Should have all the properties and methods for the Bat object as outlined above. SetInterval should invoke both the constructor and the Bats number function.

Bats should listen to buttons events at all times. Giant hammer to smash Bats.

## Initial User Stories

A user should be able to destroy Bats using their controller.
A user should be able to freely decide to use a controller or a keyboard to interact with.
A user should be able to see their character wiggle whenever they squash a Bat.
A user should be able to easily view their game score.
A user should be able to upgrade their Bat squashing power after each level.

## Credit

This outlines my usage of the gamepad API, all other credit, and details conventions I must follow to use said API. In the sprit to not plagerize, and academic honesty.

Comparing timestamps is my implemetation of a concept outlined here: http://www.html5rocks.com/en/tutorials/doodles/gamepad/#toc-presses-polling

_Note: I've only used this tutorial to study concepts involving gamepad input, This tutorial was made while the API was still young, and has extremely outdated info regarding usage of it. I heavily relied on MDN's documentation regarding using it._

## Gamepad API Info

https://w3c.github.io/gamepad/#usage-examples The usage example above shows the typical way to access a gamepad, a convention. Accessing the gamepad via requestAnimationFrame shows up through multiple sources.

The only way to listen for button events is in the format of:

 function callback() {
  requestAnimationFrame(callback) // New Frame
  var gamepad = Gamepad // Get the current state of the gamepad in the current frame
  var gamepad = navigator.getGamepads[0] // Another way to do the line above. Grabs first one it finds
  console.log(gamepad.buttons[0]) // Do stuff with buttons by accessing its index
}
callback(); // Reset frame by recalling function
Deviation from the above structure of the program will result in not accessing the API, or errors. I've outlined credit to W3's and MDN's examples that follow this format, which also helped me learn how to utlize it. Though the program structure above is implied to be common convention to do this work.

The code above is following as outlined in the w3 specification itself, all logic is of my work. I am following the reccomended way to access and use the gamepad API. The links below outline what is going on, any similarities within their examples are due to the nature of this being the only way to access/use the API due to its immaturity. Naturally, there is only one way to access a button; through specifiying its index within the buttons array property in the gamepad object.

These links outline the usage of the API, and accessing things such as the gamepad you want to get data from. The examples in the links outlines how to access and use certian features of the API.

Example: navigator.getGamepads returns an array, so the only way for me to access an element in an array is through brackets [i]; and the index of the element I want to access, which is 'i'.

General API Info:

- https://developer.mozilla.org/en-US/docs/Web/API/Gamepad
Info regarding button press property of the Gamepad object:

- https://developer.mozilla.org/en-US/docs/Web/API/GamepadButton/pressed
A method that returns an array of Gamepad objects:

- https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getGamepads
Example from W3C showing usage of the API involving requestAnimationFrame:

- https://w3c.github.io/gamepad/#usage-examples
Note: I only learned after how to do this after studying the example witin the W3 specification and not MDN. And it appears there is no way around to originally implement my own solution to listen for events on the gamepad aside from using requestAnimationFrame. Despite this I've included as much credit where due to outline this as explicitly as possible.

_P.S - The MDN examples were extremely non-intutive but have helped me find a way to get the data I need by accessing certain methods. I then went back to view the MDN examples to see how requestAnimationFrame actually worked._

## Shoutouts

#### People who aided me:

- Bryan Mytko - Storing properties in an javascript object to DOM objects using jQuery's .data().
- Noah Feder - Taking the object oriented approach I eventually did.
- Jared Murphy - Tips regarding separating DOM objects and javascript objects.

## Wireframes

Early stage battle screen

https://wireframe.cc/cVSx1s

_Note: Finished game ended up being close to the above. intially I was more ambitious about what I was going to make but time constrants only allowed for so much in light of what I was implementing. I chose not to make more wireframes to actually get the project v.s. iterating over design ideas._
