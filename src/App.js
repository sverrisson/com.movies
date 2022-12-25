import { Lightning, Utils } from '@lightningjs/sdk'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Background: {
        w: window.innerWidth, // 1920
        color: 0xfffbb03b, // 1080
        src: Utils.asset('images/background.png'),
        zIndex: -100,
      },
    }
  }

  _init() {
    this.tag('Background')
      .animation({
        duration: 3,
        repeat: -1,
        actions: [
          {
            t: '',
            p: 'color',
            v: { 0: { v: 0xfffbb03b }, 0.5: { v: 0xfff487ff }, 0.8: { v: 0xfffbb03b } },
          },
        ],
      })
      .start()
  }
}
