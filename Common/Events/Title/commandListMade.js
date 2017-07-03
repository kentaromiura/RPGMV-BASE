import dispatchWhenDone from '../../dispatchWhenDone'

export default {
  listen(callback) {
    const patched = dispatchWhenDone(
      Window_TitleCommand.prototype,
      'makeCommandList',
      'commandListMade'
    )
    if (callback) {
      global.addEventListener('commandListMade', callback)
    }
    return patched
  },
}
