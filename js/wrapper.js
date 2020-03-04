const mainFrame = document.getElementById('mainFrame');
const titleHeader = document.getElementById('titleHeader');
const backButton = document.getElementById('backButton');
const topButton = document.getElementById('topButton');
const resetButton = document.getElementById('resetButton');
const mainBlock = document.getElementById('mainBlock');

window.timeStamp = [0, 0, 0];

window.startLoading = (ms = 1000) => {
  mainBlock.classList.add('loading');
  window.stopLoading(ms);
}

window.stopLoading = (ms = 0) => {
  setTimeout(() => mainBlock.classList.remove('loading'), ms);
}

mainFrame.addEventListener('load', e => {
  const ifrm = mainFrame.contentWindow;
  titleHeader.textContent = ifrm.document.title;
  const script = document.createElement('script');
  script.src = '/js/mod.js';
  ifrm.document.body.appendChild(script);
  ifrm.addEventListener('beforeunload', () => {
    window.startLoading(1000);
  }, false);
}, false);

backButton.addEventListener('click', () => {
  mainFrame.contentWindow.history.back();
}, false);

topButton.addEventListener('click', () => {
  mainFrame.src = "/aukaraokecp";
}, false);

resetButton.addEventListener('click', () => {
  if (confirm('')) location.reload();
}, false);