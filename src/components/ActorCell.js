import { Lightning, Colors } from '@lightningjs/sdk'
import Model from '../models/model'

export default class ActorCell extends Lightning.Component {
  static _template() {
    return {
      Shadow: {
        alpha: 0,
        mount: 0.5,
        x: (w) => w / 2,
        y: (h) => h / 2,
        w: (w) => w + 32,
        h: (h) => h + 32,
        color: Colors('shadow').get(),
        rect: true,
        shader: { type: Lightning.shaders.FadeOut, fade: 32 },
      },
      ImageWrapper: {
        w: (w) => w,
        h: (h) => h,
        rtt: true,
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 4 },
        Image: {
          alpha: 0.0001,
          mount: 0.5,
          y: (w) => w / 2,
          x: (h) => h / 2,
        },
      },
      Focus: {
        alpha: 0,
        x: 4,
        y: 4,
        w: (w) => w - 8,
        h: (h) => h - 8,
        rect: true,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 8,
          stroke: 5,
          strokeColor: 0xffffffff,
          blend: 1,
          fillColor: 0x00ffffff,
        },
      },
      Label: {
        mountX: 0.5,
        mountY: 1,
        x: (w) => w / 2,
        y: (h) => h + 50,
        color: Colors('white').darker(0.3).get(),
        text: { text: '', fontSize: 30 },
      },
    }
  }

  _init() {
    const name = this.actor.name
    this.tag('Label').patch({ text: name })
    const profile_path = Model.imageUrl(this.actor.profile_path)
    this.tag('Image').patch({ src: profile_path })
    const image = this.tag('Image')
    image.on('txLoaded', () => {
      image.setSmooth('alpha', 1)
    })

    this._focusAnimation = this.animation({
      duration: 0.2,
      actions: [
        { p: 'scale', v: { 0: 1, 1: 1.075 } },
        { t: 'Shadow', p: 'alpha', v: { 0: 0, 1: 1 } },
        { t: 'Label', p: 'scale', v: { 0: 1, 1: 1.1 } },
        {
          t: 'Label',
          p: 'color',
          v: {
            0: Colors('white').darker(0.3).get(),
            1: Colors('magenta').get(),
          },
        },
        { t: 'Focus', p: 'alpha', v: { 0: 0, 1: 1 } },
      ],
    })
  }

  _update() {
    this.patch({
      ImageWrapper: {
        Image: {
          h: this.h * 0.98,
          w: this.w * 0.97,
        },
      },
      Focus: {
        color: Colors('magenta').darker(0.3).get(),
      },
    })
  }

  _firstActive() {
    this._update()
  }

  _focus() {
    if (this._focusAnimation) {
      this._focusAnimation.start()
    }
  }

  _unfocus() {
    this._focusAnimation.stop()
  }

  _handleEnter() {
    this.fireAncestors('$actorSelected', this.actor)
  }
}
