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
