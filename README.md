# Tic Tac Toe

Description to come!

# Technologies used

* HTML
* CSS
* JavaScript
* jQuery

# Planning

The first stage of planning were initial layouts and user stories. The layouts can be viewed [here](https://imgur.com/PUK2hvc) and [here](https://imgur.com/51yMxwm). Initial user stories can be seen [here](https://pastebin.com/Sh1fpYE6) and revised user stories with more detail can be seen [here](https://pastebin.com/Y5n7DUZB)

Once intial planning was finished, I set out to start the programming section. First I set up a basic html document with key elements. These key elements included the game board and the forms for handling user account functions (Sign in, sign up, sign out, change password and display past games). Once these were set up, I began work on the game logic locally. I got the board to display alternating Xs and Os on clicks first, then set up my logic for determining if a player had won the game and who it was as well as if the game had ended in a draw.

Once game logic was working locally I added the intended functionality to user account forms to allow users to sign up, in and out as well as change their password and view how many games they had played.

After user account management functionality was added, I began to connect the game logic to the API. First I rewrote my new game function to make a POST request to the API endpoint and store the returned object locally and use that instead of the blank array I had been using for the game. Once I was able to both successfully get a game object returned to me and update it locally I began to set up a function that would trigger after a user had successfully made a new move and sends a PATCH request to the API endpoint. The request include the move's index, letter to be placed and whether the game had finished or not.

Once the app would allow a user to manage their account, play games and have the games recorded on the server, I moved on to styling the page and controlling what options were presented to users at what times. I tried to make sure that users were never presented with options that would return errors if completed correctly. Sign out isn't available to a user who hasn't signed in, users cannot open the option menu until logged in, the game board is covered with an overlay until the game has actually started etc.

Once I had a user interface I was satisfied with, I began the process of testing and refining my code to avoid errors. There were several piece of code which at this point I realized were 'clever' rather than just functional. For example, I had a function for adding a letter to a space which would be unbound when it completed and then bind a function to that square to return a 'error invalid move' message to the user. This resulted in the error being shown when it shouldn't, the fix was simply to add logic to the function adding the letter to check if a letter was already present in the space the user had clicked, and if there was, to return the error and otherwise just add the letter and send a PATCH request. I also added a .load() function to remove the slight flicker that was occuring on page load.

# Future changes

* Add ability to restart an unfinshed game
* Add multiplayer functionality
* Signing up for a new account also signs the user in automatically
