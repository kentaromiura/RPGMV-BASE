/*:
 * @plugindesc Add a Close game option.
 * @author Cristian Carlesso <kentaromiura>
 * @param quitOption
 * @desc Text to show in the main menu
 * @default Quit
 */
'use strict'

import getParameters from '../../Common/getParameters'
import slice from '../../Common/slice'
import commandWindowCreated from '../../Common/Events/Title/commandWindowCreated'
import commandListMade from '../../Common/Events/Title/commandListMade'

const parameters = getParameters(),
  quitOption = parameters.quitOption || 'Quit'

commandWindowCreated.listen(event => {
  const win = event.detail.context
  win._commandWindow.setHandler('Exit', () => {
    global.close()
  })
})

commandListMade.listen(event => {
  const menu = event.detail.context
  menu.addCommand(quitOption, 'Exit')
})
