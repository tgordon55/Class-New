const gameText = document.getElementById('game-text');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');

function print(text) {
    gameText.innerText += text + "\n";
    gameText.scrollTop = gameText.scrollHeight; // auto-scroll
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Game variables
let playerName = "";
let currentStep = "greet";

// Main game loop
submitBtn.addEventListener('click', async () => {
    const input = userInput.value.trim();
    userInput.value = "";

    if (currentStep === "greet") {
        print(`Nice to meet you, ${input}!`);
        playerName = input;
        await sleep(500);
        currentStep = "choosePath";
        print(`\n${playerName}, your adventure begins now!`);
        await sleep(500);
        print("\nYou find yourself at a crossroads. Where will you go?");
        print("1. Enter the dark forest.");
        print("2. Walk along the beach.");
    } else if (currentStep === "choosePath") {
        if (input === "1") {
            currentStep = "forest";
            print("\nYou enter the dark forest. It's spooky and quiet...");
            await sleep(1000);
            print("Suddenly, you hear a noise behind you!");
            await sleep(1000);
            print("Do you want to run or stay and see what it is?");
        } else if (input === "2") {
            currentStep = "beach";
            print("\nYou walk along the beach. The waves are calming...");
            await sleep(1000);
            print("You see a shiny object in the sand. Do you want to pick it up? (yes/no)");
        } else {
            print("That's not a valid option! Please enter 1 or 2.");
        }
    } else if (currentStep === "forest") {
        if (input.toLowerCase() === "run") {
            const outcomes = [
                "You trip over a root but manage to get up and run away.",
                "You run as fast as you can and escape safely.",
                "You run as fast as you can, but you don’t see the giant hole, and you fall in."
            ];
            const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
            print(outcome);
            if (outcome.includes("fall in")) {
                print("You are unharmed from the fall. You yell for help, but no one comes.");
            } else {
                print("You make your way back home and have a cup of tea.");
            }
            currentStep = "end";
        } else if (input.toLowerCase() === "stay") {
            const encounters = [
                "A friendly rabbit appears! It guides you out safely.",
                "A shadowy figure appears... but it turns out to be just a deer."
            ];
            print(encounters[Math.floor(Math.random() * encounters.length)]);
            currentStep = "end";
        } else {
            print("Invalid action, nothing happens. You walk back safely.");
            currentStep = "end";
        }
    } else if (currentStep === "beach") {
        if (input.toLowerCase() === "yes") {
            const treasures = [
                "You pick up the shiny object and discover it's a golden coin!",
                "It's a piece of glass, but it's smooth and pretty."
            ];
            print(treasures[Math.floor(Math.random() * treasures.length)]);
            currentStep = "end";
        } else if (input.toLowerCase() === "no") {
            print("You walk past the object, but feel relaxed by the sound of the waves.");
            currentStep = "end";
        } else {
            print("You hesitate, but nothing happens. You continue walking.");
            currentStep = "end";
        }
    } else if (currentStep === "end") {
        print("\nThe adventure has ended! Refresh the page to play again.");
    }
});

// Initial greeting
print("Hello, adventurer! Welcome to the land of JavaScript.");
print("What is your name?");
