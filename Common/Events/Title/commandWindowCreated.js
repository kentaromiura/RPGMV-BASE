var dispatchWhenDone = require('../../dispatchWhenDone')
module.exports = () => {
  return dispatchWhenDone(Scene_Title.prototype, 'createCommandWindow', 'commandWindowCreated')
}
