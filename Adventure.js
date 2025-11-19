<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Denise Dungeon</title>
</head>
<body style="background:black; color:white; font-family:monospace; padding:20px;">
<script>
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
async function ask(q) { return (prompt(q) || "").trim(); }

let playerName = "";

async function ending(status) {
  let msg = "";
  msg += "--------------------------------------------------\n";
  if (status === "win") {
    msg += "*** CONGRATULATIONS! YOU'VE WON! ***\n";
    msg += "Your bravery has paid off!\n";
  } else {
    msg += "*** G A M E   O V E R ***\n";
    msg += "The dungeon proved too challenging.\n";
  }
  msg += "--------------------------------------------------";
  alert(msg);
}

async function home() {
  alert("You safely arrive home. You survived!");

  while (true) {
    let choice = await ask(
      "You feel like there's more to do...\n" +
      "1: Go home (Win)\n" +
      "2: Enter the dungeon again\n"
    );

    if (choice === "1") {
      await ending("win");
      return "finished";
    } 
    if (choice === "2") {
      return "restart";
    }
    alert("Invalid option.");
  }
}

async function left_path() {
  alert("You take the left path. The ground starts to quake!");

  const action = (await ask("Turn back or continue? (back/continue):")).toLowerCase();

  if (action === "back") {
    alert("Debris blocks the way back. You follow the light and find riches!");
    await ending("win");
    return "finished";
  }

  if (action === "continue") {
    const outcome = randomChoice([
      "You trip, the ground collapses, and you fall to your death.",
      "You get pulled deeper into the dungeon, forever trapped."
    ]);

    alert(outcome);

    if (outcome.includes("death")) {
      await ending("lose");
      return "finished";
    }

    const encounter = randomChoice([
      "A medusa-like beast appears! Instant death.",
      "You fall into a massive hole. You died, brah!"
    ]);

    alert(encounter);
    await ending("lose");
    return "finished";
  }

  alert("Invalid choice. Nothing happens. You wake up at home.");
  return await home();
}

async function straight_path() {
  alert("You enter a cavern. In the center you see a strange red stick.");

  while (true) {
    const action = (await ask("Pick up the stick? (pick/no):")).toLowerCase();

    if (action === "pick") {
      const discovery = randomChoice([
        "It's stuck. You pull it—awaken a Wyvern! DEAD!",
        "It's just a stick. You leave the dungeon alive!"
      ]);

      alert(discovery);

      if (discovery.includes("DEAD")) {
        await ending("lose");
        return "finished";
      }

      return await home();
    }

    if (action === "no") {
      alert("You ignore the stick and leave safely!");
      return await home();
    }

    alert("Invalid option.");
  }
}

async function start_adventure() {
  alert("You enter a portal leading to a mysterious dungeon...");

  while (true) {
    let choice = await ask("Choose a path:\n1: Left (light)\n2: Straight (darkness)");

    if (choice === "1") return await left_path();
    if (choice === "2") return await straight_path();

    alert("Invalid option.");
  }
}

async function greet() {
  alert("Welcome to DENISE DUNGEON");
  playerName = await ask("What is your name?");
  alert("Welcome, " + playerName + ". Your demise begins now...");
}

async function game() {
  await greet();
  return await start_adventure();
}

async function main() {
  while (true) {
    await game();
    let again = (await ask("Play again? (Y/N):")).toUpperCase();
    if (again !== "Y") {
      alert("Thanks for playing!");
      break;
    }
  }
}

main();
</script>
</body>
</html>
