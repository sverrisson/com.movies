import { Router } from '@lightningjs/sdk'
import Page from '../Page'

export default class Error extends Page {
  static _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      color: 0xfff1465b,
      Error: {
        mountX: 0.5,
        x: 960,
        y: 220,
        text: { text: '', textAlign: 'center' },
      },
    }
  }

  _handleEnter() {
    Router.navigate('$')
  }

  _handleBack() {
    Router.navigate('$')
  }

  set params(args) {
    const { request } = args
    this.error = request
  }

  set error(obj) {
    if (!obj.page) {
      this.tag('Error').text = obj.error
    } else {
      const { page, error, hash, route } = obj
      const errorMessage = `error while loading page: ${page.constructor.name}
--
loaded via hash: ${hash}
resulted in route: ${route.path}
--
${error.toString()}`

      this.tag('Error').text = errorMessage
    }
  }

  pageTransition() {
    return 'fade'
  }
}
