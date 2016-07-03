'use strict';
var id = 0;
const Utils = global.Utils || (global.Utils = {});
module.exports = Utils.uniqueId || (Utils.uniqueId = () => {
	return (id++).toString(36)
})
