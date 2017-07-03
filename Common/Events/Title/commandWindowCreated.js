import dispatchWhenDone from '../../dispatchWhenDone'

export default {
  listen(callback) {
    const patched = dispatchWhenDone(
      Scene_Title.prototype,
      'createCommandWindow',
      'commandWindowCreated'
    )
    if (callback) {
      global.addEventListener('commandWindowCreated', callback)
    }
    return patched
  },
}
