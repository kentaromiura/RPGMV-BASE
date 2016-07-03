var uniqueId = require('./uniqueId')
var uniqueIdProperty = '\uD83C\uDF55'

function identity(object){
	return object.hasOwnProperty(uniqueIdProperty) ? object[uniqueIdProperty] : (Object.defineProperty(
		object,
		uniqueIdProperty,
		{
			enumerable: false,
			configurable: false,
			writable: false,
			value: uniqueId()
		}
	)[uniqueIdProperty])
}

module.exports = identity