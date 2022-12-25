import { Lightning, Router } from '@lightningjs/sdk'

export default class NotFound extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      color: 0xff402662,
      Header: {
        mount: 0.5,
        x: 960,
        y: 540,
        text: {
          text: 'Page not found',
          fontSize: 128,
        },
      },
      Arrows: {
        Enter: {
          mountX: 0.5,
          x: 960,
          y: 980,
          text: { text: 'press [Back] to go to the previous page', fontFace: 'Regular' },
        },
      },
    }
  }

  _handleUp() {
    Router.navigate('$')
  }
}
