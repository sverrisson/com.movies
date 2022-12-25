import { Lightning, Utils, Colors } from '@lightningjs/sdk'

export default class Page extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      Content: {},
      FadeTop: {
        w: 1920,
        h: 230,
        rect: true,
        colorTop: Colors('white').alpha(0.7).get(),
        colorBottom: 0x00000000,
      },
      Header: {
        x: 90,
        y: 100,
        color: Colors('white').get(),
        text: { text: this.header, fontSize: 50 },
      },
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
      },
      Score: {
        mount: 0.5,
        x: 960,
        y: 1080 - 80,
        text: {
          text: '',
          fontSize: 54,
          textColor: 0xfbffddff,
          textAlign: 'center',
        },
      },
    }
  }

  _init() {
    // this.tag('Background')
    //   .animation({
    //     duration: 2,
    //     repeat: -1,
    //     actions: [
    //       {
    //         t: '',
    //         p: 'color',
    //         v: { 0: { v: 0xfffbb03b }, 0.5: { v: 0xfff46730 }, 0.8: { v: 0xffcbc0cb } },
    //       },
    //     ],
    //   })
    //   .start()

    const score = this.fireAncestors('$getScore')
    if (score) {
      this.tag('Score').patch({
        text: {
          text: `Score: ${score}`,
        },
      })
    }
  }

  _focus() {
    this.setSmooth('alpha', 1)
  }

  _unfocus() {
    this.setSmooth('alpha', 0)
  }
}
