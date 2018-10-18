import { BrowserWindow, systemPreferences, ipcMain } from 'electron';
export { default as reportReady } from './report-ready';
export { default as Office } from './templates/office';
export { default as Dolphin } from './templates/dolphin';
export { default as Simple } from './templates/simple';

export interface Props {
  mainWindow: any;
  color?: any;
  icon?: any;
  width?: number;
  height?: number;
  url?: any;
  image?: any;
  brand?: any;
  productName?: any;
  logo?: any;
  website?: any;
  text?: any;
}
export default ({
  mainWindow,
  color,
  icon,
  width = 600,
  height = 400,
  url,
  image,
  brand,
  productName,
  logo,
  website,
  text
}: Props) => {
  const col =
    color ||
    (systemPreferences.getAccentColor &&
      `#${systemPreferences.getAccentColor()}`);
  global['splashScreenImage'] = image || icon;

  const splashScreen = new BrowserWindow({
    width,
    height,
    center: true,
    modal: true,
    skipTaskbar: true,
    frame: false,
    icon
  });

  const args = {
    brand: brand,
    productName: productName,
    logo: logo,
    website: website,
    color: col,
    text: text
  };
  if (typeof url === 'function') {
    var file = 'data:text/html;charset=UTF-8,' + encodeURIComponent(url(args));
    splashScreen.loadURL(file);
  } else {
    splashScreen.loadURL(
      url + '#' + Buffer.from(JSON.stringify(args)).toString()
    );
  }
  splashScreen.show();
  splashScreen.setAlwaysOnTop(true);
  splashScreen.setAlwaysOnTop(false);
  const hide = () => {
    setTimeout(() => splashScreen.destroy(), 500);
    mainWindow.show();
  };
  ipcMain.on('ready', hide);
  return hide;
};
