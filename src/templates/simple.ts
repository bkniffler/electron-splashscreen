
export default () => `
<!DOCTYPE html>
<meta charset="utf-8">
<html>

<head></head>

<body>
  <center>
    <img id="image" src="../splash.png" width="200" height="200"></img>
  </center>
  <center>
    <span id="status"></span>
  </center>
  <script>
    // Listen for data from browser process and update splashscreen
    var remote = require("electron").remote;
    var ipcRenderer = require("electron").ipcRenderer;
    ipcRenderer.on("update", function (event, status) {
      document.getElementById("status").innerText = status;
    })
    const accentColor = remote.getGlobal('splashScreenColor');
    document.body.style.backgroundColor = '#' + accentColor;
    document.getElementById("image").src = remote.getGlobal('splashScreenImage');

  </script>
</body>

</html>
`;