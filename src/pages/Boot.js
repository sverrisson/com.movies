import { Router, Utils } from '@lightningjs/sdk'
import Page from '../Page'

export default class Boot extends Page {
  static _template() {
    return {
      Content: {
        ...super._template(),
        Logo: {
          mountX: 0.5,
          mountY: 1,
          x: 220,
          y: 600,
          src: Utils.asset('images/logo.png'),
        },
        Logo2: {
          mountX: 0.5,
          mountY: 1,
          x: 1920 - 220,
          y: 600,
          src: Utils.asset('images/logo.png'),
        },
        Text: {
          mount: 0.5,
          x: 960,
          y: 320,
          text: {
            text: 'Welcome to the Movie Game',
            fontFace: 'Regular',
            fontSize: 80,
            textColor: 0xfbddddff,
            textAlign: 'center',
          },
        },
        TextHelp: {
          mount: 0.5,
          x: 960,
          y: 580,
          text: {
            text: `Set your Browser to 1920 x 1080, TV–format.

If you Refresh, the Game Restarts!

Use the Arrow Keys to Navigate within Pages
and Return to Select, or the TV–Remote.`,
            fontFace: 'Regular',
            fontSize: 48,
            textColor: 0xfbddddff,
            textAlign: 'center',
          },
        },
        TextDescription: {
          mount: 0.5,
          x: 960,
          y: 900,
          text: {
            text: 'Press Enter to Start Playing!',
            fontFace: 'Regular',
            fontSize: 48,
            textColor: 0xfbddddff,
            textAlign: 'center',
          },
        },
      },
    }
  }

  _active() {
    this.tag('Score').patch({ visible: false })
  }

  _inactive() {
    this.tag('Score').patch({ visible: true })
  }

  _handleEnter() {
    Router.navigate('home')
  }
}
