'use strict'

const Utils = global.Utils || (global.Utils = {})
let id = 0

export default Utils.uniqueId ||
  (Utils.uniqueId = () => {
    return (id++).toString(36)
  })
