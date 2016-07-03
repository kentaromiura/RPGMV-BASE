var clint = require('clint')()
var glob = require('glob')
var fs = require('fs')
var wrapup = require('wrapup')
var config = require('./config.json')

const babel = require('babel-core');
const es2015Preset = require('babel-preset-es2015');

clint.command('--path', '-p', 'path to the project folder')
var output
clint.on('command', function(name, value) {
	switch(name){
		case '--path':
			output = value
			break
	}
})

clint.on('complete', function(){
	var REQUIRE_NW_HACK = '__REQUIRE_NW_GUI__'
	var REQUIRE_NW = 'require(\'nw.gui\')'
	if (!output){
		console.log('No path passed, run with -p ProjectPath')
	} else {
		glob.sync("./Plugins/**/*js").forEach(function(path){
			var to = path.replace('./Plugins/', config.namespace + '_').replace('/','_')
			var source = ''+ fs.readFileSync(path)
			
			var wrap = new wrapup({
				compress: true,
				transforms: [{
					src: function(module, callback){
						module.src = babel.transform(module.src, {
							filename: to,
							presets: [es2015Preset],
							retainLines: true,
						}).code
						module.src = module.src.replace(REQUIRE_NW, REQUIRE_NW_HACK)
						callback(null, module)
					}
				}]
			})
			wrap.require(path)
			wrap.up(function(error, result){
				result = result.replace(REQUIRE_NW_HACK, REQUIRE_NW)
				var comment = source.slice(0, source.indexOf('*/'))
				if (config.license) {
					comment = comment + '* '+ config.license +'\n */\n'	
				}				
				fs.writeFileSync(output + '/js/plugins/' + to, comment + result)	
			})
		})		
	}
})

clint.parse(process.argv.slice(2))
