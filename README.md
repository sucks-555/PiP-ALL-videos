<h1>PiP-ALL-videos</h1>
<p>This code will only work if the video tag is present on the website. Once activated, it will work with shift + a key. Shift + R Toggles Picture-in-Picture mode on and off.</p>
<p>このコードは、ウェブサイト上にvideoタグが存在する場合にのみ機能します。一度有効にすると、shift + aキーで動作します。shift + rキー Picture-in-Picture モードを有効または無効に切り替えます。
</p>

```js
const video = document.querySelector('video');
let permit = true;

if (video) {
  function togglePictureInPicture() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      video.requestPictureInPicture();
    }
    if (video.hasAttribute('disablePictureInPicture')) {
      video.removeAttribute('disablePictureInPicture');
    }
  }
  function input(event) {
    if (event.key === "A" && permit) {
      togglePictureInPicture();
    } else if (event.key === "R") {
      permit = !permit;
    }
  }
  window.addEventListener('keydown', input);
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('keydown', input);
  });
}
```
