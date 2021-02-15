const { AudioContext } = require('three');

var isUnlocked = false;
function unlock() {
  if (this.unlocked) return;
  const myContext = AudioContext.getContext();
  // create empty buffer and play it
  var buffer = myContext.createBuffer(1, 1, 22050);
  var source = myContext.createBufferSource();
  source.buffer = buffer;
  source.connect(myContext.destination);
  source.noteOn(0);

  // by checking the play state after some time, we know if we're really unlocked
  setTimeout(function () {
    if (
      source.playbackState === source.PLAYING_STATE ||
      source.playbackState === source.FINISHED_STATE
    ) {
      isUnlocked = true;
    }
  }, 0);
}

module.exports = { isUnlocked, unlock };
