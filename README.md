<h1>PiP-ALL-videos</h1>
<p>This code will only function if there is a video tag present on the website. Once activated, a button will appear in the upper left corner of the screen. Left-click the button for picture-in-picture mode, and right-click for the menu. Please note that the menu contains hidden items. You can utilize this code either as a Chrome extension or within the console.</p>
<p>このコードは、ウェブサイトにビデオタグが存在する場合にのみ動作します。アクティベートすると、画面の左上隅にボタンが表示されます。ボタンを左クリックすると、ピクチャインピクチャが表示され、右クリックするとメニューが表示されます。このコードはChrome拡張機能またはコンソールで使用できます。</p>

```js
const video = document.querySelector("video");
if (video) {
  const body = document.querySelector('body');
  const button = document.createElement('button');
  let isDragging = false;
  let isLongPressing = false;
  let offsetX, offsetY;
  let longPressTimeout;
  let customContextMenu = null;

  button.innerHTML = 'Picture';
  button.style.cssText = `background:rgba(255,255,255,.2);border:none;color:#000;position:absolute;z-index:99999;width:55px;height:33px;border-radius:7px;top:10px;left:5px;cursor:pointer;`;
  body.appendChild(button);

  button.addEventListener("mousedown", handleMouseDown);
  button.addEventListener("mouseup", handleMouseUp);
  button.addEventListener("mousemove", handleMouseMove);
  button.addEventListener("touchstart", handleTouchStart);
  button.addEventListener("touchend", handleTouchEnd);
  button.addEventListener('click', () => togglePictureInPicture(video));
  button.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (!customContextMenu) {
      customContextMenu = document.createElement('ul');
      customContextMenu.innerHTML = '<li><button id="hide_btn"><h2>非表示</h2></button></li>';
      customContextMenu.style.cssText = `position:absolute;z-index:999999;border-radius:5px;width:auto;height:auto;list-style:none;`;
      body.appendChild(customContextMenu);
      const hide_btn = document.getElementById('hide_btn');
      if (hide_btn) {
        hide_btn.addEventListener('click', () => hideButton());
      }
    }
    const x = e.clientX;
    const y = e.clientY;
    customContextMenu.style.left = `${x}px`;
    customContextMenu.style.top = `${y}px`;

    customContextMenu.style.display = 'block';
    customContextMenu.addEventListener('click', () => {
      customContextMenu.style.display = 'none';
    });
  });
  document.addEventListener('click', () => {
    if (customContextMenu) {
      customContextMenu.style.display = 'none';
    }
  });
  if (video.hasAttribute('disablePictureInPicture')) {
    video.removeAttribute('disablePictureInPicture');
  }
  function togglePictureInPicture(video) {
    if (document.pictureInPictureEnabled) {
      if (!document.pictureInPictureElement) {
        video.requestPictureInPicture()
      } else {
        document.exitPictureInPicture()
      }
    }
  }
  function handleMouseDown(e) {
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - button.getBoundingClientRect().left;
    offsetY = e.clientY - button.getBoundingClientRect().top;
    startLongPressTimer();
  }
  function handleMouseUp() {
    isDragging = false;
    stopLongPressTimer();
  }
  function handleMouseMove(e) {
    if (isDragging) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      button.style.left = `${x}px`;
      button.style.top = `${y}px`;
    }
  }
  function handleTouchStart(e) {
    e.preventDefault();
    isDragging = true;
    offsetX = e.touches[0].clientX - button.getBoundingClientRect().left;
    offsetY = e.touches[0].clientY - button.getBoundingClientRect().top;
    startLongPressTimer();
  }
  function handleTouchEnd() {
    isDragging = false;
    stopLongPressTimer();
  }
  function startLongPressTimer() {
    isLongPressing = false;
    longPressTimeout = setTimeout(() => {
      isLongPressing = true;
    }, 1000);
  }
  function stopLongPressTimer() {
    clearTimeout(longPressTimeout);
  }
  function hideButton() {
    button.style.display = 'none';
  }
}
```
