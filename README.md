# Movie Game

## Movie Game on the TV in the Browser with the Lighting.js framework

> ### One point for selecting the right Movie for the Actor and -3 points if the wrong Movie is selected

### Getting started

> Before you follow the steps below, make sure you have the
[Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed **globally** on your system.
Install the Lightning UI framework:

```{bash}
npm install -g @lightningjs/cli
npm install @lightningjs/ui
```

#### Running the App

> NOTE: The following instructions apply to macOS or Linux/Unix, adjust for Windows.

1. Clone the project: `git clone https://github.com/sverrisson/com.movies`
and move to the folder: `cd com.movies`.

2. Install the dependencies listed above and the NPM dependencies by running: `npm install`.

3. Create a new file named `.env` and store the API key there: `APP_API_KEY=<Your Key>`. Use the version: `API v3`, API key and if you don't have an API key, you can get it here: `https://www.themoviedb.org/documentation/api`.

4. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project.

5. Fire up a local webserver and open the Game in a browser by running: `lng serve` inside the root of your project.

6. Adjust the browser window to the size 1920 x 1080 and the arrow keys to navigate and return to select.

## Developing the App

### The following are left to be done as this is a WIP

- Testing, Lightning recommends the Jest framework.
- Accessibility.
- Internationalization with de, fr, it.
- Seperate the game play more from the UI.
- Experiment with mouse and touch.
- Let the user know if JS is turned off.
- More prefetching, to improve on slow networks. The App already stores expensive web calls.
- More Actors and more Movies to increase randomness.
