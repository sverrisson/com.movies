import { Utils, Router, Log } from '@lightningjs/sdk'
import GameState from './models/gameState'
import Model from './models/model'
import router from './routes'

export default class App extends Router.App {
  #gameState
  #model

  // GamePlayEvents
  $startGame() {
    Log.info('startGame')
    Router.navigate('home')
  }

  $getScore() {
    return this.#gameState.getScore()
  }

  $actorSelected(actor) {
    Log.info('Actor Selected', actor)
    // Pick one movie for the actor
    const actorMovie = actor.movies.sort(() => Math.random() - 0.5)[0]
    this.#gameState.setCorrectMovieID(actorMovie.id)
    let movies = [actorMovie]
    // Get the other random movies
    this.#model.moviesWithoutActor(actor.actorID).then((otherMovies) => {
      const shuffledMovies = movies.concat(otherMovies).sort(() => Math.random() - 0.5)
      Router.navigate(`movies/${actor.actorID}`, { actor, movies: shuffledMovies })
    })
  }

  $movieSelected(movieID) {
    Log.info('Movie Selected', movieID)
    this.#gameState.movieSelected(movieID)
    Router.navigate('home')
  }

  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      ...super._template(),
    }
  }

  _setup() {
    // Setup routing
    Router.startRouter(router, this)
    Log.info('Initialise PlayState and Model')
    this.#gameState = GameState.create()
    this.#model = new Model()
  }

  _handleAppClose() {
    Router.navigate('$')
  }
}
