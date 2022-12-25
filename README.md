# Movie Game

## TV Browser Game

### Getting started

> Before you follow the steps below, make sure you have the
[Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system.
Install the Lightning UI framework:

```{bash}
npm install -g @lightningjs/cli
npm install @lightningjs/ui
```

#### Running the App

NOTE: The following instructions apply to macOS or Linux/Unix, adjust for Windows.

1. Git clone the project: `git clone https://github.com/sverrisson/com.movies` and go into the folder: `cd com.movies`

2. Install the dependencies listed above and the NPM dependencies by running: `npm install`.

3. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project.

4. Fire up a local webserver and open the App in a browser by running: `lng serve` inside the root of your project.

## Game Play

> One point for selecting the right Movie for the Actor and -3 points if the wrong Movie is selected.

### Developing the App

#### The following are left to be done

- Testing, Lightning recommends Jest.
- Accessibility.
- Internationalisation with languages.
- Seperate the game play more from the UI.
- Experiment with mouse and touch.
- Let the user know if JS turned off.
- More prefetching to improve on slow networks.
- More Actors and more Movies to increase randomness.
