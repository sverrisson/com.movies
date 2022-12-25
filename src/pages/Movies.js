import { Grid } from '@lightningjs/ui'
import MovieCell from '../components/MovieCell'
import Page from '../Page.js'

export default class Movies extends Page {
  static _template() {
    return {
      Content: {
        ...super._template(),
        Grid: {
          mountX: 0.5,
          x: 1920 / 2,
          y: 200,
          w: 420 * 3 + 2 * 64,
          h: 750,
          rows: 1,
          spacing: 64,
          itemType: MovieCell,
          type: Grid,
        },
        Text: {
          mount: 0.5,
          x: 960,
          y: 120,
          text: {
            text: '',
            fontSize: 56,
            textColor: 0xfbddddff,
          },
        },
      },
    }
  }

  set params(args) {
    if (args && args.actor && args.movies) {
      this.tag('Text').patch({ text: `${args.actor.name} Acted in Which Movie?` })
      const gridMovies = args.movies.map((movie) => {
        return { h: 632, w: 421, movie: movie }
      })
      this.tag('Grid').add(gridMovies)
    }
  }

  _getFocused() {
    return this.tag('Grid')
  }

  pageTransition() {
    return 'up'
  }
}
