// Used for all the Game Logic to seperate that from the UI
export default class GamePlayState {
  // Private Fields
  #score = 0
  #selectedActorID
  #correctMovieID

  // When the user picks an actor
  selectedActor(actorID) {
    this.#selectedActorID = actorID

    // Arrange movies to show based on the actorID
  }

  // When the user tries to pick the correct movie
  movieSelected(movieID) {
    if (movieID === this.#correctMovieID) {
      // He picked correctly, increase the score
      this.#score += 1
    } else {
      // Wrong answer, decrease the score, we allow negative score
      this.#score -= 1
    }
  }
}
