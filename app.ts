#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import showBanner from "node-banner";

const displayGameTitleAndImage = async () => {
  await showBanner(
    `Guessing Game`,
    ` A fun command line game to test your guessing skills
      ______________________________________________________________
    
          _______  _______  _______  _______ 
         (  ____ )(  ___  )(       )(  ____ \\
         | (    )|| (   ) || () () || (    \\/
         | (____)|| (___) || || || || (_____ 
         |     __)|  ___  || |(_)| |(_____  )
         | (\\ (   | (   ) || |   | |      ) |
         | ) \\ \\__| )   ( || )   ( |/\\____) |
         |/   \\__/|/     \\||/     \\|\\_______)
                                              
      `,
    "blue",
    "blue"
  );
};

async function promptUser() {
  try {
    const answers = await inquirer.prompt({
      type: "input",
      name: "guess",
      message: chalk.yellow(
        "Guess a number between 1 and 100 (type 'exit' to quit):"
      ),
    });
    return answers.guess.trim();
  } catch (error) {
    console.error("Error:", error);
  }
}

function getRandomInt(min = 1, max = 100): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function main() {
  await displayGameTitleAndImage();
  let continueGame = true;
  while (continueGame) {
    const randomNumber = getRandomInt();
    let guessedNumber: number | undefined;
    while (typeof guessedNumber !== "number") {
      const guess = await promptUser();
      if (guess.toLowerCase() === "exit") {
        continueGame = false;
        break;
      }
      const parsedGuess = parseInt(guess);
      if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
        console.log(
          chalk.red(
            "Please enter a valid number between 1 and 100 or 'exit' to quit."
          )
        );
      } else {
        guessedNumber = parsedGuess;
      }
    }
    if (!continueGame) {
      break;
    }
    console.log(chalk.blue("Random Number:"), randomNumber);
    console.log(chalk.blue("Your Guess:"), guessedNumber);
    if (guessedNumber === randomNumber) {
      console.log(
        chalk.green("Congratulations! You guessed the correct number!")
      );
    } else {
      console.log(chalk.red("Sorry, your guess was incorrect."));
    }
  }
  console.log(chalk.yellow("Thank you for playing the Number Guessing Game!"));
}

main();
