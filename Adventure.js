// ==========================
// Demise Dungeon - JS Version
// ==========================

// --- Hook into the HTML elements ---
const gameText = document.getElementById("game-text");
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");

// --- Helper functions ---

function print(text) {
  gameText.innerText += text + "\n";
  gameText.scrollTop = gameText.scrollHeight;
}

function clearText() {
  gameText.innerText = "";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomChoice(arr) {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

// --- Game state ---
let playerName = "";
let gamePhase = "init"; // controls what the input means right now

// ====================
// Story functions
// ====================

async function ending(status) {
  print("-".repeat(50));

  if (status === "win") {
    print("");
    print("\t*** CONGRATULATIONS! YOU'VE WON! ***");
    print("");
    print("Your bravery has paid off. You emerge from the dungeon rich and safe.");
  } else {
    print("");
    print("\t*** G A M E   O V E R ***");
    print("");
    print("The dungeon proved too difficult. Your adventure ends here.");
  }

  print("-".repeat(50));
  await sleep(500);
  print("");
  print("Would you like to try again? (Type 'Y' for Yes or 'N' for No)");
  gamePhase = "endingChoice";
}

async function homeIntro() {
  print("");
  print("------------------------------------------------------");
  print("You safely arrive home. You have survived the dungeon.");
  print("------------------------------------------------------");
  await sleep(500);
  print("");
  print("You arrive home safely, but you still feel like you need to do something more.");
  await sleep(500);
  print("1: Drive home safely, but you still want to do something.");
  print("2: You decide to go through this all over again.");
  gamePhase = "homeChoice";
}

async function leftPathIntro() {
  print("You take the left path, following the curious light.");
  await sleep(1000);
  print("Suddenly, the ground starts to quake!");
  await sleep(500);
  print("");
  print("Do you turn back or continue on? (Type 'back' or 'continue')");
  gamePhase = "leftDecision";
}

async function straightPathIntro() {
  print("You enter a cavern and you feel an eerie sensation run through your body.");
  await sleep(800);
  print(
    "As you get to the center of the room you notice what appears to be a red colored...stick."
  );
  await sleep(800);
  print("Do you want to pick it up? (Type 'pick' or 'no')");
  gamePhase = "straightDecision";
}

async function startAdventure() {
  print("");
  print(
    "You found a portal that leads to a dungeon. Inside, there are only two paths:"
  );
  print("- One to the left with light in the distance");
  print("- One straight ahead, filled with darkness and eerie sounds.");
  await sleep(800);
  print("");
  print("Which path will you choose?");
  print("1: Enter the left path.");
  print("2: Take the straight path.");
  gamePhase = "choosePath";
}

async function greet() {
  clearText();
  print("Welcome to DEMISE DUNGEON");
  await sleep(700);
  print("What shall you be called?");
  gamePhase = "getName";
}

// ====================
// Main Input Handler
// ====================

submitBtn.addEventListener("click", async () => {
  const raw = userInput.value;
  const input = raw.trim();
  userInput.value = "";

  if (!input && gamePhase !== "init") {
    return; // ignore empty
  }

  switch (gamePhase) {
    // 1. Greeting and name
    case "init":
      await greet();
      break;

    case "getName":
      playerName = input;
      print(`Pleasure meeting you, ${playerName}!`);
      await sleep(800);
      print("Your demise starts now!");
      await sleep(800);
      await startAdventure();
      break;

    // 2. Choose which path
    case "choosePath":
      if (input === "1") {
        await leftPathIntro();
      } else if (input === "2") {
        await straightPathIntro();
      } else {
        print("That's not a valid option! Please enter 1 or 2.");
      }
      break;

    // 3. Left path logic
    case "leftDecision": {
      const action = input.toLowerCase();
      if (action === "back") {
        print(
          "You turn back and run with all your might. You arrive at the portal to find the way blocked by falling debris."
        );
        await sleep(1200);
        print(
          "You are forced to continue toward the light, into a room full of riches beyond imagination!"
        );
        await sleep(1000);
        await ending("win");
      } else if (action === "continue") {
        const outcome = randomChoice([
          "You trip over a rock but get back up and the ground caves in, plunging you to your death.",
          "You run as fast as you can, realizing shortly after you're not making any progress and keep getting pulled into the dungeon, trapped forever."
        ]);

        print(outcome);
        await sleep(1200);

        if (outcome.includes("death")) {
          await ending("lose");
        } else if (outcome.includes("trapped")) {
          const encounter = randomChoice([
            "Just as you get to the opening of the light-filled room, a medusa-like mythical beast appears before you and you die instantly.",
            "As you walk upon the room with the light, you don't notice the huge hole in the ground and plunge into a chasm, breaking your legs and fracturing your spine. You died, brah!"
          ]);

          print(encounter);
          await sleep(1200);
          await ending("lose");
        }
      } else {
        print(
          "That's not a valid option, but nothing happens. You wake up and realize it was all a dream!"
        );
        await sleep(800);
        await homeIntro();
      }
      break;
    }

    // 4. Straight path logic
    case "straightDecision": {
      const action = input.toLowerCase();

      if (action === "pick") {
        const discover = randomChoice([
          "You pick up the stick. Realizing it's stuck in the ground, you pull it and the ground starts moving! You've woken a Wyvern from its slumber and it ferociously attacks you. DEAD!",
          "You pick up the stick. It's just a stick. You realize the dungeon is a total bust and leave. You make it back ALIVE!"
        ]);

        print(discover);
        await sleep(1200);

        if (discover.includes("DEAD")) {
          await ending("lose");
        } else if (discover.includes("ALIVE")) {
          await homeIntro();
        }
      } else if (action === "no") {
        print(
          "You decide to leave the stick. Because why is there only a stick in a dungeon, right?"
        );
        await sleep(800);
        print("You use your brains and just leave. You make it back ALIVE!");
        await sleep(800);
        await homeIntro();
      } else {
        print("That's not a valid option. Try again. (Type 'pick' or 'no')");
      }
      break;
    }

    // 5. Home logic (post-escape)
    case "homeChoice":
      if (input === "1") {
        await ending("win");
      } else if (input === "2") {
        await startAdventure();
      } else {
        print("That's not a valid option. Enter '1' or '2'.");
      }
      break;

    // 6. Ending: play again?
    case "endingChoice": {
      const choice = input.toUpperCase();
      if (choice === "Y") {
        // restart the whole game
        playerName = "";
        await greet();
      } else if (choice === "N") {
        print("");
        print("Thanks for playing! Goodbye.");
        gamePhase = "gameOver";
      } else {
        print("That's not a valid option. Please enter 'Y' or 'N'.");
      }
      break;
    }

    case "gameOver":
      // Ignore input after game over
      print("The adventure is over. Refresh the page to play again.");
      break;

    default:
      // Safety fallback
      await greet();
      break;
  }
});

// Start in init phase so first click starts the greeting
gamePhase = "init";
print("Click Submit to begin your Demise Dungeon adventure...");
