// Used for all the Game Logic to seperate that from the UI
export default class GameState {
  // Private Fields
  #score = 0
  #correctMovieID

  // Only allow a single gamestate
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
  static #isInternalConstructing = false
  constructor() {
    if (!GameState.#isInternalConstructing) {
      throw new TypeError('Model should not be constructed')
    }
  }

  // Use this to create the first instance
  static create() {
    GameState.#isInternalConstructing = true
    const instance = new GameState()
    GameState.#isInternalConstructing = false
    return instance
  }

  getScore() {
    return this.#score
  }

  // The movie that should be picked
  setCorrectMovieID(correctMovieID) {
    this.#correctMovieID = correctMovieID
  }

  // When the user tries to pick the correct movie
  movieSelected(movieID) {
    if (movieID === this.#correctMovieID) {
      // He picked correctly, increase the score
      this.#score += 1
    } else {
      // Wrong answer, decrease the score by 3 points, negative scores allowed
      this.#score -= 3
    }
    return this.#score
  }
}
