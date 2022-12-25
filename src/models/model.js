import { Log, Storage } from '@lightningjs/sdk'

export default class Model {
  static #KEY_ACTORS = 'getAllActors'
  static #KEY_MOVIES = 'getAllMovies'
  static MDB = 'https://api.themoviedb.org'
  static API_KEY = process.env.APP_API_KEY // Your personal key here

  static imageUrl(path, size = 'h632') {
    // backdrop_sizes: ["w300","w780","w1280","original"]
    // profile_sizes:["w45","w185","h632","original"]
    // https://image.tmdb.org/t/p/w185/AHUnhGbnWnjin4M2sNdZYAei9h.jpg
    return `https://image.tmdb.org/t/p/${size}${path}`
  }

  // Storage, uses localStorage but falls back to cookie if not available
  #storeJSON = (key, data) => Storage.set(key, JSON.stringify(data))
  #retrieveJSON = (key) => key && JSON.parse(Storage.get(key))

  // Get movies that don't include actor
  async moviesWithoutActor(actorID) {
    const movies = this.#retrieveJSON(Model.#KEY_MOVIES).sort(() => Math.random() - 0.5)
    let withoutMovies = []
    // We need to go through the movies until we have two without the actor
    for (const movie of movies) {
      // Exit loop if we have enough movies
      if (withoutMovies.length === 2) {
        continue
      }
      const castSet = await this.getActorsInMovie(movie.id)
      // If the actorID is not found in the cast the movie is added
      if (!castSet.has(actorID)) {
        withoutMovies.push(movie)
      }
    }
    return withoutMovies
  }

  // Fetch a detail on an actor from his name
  async getActor(actorName) {
    const nameUri = encodeURIComponent(actorName)
    const query = `${Model.MDB}/3/search/person?api_key=${Model.API_KEY}&language=en-US&query=${nameUri}&page=1&include_adult=false`

    // Fetch the actor data and return a simplified actorData object
    try {
      const response = await fetch(query)
      const data = await response.json()
      const results = data.results
      if (Array.isArray(results) && results.length > 0) {
        const actor = results[0]
        const movies = actor.known_for.filter((item) => item.media_type === 'movie')
        // If there are no movies, the actor is not added
        if (movies.length === 0) return
        return {
          name: actor.name,
          profile_path: actor.profile_path,
          actorID: actor.id,
          movies: movies.sort(() => Math.random() - 0.5),
        }
      } else throw new Error('Actor Data Error')
    } catch (error) {
      Log.error(error)
    }
  }

  // Fetch data for all actors/movies listed and return a dictionary with actorData objects
  // It's an expensive operation so the data is cached for future use
  async getActorsMovies(actors = this.#defaultActors) {
    if (!Array.isArray(actors)) return

    // Check if already stored
    let actorDict = this.#retrieveJSON(Model.#KEY_ACTORS)
    // No Set in json so it is stored as an Array
    const movieArray = this.#retrieveJSON(Model.#KEY_MOVIES)
    let movieSet = new Set()
    if (
      actorDict &&
      Array.isArray(actorDict) &&
      actorDict.length === actors.length &&
      movieArray &&
      Array.isArray(movieArray) &&
      movieArray.length > actors.length
    ) {
      Log.info('Using actors/movies from local storage')
      movieArray.map(movieSet.add, movieSet)
    } else {
      Log.info('Fetch actors/movies from API')
      movieSet = new Set()
      // Fetch actors and wait for it to finish
      actorDict = await Promise.all(
        actors.map(async (name) => {
          const actor = await this.getActor(name)
          actor.movies.forEach(movieSet.add, movieSet)
          return actor
        }),
      )
      // Store the data locally
      this.#storeJSON(Model.#KEY_ACTORS, actorDict)
      // No Set in json so it is stored as an Array
      this.#storeJSON(Model.#KEY_MOVIES, [...movieSet])
      return actorDict
    }
    // Shuffle the actors
    return actorDict.sort(() => Math.random() - 0.5)
  }

  // Fetch movie credits to get a Set of the actorID's
  // https://api.themoviedb.org/3/movie/58574/credits?api_key=78a1d3e2544e40274c06d998f502fcda&language=en-US
  async getActorsInMovie(movieID) {
    const query = `${Model.MDB}/3/movie/${movieID}/credits?api_key=${Model.API_KEY}&language=en-US`
    try {
      const response = await fetch(query)
      const data = await response.json()
      const casts = data.cast
      if (Array.isArray(casts) && casts.length > 0) {
        return new Set(casts.map((cast) => cast.id))
      } else throw new Error('Casting Data Error')
    } catch (error) {
      Log.error(error)
    }
  }

  // A list of common actors to pick from
  #defaultActors = [
    'Denzel Washington',
    'Marilyn Monroe',
    'Robert De Niro',
    'Cate Blanchett',
    'Christian Bale',
    'Penélope Cruz',
    'Kate Winslet',
    'Anthony Hopkins',
    'Meryl Streep',
    'Jack Nicholson',
    'Leonardo DiCaprio',
    'Tom Cruise',
    'Heath Ledger',
    'Tom Hanks',
    'Al Pacino',
    'Morgan Freeman',
    'Nicole Kidman',
    'Timothée Chalamet',
    'Ryan Reynolds',
    'Daniel Craig',
    'Ana de Armas',
    'Emma Myers',
    'Matt Damon',
    'Sigourney Weaver',
    'Jake Gyllenhaal',
    'Chris Pratt',
    'Anne Hathaway',
    'Chris Hemsworth',
    'Scarlett Johansson',
    'Colin Farrell',
    'Julia Roberts',
    'Chris Pine',
    'Angela Bassett',
    'Jude Law',
  ]
}
