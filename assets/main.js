
/**
 * DOM Adventure Game
 */

// Create variables for player's health, stamina, and mana (the player's "stats")
let health = 100;
let stamina = 100;
let mana = 0;
// Create a variable for choice, so it does not need to be made in each function
let choiceArray = [];
let dialogueArray = [];
let dialogueNumber = 0;

// Create a hint button, that when clicked, displays a hint to press space bar
let hintButton = document.createElement('div');
hintButton.className = 'hint-button';
hintButton.textContent = "Hover over here for hint!";
//Wrap that hintButton in a hint-wrapper, also to hold the hint-box
let hintWrapper = document.createElement('div');
hintWrapper.className = "hint-wrapper";
hintWrapper.appendChild(hintButton);

// Create a space for a white space where text will appear
let textArea = document.createElement('div');
textArea.className = 'white-space';

// Create two div buttons to click to go to next option, and create a flex wrapper for them both
let wrapper = document.createElement('div');
wrapper.className = 'wrapper';

let optionOne = document.createElement('div');
let optionTwo = document.createElement('div');
optionOne.className = 'options';
optionTwo.className = 'options';

//Append those buttons to the wrapper
wrapper.appendChild(optionOne);
wrapper.appendChild(optionTwo);

document.querySelector('#game').appendChild(hintWrapper);
document.querySelector('#game').appendChild(textArea);
document.querySelector('#game').appendChild(wrapper);
// End of button creation

// Create selectors for optionOne and optionTwo
let optionOneText = document.querySelector('.wrapper:first-child');
let optionTwoText = document.querySelector('.wrapper:last-child');

//This function runs when the hintButton is clicked
const addHintBox = function() {
  let hintBox = document.createElement('div');
  hintBox.className = 'hint-box';
  hintBox.textContent = "Press space-bar to cycle through dialogue until option boxes below are green!";
  hintWrapper.appendChild(hintBox);
  hintButton.removeEventListener("mouseenter", addHintBox);
};

//When the hint button is clicked, add a new div
hintButton.addEventListener("mouseenter", addHintBox);

// Create event listeners to go to next scene depending on which button is depressed
optionOne.addEventListener('click', () => {
  choiceArray[0]();
});
optionTwo.addEventListener('click', () => {
  choiceArray[1]();
});

// These two styles are to set the default color for the option buttons
optionOne.style.backgroundColor = "#ce6262";
optionTwo.style.backgroundColor = "#ce6262";

// This will update the Dialogue if spacebar is pressed
window.addEventListener('keydown', event => {
  if(event.key == ' ') {
    if(dialogueNumber !== dialogueArray.length) {
      textArea.textContent = dialogueArray[dialogueNumber];
      dialogueNumber++;
      if(dialogueNumber == dialogueArray.length) { //
        optionOne.style.backgroundColor = "#b8de6f";
        optionTwo.style.backgroundColor = "#b8de6f";
      }
    }
  }
});

// This function is used to reset dialogue, and choice arrays, along with establishing red bg color at start of scenes for option buttons
const resetValues = function() {
  //Reset button colors back to red
  optionOne.style.backgroundColor = "#ce6262";
  optionTwo.style.backgroundColor = "#ce6262";
  //Reset choiceArray, dialogueArray, and dialogueNumber in case game is restarted
  choiceArray.length = 0;
  dialogueArray.length = 0;
  dialogueNumber = 0;
};


// Show this message when the player dies
const endScene = function() {
  resetValues();

  //Reset stats after game is over
  health = 100;
  stamina = 100;
  mana = 0;

  // Print out the end message
  dialogueArray.push("The end. Play Again?");
  // If user says yes, restart. Otherwise do nothing
  optionOne.textContent = "Yes!";
  optionTwo.textContent = "No...";
  choiceArray.push(start, goodbyeMessage);
};


const goodbyeMessage = function() {
  resetValues();

  textArea.textContent = "Thanks for playing!";
  optionOne.textContent = "";
  optionTwo.textContent = "";
};


// This function will be if the player wants to check their stats
const checkStats = function() {
  textArea.textContent = `Your Health is at ${health}, your Stamina is at ${stamina}, and your Mana is at ${mana}`;
  optionOne.textContent = "";
  optionTwo.textContent = "";
  setTimeout(() => {  choiceArray[1]() }, 5000);
};


// This function can be called after a major event happens, to see if player wants to check on stats. The object is to send in what the player sits on in the break scene.
const breakScene = function(object = "log", nextScene) {
  resetValues();

  // Dialogue
  textArea.textContent = "...............";
  dialogueArray.push(`A long while later, you find respite on an old ${object}.`);

  // Ask if they want a stat check
  dialogueArray.push("You have some spare time. Check your stats?");
  optionOne.textContent = "Yes";
  optionTwo.textContent = "No";

  choiceArray.push(checkStats);
  choiceArray.push(nextScene);
};


const rockAttack = function() {
  resetValues();
  // Dialogue
  textArea.textContent = "You decide to settle down and not jump at every noise. Unfortunately, the rock you are sitting under seems tired of your precense. A giant claw reaches around and... You are never heard from again.";
  endScene();
};


const meetWizard = function() {
  choiceArray.length = 0;
  dialogueArray.length = 0;
  dialogueNumber = 0;

  // Dialogue
  textArea.textContent = "It turns out, it was an old wizard, carving his wizard staff. The wizard guffaws at your presence. \"I can sense great magic power from you, would you be my apprentice?\"";
  optionOne.textContent = "I would love to!";
  optionTwo.textContent = "Ah, no thanks";

  choiceArray.push(meetWizardYes);
  choiceArray.push(meetWizardNo);
};


const meetWizardYes = function() {
  resetValues();

  textArea.textContent = "You follow the wizard back to his tower. Thereafter, under his studious teachings you become the court wizard of a nearby city.";
  dialogueArray.push("Mana + 100");
  // Add 100 to mana for becoming a court wizard
  mana += 100;

  dialogueArray.push("With your wizard knowledge, the city prospers like never before, and you go down in history with tales of your heroism as the court wizard.");

  // Trigger end scene
  endScene();
};


const meetWizardNo = function() {
  resetValues();

  textArea.textContent = "The wizard is disappointed. \"What a waste of talent\" he says. He promptly walks away, and you live the rest of your life in the woods after you fail to find your way out.";

  // Trigger end scene
  endScene();
};


const findCityBad = function() {
  resetValues();

   // If the user did not take the sword, they get bad ending
  textArea.textContent = "After days of walking, you reach the edge of the forest. On the edge of the horizon you see a city. Upon arriving at the gate, the guards ask you for coin to enter. Unfortunately, you have none. You turn around, and return to the forest. Never to be heard from again...";

   // Trigger end scene
   endScene();
};


const findCityGood = function() {

  // If user took the sword, get good ending
  textArea.textContent = "After days of walking, you reach the edge of the forest. On the edge of the horizon you see a city. Upon arriving at the gate, the guards ask you for coin to enter. Luckily, you have the gold from the merchant. Back to civilization at last, you live a fulfilling life helping lost stragglers, as you used to be.";

  // Trigger end scene
  endScene();
};


const findGoldBagYes = function() {
  resetValues();

  // If the player took the sword, they get gold

  textArea.textContent = "You continue on the path, and eventually spot a bandit group ahead, hastling a merchant. An idea that won't go away appears in your mind.";
  dialogueArray.push("You run at them, rusty sword in hand, and shout them away? And... Somehow that worked? As a reward for your bravery, the merchant gives you a gold bag.");
  dialogueArray.push("Your journey yet continues...");
    // Send player to city scene, with good argument
    findCityGood();
};


const findGoldBagNo = function() {
  resetValues();

  // If the player didn not take sword, they don't get gold
  textArea.textcontent = "You wander on your path, and spot a bandit group hastling a merchant... Unfortunately you have nothing to stop their heinous actions, and you skirt around them. Your journey yet continues...";
  // Send player to city scene, with bad argument
  findCityBad();
};


// This scene is if the player goes left from start
const goblinAttack = function() {
  resetValues();

  textArea.textContent = "You walk for what feels like an hour and are feeling a bit tired.";
  dialogueArray.push("-5 Stamina");
  dialogueArray.push("You spot something odd. A small green object is running at you? You notice it has to be a goblin!");
  dialogueArray.push("Do you run at the goblin to try to scare it away, or run away yourself?");

  choiceArray.push(runAt);
  choiceArray.push(runAway);

  // Take 5 stamina away
  stamina -= 5;

  //Update the options' text
  optionOne.textContent = "Run at it";
  optionTwo.textContent = "Run away";
};


// Branch if the player runs at goblin in goblinAttack scene
const runAt = function() {
    resetValues();

    // Dialogue
    textArea.textContent = "You charge head first at the creature, while flailing your arms around!";
    dialogueArray.push("Unfortunately, the goblin is not intimidated.");
    dialogueArray.push("You take a swipe on the arm, and turn tail and run!");
    dialogueArray.push("-30 Health -25 Stamina");

    // take some health and stamina off for getting hit and running
    health -= 30;
    stamina -= 25;

    optionOne.textContent = "";
    optionTwo.textContent = "";

    // Call a break scene after a timeout
    setTimeout(() => { breakScene("rock", tickingSound) }, 7500);
};


const tickingSound = function() {
  choiceArray.length = 0;
  dialogueArray.length = 0;
  dialogueNumber = 0;

  // Continue story with a choice
  textArea.textContent = "You suddenly hear a ticking sound. Investigate?";
  optionOne.textContent = "Investigate";
  optionTwo.textContent = "Ignore it";

  choiceArray.push(meetWizard);
  choiceArray.push(rockAttack);

};


// Branch for if player runs away from the goblin in goblinAttack scene
const runAway = function() {
  resetValues();

  // Dialogue
  textArea.textContent = "The goblin quickly looses interest at a prey that won't fight back. You lose sight of the goblin quickly.";
  dialogueArray.push("-5 Stamina");
  optionOne.textContent = "";
  optionTwo.textContent = "";

  // Call a break scene after a timeout
  setTimeout(() => { breakScene("rock", findGoldBagNo) }, 7500);
  // Send them to the goldbag scene, but with no gold
};


// Scene for if the player goes right from start
const rustySword = function() {
  resetValues();

  // Dialogue
  textArea.textContent = "You wander down the path: two woods diverged, and the right you have chosen.";
  dialogueArray.push("Perhaps right you were, for you find a rusty sword! Perhaps it will be useful? Do you take it?");
  //Update optionOne and optionTwo
  optionOne.textContent = "Take it";
  optionTwo.textContent = "Leave it";
  choiceArray.push(takeIt);
  choiceArray.push(leaveIt)
};


//This branch is if you take the sword in the rustySword scene
const takeIt = function() {
  resetValues();

  textArea.textContent = "You take the sword. Hopefully it will find a use. You travel onward, but feel a bit tired.";

  // Take away stamina
  dialogueArray.push("Stamina - 10");
  stamina -= 10;

  optionOne.textContent = "";
  optionTwo.textContent = "";

  // Call a break scene after a timeout, send to findGoldBagYes
  setTimeout(() => { breakScene("Tree branch", findGoldBagYes) }, 7500);
};


//This bracnh is if you leave the sword in the rustySword scene
const leaveIt = function() {
  resetValues();

  // Dialogue
  textArea.textContent = "You don't take the sword. Who kind of use could such an old piece of junk really have? You travel onward, but feel a bit tired.";

  // Take away stamina
  dialogueArray.push("Stamina - 10");
  stamina -= 10;

  optionOne.textContent = "";
  optionTwo.textContent = "";

  // Call a break scene after a timeout, send to findGoldBagNo
  setTimeout(() => { breakScene("Invisible chair", findGoldBagNo) }, 7500);
};


// The player starts here
const start = function() {
  resetValues();

  // Setting the Scene
  textArea.textContent = "You are walking through a verdant green forest, and the sun suddenly shines straight into your eyes. You soon recover, but something feels different. You keep on walking.";
  dialogueArray.push("...............");
  dialogueArray.push("You soon come across a fork in the path. Which path, left or right, do you pick?");

  optionOne.textContent = 'Left';
  optionTwo.textContent = 'Right';

  choiceArray.push(goblinAttack);
  choiceArray.push(rustySword);
};


// Start The Game!
start();
