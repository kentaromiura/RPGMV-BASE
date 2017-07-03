import identity from './identity'
const kenta = global._kenta || (global._kenta = {}),
  patched = kenta.patchedMethods || (kenta.patchedMethods = {})

export default function dispatchWhenDone(object, method, event) {
  const unique = identity.get(object),
    patchedId = unique + ':' + event

  if (patched[patchedId]) {
    return object[method]
  }
  patched[patchedId] = true

  const fn = object[method]
  object[method] = function(...args) {
    const result = fn.apply(this, args)

    global.dispatchEvent(
      new CustomEvent(event, {
        detail: {
          args,
          result,
          context: this,
        },
      })
    )

    return result
  }
  return object[method]
}
