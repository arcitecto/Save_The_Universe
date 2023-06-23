// Ship class
class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  // Attack the target ship
  attack(target) {
    if (Math.random() < this.accuracy) {
      target.hull -= this.firepower;
      console.log("You hit the alien ship!");

      if (target.hull <= 0) {
        console.log("You destroyed the alien ship!");
        return true; // Ship destroyed
      }
    } else {
      console.log("You missed the alien ship!");
    }

    return false; // Ship not destroyed
  }
}

// Generate random values for alien ship properties
function generateAlienShip() {
  const hull = getRandomNumber(3, 6);
  const firepower = getRandomNumber(2, 4);
  const accuracy = getRandomNumber(0.6, 0.8);

  return new Ship(hull, firepower, accuracy);
}

// Get a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Game setup
const USS_Assembly = new Ship(20, 5, 0.7);
const alienShips = [];
const numAlienShips = 6;

for (let i = 0; i < numAlienShips; i++) {
  alienShips.push(generateAlienShip());
}

// Game logic
let currentShip = 0;

function playTurn() {
  if (currentShip >= numAlienShips) {
    console.log("Congratulations! You destroyed all the alien ships.");
    return;
  }

  const alienShip = alienShips[currentShip];

  console.log(`\n--- Alien Ship ${currentShip + 1} ---`);
  console.log(`Alien Ship Hull: ${alienShip.hull}`);

  // Player attacks the alien ship
  if (USS_Assembly.attack(alienShip)) {
    // Alien ship destroyed
    currentShip++;

    if (currentShip < numAlienShips) {
      // Ask player to attack the next ship or retreat
      const choice = prompt(
        "Do you want to attack the next ship or retreat? (attack/retreat)"
      );

      if (choice === "attack") {
        playTurn();
      } else if (choice === "retreat") {
        console.log("You made a hasty retreat. Game over.");
      } else {
        console.log("Invalid choice. Game over.");
      }
    }
  } else {
    // Alien ship attacks the player
    if (alienShip.attack(USS_Assembly)) {
      console.log("Your ship has been destroyed. Game over.");
      return;
    }

    playTurn(); // Continue the turn
  }
}

// Start the game
playTurn();
