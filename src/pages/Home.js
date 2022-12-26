import { Grid } from '@lightningjs/ui'
import ActorCell from '../components/ActorCell'
import Page from '../Page.js'
import Model from '../models/model'

export default class Home extends Page {
  static _template() {
    return {
      Content: {
        ...super._template(),
        Grid: {
          x: 90,
          y: 200,
          w: 1740,
          h: 850,
          rows: 1,
          spacing: 48,
          itemType: ActorCell,
          type: Grid,
        },
        Text: {
          mount: 0.5,
          x: 960,
          y: 120,
          text: {
            text: 'Select Your Favorite Actor',
            fontSize: 56,
            textColor: 0xfbddddff,
            textAlign: 'center',
          },
        },
      },
    }
  }

  _setup() {
    const model = new Model()
    model.getActorsMovies().then((allActors) => {
      const actors = allActors.map((actor) => {
        return { h: 632, w: 421, actor: actor }
      })
      this.tag('Grid').add(actors)
    })
  }

  _getFocused() {
    return this.tag('Grid')
  }

  pageTransition() {
    return 'up'
  }
}
