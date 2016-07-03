/*:
 * @plugindesc Add a Close game option.
 * @author Cristian Carlesso <kentaromiura>
 * @param quitOption
 * @desc Text to show in the main menu
 * @default Quit
 */
'use strict'
const getParameters = require('../../Common/getParameters'),
    slice = require('../../Common/slice'),
    parameters = getParameters(),
    quitOption = parameters.quitOption || 'Quit'

require('../../Common/Events/Title/commandWindowCreated')()
global.addEventListener('commandWindowCreated', (event) => {
  const win = event.detail.context
  win._commandWindow.setHandler('Exit', () => {
    global.close()
  })
})

require('../../Common/Events/Title/commandListMade')()
global.addEventListener('commandListMade', (event) => {
  const menu = event.detail.context
  menu.addCommand(quitOption, 'Exit')
})
