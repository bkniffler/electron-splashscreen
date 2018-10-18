const isRenderer = () => {
  // running in a web browser
  if (typeof process === 'undefined') return false;

  // node-integration is disabled
  if (!process) return false;

  // We're in node.js somehow
  if (!process['type']) return false;

  return process['type'] === 'renderer';
};

let ipc: any = null;

if (isRenderer()) {
  ipc = window['require']('electron').ipcRenderer;
}

export default () => ipc && ipc.send('ready');
