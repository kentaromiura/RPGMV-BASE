var getCurrentFileName = require('./getCurrentFileName')

module.exports = () => {
  return PluginManager.parameters(getCurrentFileName())
}