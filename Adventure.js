// Denise Dungeon Game - JavaScript Version (Node.js)

const readline = require('readline');

// Setup readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask a question and wait for input
function ask(questionText) {
  return new Promise((resolve) => {
    rl.question(questionText, (answer) => {
      resolve(answer);
    });
  });
}

// Helper function to simulate sleep (like time.sleep in Python)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper for random choice from an array (like random.choice in Python)
function randomChoice(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

let playerName = "";

// --- Game Ending Function (equivalent to Python ending(status)) ---
async function ending(status) {
  console.log("-".repeat(50));

  if (status === "win") {
    console.log("\n\t*** CONGRATULATIONS! YOU'VE WON! ***\n");
    console.log("Your bravery has paid off. You emerge from the dungeon rich and safe.");
  } else {
    console.log("\n\t*** G A M E   O V E R ***\n");
    console.log("The dungeon proved too difficult. Your adventure ends here.");
  }

  console.log("-".repeat(50));
  await sleep(1000);

  while (true) {
    let choice = (await ask("Would you like to try again? (Type 'Y' for Yes or 'N' for No): "))
      .trim()
      .toUpperCase();

    if (choice === "Y") {
      console.log("\nStarting a new adventure...\n");
      await sleep(1000);
      await game(); // restart game
      return;
    } else if (choice === "N") {
      console.log("\nThanks for playing! Goodbye.");
      rl.close();
      process.exit(0); // Gracefully exit
    } else {
      console.log("That's not a valid option. Please enter 'Y' or 'N'.");
    }
  }
}

// --- Functions for Game Flow ---

// Equivalent to home()
async function home() {
  console.log("\n------------------------------------------------------");
  console.log("You safely arrive home. You have survived the dungeon.");
  console.log("------------------------------------------------------\n");
  await sleep(1000);

  while (true) {
    console.log("You arrive home safely, but you still feel like you need to do something more.");
    await sleep(1000);
    console.log("1: Drive home safely, but you still want to do something.");
    console.log("2: You decide to go through this all over again.");

    let choice = (await ask("Enter '1' or '2': ")).trim();

    if (choice === "1") {
      // WINNING SCENARIO 1
      await ending("win");
      return;
    } else if (choice === "2") {
      // Restart the adventure
      await start_adventure();
      return;
    } else {
      console.log("That's not a valid option. Try again.");
      await sleep(1000);
    }
  }
}

// Equivalent to left_path()
async function left_path() {
  console.log("You take the left path, following the curious light.");
  await sleep(2000);
  console.log("Suddenly, the ground starts to quake!");
  await sleep(1000);

  let action = (await ask("Do you turn back or continue on? (Type 'back' or 'continue'): "))
    .trim()
    .toLowerCase();

  if (action === "back") {
    console.log("You turn back and run with all your might. You arrive at the portal to find the way blocked by falling debris.");
    await sleep(2000);
    console.log("You are forced to continue with the light, a room full of riches beyond imagination!");
    await sleep(2000);

    // WINNING SCENARIO 2
    await ending("win");
    return;

  } else if (action === "continue") {
    const outcome = randomChoice([
      "You trip over a rock but get back up and the ground caves in, plunging you to your death.",
      "You run as fast as you can, realizing shortly after you're not making any progress, and keep getting pulled into the dungeon, trapped forever."
    ]);

    if (outcome.includes("death")) {
      console.log(outcome);
      await sleep(3000);
      // LOSING SCENARIO 1
      await ending("lose");
      return;
    } else if (outcome.includes("trapped")) {
      console.log(outcome);
      await sleep(3000);

      const encounter = randomChoice([
        "Just as you get to the opening of the light-filled room, a medusa-like mythical beast appears before you and you die instantly.",
        "As you walk upon the room with the light, you don't notice the huge hole in the ground and plunge into a chasm, breaking your legs and fracturing your spine. You died, brah!"
      ]);

      if (encounter.includes("instantly")) {
        console.log(encounter);
        await sleep(3000);
        // LOSING SCENARIO 2
        await ending("lose");
        return;
      } else {
        console.log(encounter);
        await sleep(3000);
        // LOSING SCENARIO 3
        await ending("lose");
        return;
      }
    }
  } else {
    console.log("That's not a valid option, but nothing happens. You wake up and realize it was all a dream!");
    await sleep(2000);
    // Go home safely (neutral ending that leads to home)
    await home();
    return;
  }
}

// Equivalent to straight_path()
async function straight_path() {
  console.log("You enter a cavern and you feel an eerie sensation run through your body.");
  await sleep(1000);
  console.log("As you get to the center of the room you notice what appears to be a red colored...stick. Do you want to pick it up?");
  await sleep(1000);

  while (true) {
    let action = (await ask("Type 'pick' or 'no': ")).trim().toLowerCase();

    if (action === "pick") {
      const discover = randomChoice([
        "You pick up the stick. Realizing its stuck in the ground, you pull it and the ground starts moving! You've wake up a Wyvern from its slumber and it ferociously attacks you. DEAD!",
        "You pick up the stick. It's just a stick. You realize the dungeon is a total bust and leave. You make it back ALIVE!"
      ]);

      console.log(discover);
      await sleep(3000);

      if (discover.includes("DEAD")) {
        // LOSING SCENARIO 4
        await ending("lose");
        return;
      } else if (discover.includes("ALIVE")) {
        // Successful exit, go home
        await home();
        return;
      }

    } else if (action === "no") {
      console.log("You decide to leave the stick, because why is there only a stick in a dungeon, right? You have brains and decide to just leave.");
      await sleep(2000);
      console.log("You make it back ALIVE!");
      await sleep(2000);
      // Successful exit, go home
      await home();
      return;

    } else {
      console.log("That's not a valid option. Try again.");
    }
  }
}

// Equivalent to start_adventure()
async function start_adventure() {
  console.log("\nYou found a portal that leads to a dungeon. Inside, there are only two paths: one to the left with light in the distance, or one straight ahead filled with darkness and eerie sounds. Which path will you choose?");
  await sleep(1000);

  while (true) {
    console.log("1: Enter the left path.");
    console.log("2: Take the straight path.");
    let choice = (await ask("Enter 1 or 2: ")).trim();

    await sleep(1000);

    if (choice === "1") {
      await left_path();
      break;
    } else if (choice === "2") {
      await straight_path();
      break;
    } else {
      console.log("That's not a valid option! Please enter 1 or 2.");
      await sleep(1000);
    }
  }
}

// Equivalent to greet()
async function greet() {
  console.log("Welcome to DENISE DUNGEON");
  await sleep(1000);

  playerName = (await ask("What shall you be called? ")).trim();

  console.log(`Pleasure meeting you, ${playerName}!`);
  await sleep(2500);

  console.log("Your demise starts now!");
  await sleep(1000);
}

// --- Main Game Execution (equivalent to game()) ---
async function game() {
  await greet();
  await start_adventure();
}

// Initial call to start the game (like if __name__ == "__main__": game())
(async function main() {
  await game();
  // If the game ends without process.exit (e.g., logic tweak), close readline safely
  rl.close();
})();

