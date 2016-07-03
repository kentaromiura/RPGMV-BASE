var slice = require('./slice')
var identity = require('./identity')
var kenta = global._kenta || (global._kenta = {})
var patched = kenta.patchedMethods || (kenta.patchedMethods = {})

module.exports = function dispatchWhenDone(object, method, event){
  var unique = identity(object)
  var patchedId = unique + ':' + event
  
  if (patched[patchedId]) return object[method]
  patched[patchedId] = true
  
  var fn = object[method]
  object[method] = function(){
    var args = slice(arguments)
    var result = fn.apply(this, args)

    global.dispatchEvent(new CustomEvent(event, {'detail': {
      args: args,
      result: result,
      context: this
    }}))

    return result
  }
  return object[method]
}
