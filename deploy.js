const clint = require('clint')(),
  glob = require('glob'),
  fs = require('fs'),
  wrapup = require('wrapup'),
  config = require('./config.json'),
  babel = require('babel-core'),
  es2015Preset = require('babel-preset-es2015')

let output
let debug = false

clint.command('--path', '-p', 'path to the project folder')
clint.command('--debug', '-d', 'deploy in debug mode')

clint.on('command', function(name, value) {
  switch (name) {
    case '--path':
      output = value
      break
    case '--debug':
      debug = true
      break
  }
})

clint.on('complete', function() {
  const REQUIRE_NW_HACK = '__REQUIRE_NW_GUI__',
    REQUIRE_NW = "require('nw.gui')"

  if (!output) {
    console.log('No path passed, run with -p ProjectPath')
  } else {
    glob.sync('./Plugins/**/*js').forEach(function(path) {
      var to = path
        .replace('./Plugins/', config.namespace + '_')
        .replace('/', '_')
      var source = '' + fs.readFileSync(path)

      var wrap = new wrapup({
        compress: !debug,
        transforms: [
          {
            src: function(module, callback) {
              module.src = babel.transform(module.src, {
                filename: to,
                presets: [es2015Preset],
                retainLines: true,
              }).code
              module.src = module.src.replace(REQUIRE_NW, REQUIRE_NW_HACK)
              callback(null, module)
            },
          },
        ],
      })
      wrap.require(path)
      wrap.up(function(error, result) {
        result =
          'var __REQUIRE_NW_GUI__ = require("nw.gui");' +
          (debug ? '__REQUIRE_NW_GUI__.Window.get().showDevTools();' : '') +
          result
        var comment = source.slice(0, source.indexOf('*/'))
        if (config.license) {
          comment = comment + '* ' + config.license + '\n */\n'
        }
        fs.writeFileSync(output + '/js/plugins/' + to, comment + result)
      })
    })
  }
})

clint.parse(process.argv.slice(2))
