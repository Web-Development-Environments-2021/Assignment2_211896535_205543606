# Assignment2_211896535_205543606
Pacman game by Ben Margalit and Mor Saranga

Ben Margalit: 211896535

Mor Saranga: 205543606

Website URL: https://web-development-environments-2021.github.io/Assignment2_211896535_205543606/

### Overview

This game is pacman simple game for our web development course. We used Javascript, Jquery, HTML and CSS.

## What's in the site?
* **Home** - a page that contains a logo, Legister and Login buttons.
* **Register** - a page that allows the user to register to the site, using jquery validation to make sure the inputs are valid.
* **Login** - a page that allows the user to login, using jquery validation to make sure the inputs are valid.
* **Settings** - a page that asks the user to select preferences for the game, such as keys to play, number of food balls, number of ghosts, time of the game, colors for the food points. There is a random button that randomly changes the prefernces.
* **Game** - a page that has the game itself, at the top of the game it shows the username, score, time passed from the game's beginning, timer, and how many lives the user has. at the side, the user sees the preferences he has chosen and a new game button.

## Game Rules:
* Use the keys selected to move around the board.
* Eat food for score. There are 3 kinds of food points, smaller worth 5 points, medium worth 15 points and big worth 25 points.
* If a ghost catches the pacman, you lose 1 life and 10 points off the score.
* If you eat the special moving canfy, you get 50 points.
* Game ends when pacman loses all it's lives, or the time's up.

## Special Functionality
We've added the following special functionality:
* **Teleport** - at the center of the board there is a teleport cell. If pacman or one of the ghosts or the candy walks into it, they get thrown into a random position in the board.
* **Move to other side of the board** - There are holes in the walls sides, if pacman goes into it and walks past it, it comes out of the oopposite side of the board. The ghosts and candy can't go through it.


 
