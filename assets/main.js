
/**
 * DOM Adventure Game
 */

/* Create a space for a white space where text will appear */
let textArea = document.createElement('div');
textArea.className = 'white-space';

/* Create two div buttons to click to go to next option */

let wrapper = document.createElement('div');
wrapper.className = 'wrapper';

let optionOne = document.createElement('div');
let optionTwo = document.createElement('div');
optionOne.className = 'options';
optionTwo.className = 'options';

wrapper.appendChild(optionOne);
wrapper.appendChild(optionTwo);



document.querySelector('#game').appendChild(textArea);
document.querySelector('#game').appendChild(wrapper);

/* End of button creation */




// Create variables for player's health, stamina, and mana (the player's "stats")
let health = 100;
let stamina = 100;
let mana = 0;
// Create a variable for choice, so it does not need to be made in each function
let choice;



// This function will be if the player wants to check their stats
const checkStats = function(check) {
 //If the check is true, send a string with all the stat values
 if(check === true) {
   return `\n Health is ${health}\n Stamina is ${stamina}\n Mana is ${mana}\n`;
 }
 return;
};



// Show this message when the player dies
const endScene = function() {
  //Reset stats after game is over
  health = 100;
  stamina = 100;
  mana = 0;
  // Print out the end message
  choice = prompt("\nThe end. Play Again? -yes- or -no-\n");
  // If user says yes, restart. Otherwise do nothing
  if(choice === "yes") {
    console.log("\n\n");
    start();
  }
  else {
    console.log("\nThanks for playing!");
    return;
  }
};



// This function can be called after a major event happens, to see if player wants to check on stats. The object is to send in what the player sits on in the break scene.
const breakScene = function(object = "log") {

  // Dialogue
  console.log("\n.....\n.....\n.....\n");
  console.log(`After a long escape, you find respite on an old ${object}.`);

  // Ask if they want a stat check
    if(prompt("\nCheck your stats? -yes- or -no-\n") === "yes") {
      console.log(checkStats(true));
    }
};



const rockAttack = function() {
  // Dialogue
  console.log("\nYou decide to settle down and not jump at every noise. Unfortunately, the rock you are sitting under seems tired of your precense. A giant claw reaches around and... You are never heard from again.");
  endScene();
};



const meetWizard = function() {
  // Dialogue
  console.log("\nIt turns out, it was an old wizard, carving his wizard staff. The wizard guffaws at your presence. \n\n I can sense great magic power from you, would you be my apprentice? -yes- or -no-");
  choice = prompt("");
  if(choice === "yes") {
    // Dialogue
    console.log("\nYou follow the wizard back to his tower. Thereafter, under his studious teachings you become the court wizard of a nearby city.");

    // Add 100 to mana for becoming a court wizard
    console.log("\nMana + 100\n");
    mana += 100;

    // Dialogue
    console.log("With your wizard knowledge, the city prospers like never before, and you go down in history with tales of your heroism as the court wizard.");

    // Trigger end scene
    endScene();
  } else if(choice === "no") {
    // Dialogue
    console.log("\nThe wizard is disappointed. \"What a waste of talent\" he says. He promptly walks away, and you live the rest of your life in the woods after you fail to find your way out.")

    // Trigger end scene
    endScene();
  } else {
    // Dialogue
    console.log("\nThe wizard, confused by your gibberish, slowly walks away, and you live the rest of your life in the woods after you fail to find your way out.");

    // Trigger end scene
    endScene();
  }
};



const findCity = function(outcome) {
  if(outcome === "good") {
    // If user took the sword, get good ending
    console.log("After days of walking, you reach the edge of the forest. On the edge of the horizon you see a city. Upon arriving at the gate, the guards ask you for coin to enter. Luckily, you have the gold from the merchant. Back to civilization at last, you live a fulfilling life helping lost stragglers, as you used to be.");

    // Trigger end scene
    endScene();
  } else if(outcome === "bad") {
    // If the user did not take the sword, they get bad ending
    console.log("After days of walking, you reach the edge of the forest. On the edge of the horizon you see a city. Upon arriving at the gate, the guards ask you for coin to enter. Unfortunately, you have none. You turn around, and return to the forest. Never to be heard from again...");

    // Trigger end scene
    endScene();
  }
};



const findGoldBag = function(findGold) {
  // If the player took the sword, they get gold
  if(findGold === "yes") {
    console.log("You continue on the path, and eventually spot a bandit group ahead, hastling a merchant. An idea that won't away appears in your mind. You run at them, rusty sword in hand, and shout them away? And... Somehow that worked? As a reward for your bravery, the merchant gives you a gold bag. Your journey yet continues...\n");
    // Send player to city scene, with good argument
    findCity("good");
  } else {
    // If the player didn not take sword, they don't get gold
    console.log("You wander on your path, and spot a bandit group hastling a merchant... Unfortunately you have nothing to stop their heinous actions, and you skirt around them. Your journey yet continues...\n");
    // Send player to city scene, with bad argument
    return findCity("bad");
  }
};



// This scene is if the player goes left from start
const goblinAttack = function() {

  // Dialogue
  console.log("\nYou walk for what feels like an hour and are feeling a bit tired.\n");
  console.log("-5 Stamina");
  // Take 5 stamina away
  stamina -= 5;
  console.log("\nYou spot something odd. A small green object is running at you? You notice it has to be a goblin!");

  // Ask the player for their choice
  choice = prompt("Do you -run- at the goblin to try to scare it away, or -run away- yourself?\n");

  // If the player runs at the goblin
  if(choice === "run".toLowerCase()) {
      // Dialogue
      console.log("\nYou charge head first at the creature, while flailing your arms around!");
      console.log("Unfortunately, the goblin is not intimidated.");
      console.log("You take a swipe on the arm, and turn tail and run!\n");
      console.log("-30 Health \n-25 Stamina");

      // take some health and stamina off for getting hit and running
      health -= 30;
      stamina -= 25;

      // Call for a break scene
      breakScene("rock", "one");

      // Continue story with a choice
      console.log("\nYou suddenly hear a ticking sound. Investigate? -yes- or -no-");
      choice = prompt("");
      if(choice === "yes") {
        return meetWizard();
      } else {
        return rockAttack();
      }
    // Branch for if player runs away from the goblin
  } else if(choice === "run away".toLowerCase()) {
    // Dialogue
    console.log("\nThe goblin quickly looses interest at a prey that won't fight back. You lose sight of the goblin quickly.");
    console.log("\n-5 Stamina");

    // Call a break scene
    breakScene("rock");

    // Send them to the goldbag scene, but with no gold
    return findGoldBag("no");

  } else {
    // Branch for if player does nothing
    console.log("\nYou hesitate? Okay then... The goblin attacks, and you meet your doom.");

    // Trigger end scene
    return endScene();
  }
};



// Scene for if the player goes right from start
const rustySword = function() {
  // Dialogue
  console.log("\nYou wander down the path: two woods diverged, and the right you have chosen. Perhaps right you were, for you find a rusty sword! Perhaps it will be useful? Do you take it? -yes- or -no-");

  // Ask the user for their choice, and send them to next scene
  choice = prompt("");
  if(choice === "yes") {
    console.log("\nYou take the sword. Hopefully it will find a use. You travel onward, but feel a bit tired.");

    // Take away stamina
    console.log("\nStamina - 10");
    stamina -= 10;

    console.log("");
    // Start a breakScene
    breakScene("Tree branch");
    // Send to the findGoldBag scenario, with yes argument
    return findGoldBag("yes");
  } else if(choice === "no") {
    // Dialogue
    console.log("\nYou don't take the sword. Who kind of use could such an old piece of junk really have? You travel onward, but feel a bit tired.");

    // Take away stamina
    console.log("\nStamina - 10");
    stamina -= 10;

    // Start a break scene
    breakScene("Invisible chair");
    // Send to the findGoldBag scenario, with no argument
    return findGoldBag("no");
  } else {
    // Dialogue
    console.log("\nAnalysis Paralysis! You stare in contemplatation at that sword, some say you stare at it to this day...");

    // Trigger end scene
    return endScene();
  }
};



// The player starts here
const start = function() {

  // Setting the Scene
  console.log("You are walking through a verdant green forest, and the sun suddenly shines straight into your eyes.");
  console.log("You soon recover, but something feels different. You keep on walking.");
  console.log("\n.....\n.....\n.....\n");
  console.log("You soon come across a fork in the path.");

  // Ask for user input on path
  choice = prompt("\nWhich path, -left- or -right-, do you pick?\n").toLowerCase();

  // Create branches for each choice
  if (choice === "left") {
    return goblinAttack();
  } else if (choice === "right") {
    return rustySword();
  } else {
    return console.log("You just sit and do nothing. The end.");
  }
};


// Start The Game!
start();
