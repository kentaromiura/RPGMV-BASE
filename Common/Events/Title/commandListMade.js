var dispatchWhenDone = require('../../dispatchWhenDone')
module.exports = () => {
  return dispatchWhenDone(Window_TitleCommand.prototype, 'makeCommandList', 'commandListMade')
}
