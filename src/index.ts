const { BrowserWindow, systemPreferences } = require('electron');

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
module.exports = ({
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

  const string = JSON.stringify({
    brand,
    productName,
    logo,
    website,
    color: col,
    text
  });
  splashScreen.loadURL(`${url}#${Buffer.from(string).toString('base64')}`);
  splashScreen.show();
  splashScreen.setAlwaysOnTop(true);
  splashScreen.setAlwaysOnTop(false);
  return () => {
    setTimeout(() => splashScreen.destroy(), 500);
    mainWindow.show();
  };
};
