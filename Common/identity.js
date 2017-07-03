import uniqueId from './uniqueId'

const uniqueIdProperty = '\uD83C\uDF55'

export default {
  get(object) {
    return object.hasOwnProperty(uniqueIdProperty)
      ? object[uniqueIdProperty]
      : Object.defineProperty(object, uniqueIdProperty, {
          enumerable: false,
          configurable: false,
          writable: false,
          value: uniqueId(),
        })[uniqueIdProperty]
  },
}
