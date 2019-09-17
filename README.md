# liri-node-app

<h1>1. The Problem This App Solves.</h1>

This app solves the problem of inputing a "middle man" in the process of searching up different items that house information in different locations. It let's the user stay in one spot and input different search parameters to pull information from all of the websites and puts it into one place for them to see.

<h1>How the app works</h1>
The app first starts by setting all the variables needed to get the user input as well as the API information from those websites. It first requires you to download multiple NPM Packages to ensure that it will function as intended. After the vairables there is a section that will switch or change the function based on the input of the user. It will then take their input and go to the function underneath that which will take their input, do an API call with that input, and the parse out the data and display the information that was set by me to show things like the Title, name, artist, etc.

<h1>How to run the app</h1>
Step 1: Go to root of file and download all required NPM packages through the Terminal window(press cntrl + tilda ~) to get it to come up in VS Code.

Step 2: Know what you want to search for!! Obvious, but easy to miss that part.

Step 3: We will use the movie search function for the sake of this example. In the terminal window type out: node liri.js movie-this (enter movie name here), and then press enter.

Step 4: BEHOLD!! LOOK AT WHAT YOU HAVE CREATED!!! https://media.giphy.com/media/yoJC2NNuYLAS58gewE/giphy.gif

Step 5: If the search was ran correctly you should get information about the Title of the movie, the Year it was released, a short Plot about it, the Actors that were in it, and the Rotten Tomatoes/iMDB rating. Pretty neat, huh? 

<h1>Check out this example of it working below</h1>

https://screencast.com/t/Dtsn5bXj
