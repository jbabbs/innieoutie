import { app, Menu } from 'electron';

const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';

export function setMenu() {
  const template: any = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Workspace',
          click() {
            app.quit();
          }
        },
        {
          label: 'Load Workspace',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' }, // just adds a line visually
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Github',
          click () { require('electron').shell.openExternal('https://github.com/Contagious-Solutions/innieoutie') }
        }
      ]
    }
  ];

  if (isMac) {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

