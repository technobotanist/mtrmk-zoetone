function playtracksInit(event) {
  // Get up-to-date audio elements from event.detail (preferred) or window globals (fallback)
  let audios = (event && event.detail && event.detail.audios) ? event.detail.audios : [
    window.audio1, window.audio2, window.audio3, window.audio4, window.audio5, window.audio6
  ];
  // Only include audios for currently rendered channels (visible spheres)
  let count = (event && event.detail && typeof event.detail.count === 'number') ? event.detail.count : audios.filter(Boolean).length;
  let activeAudios = audios.slice(0, count);
  AFRAME.registerComponent('playtracks', {
    init: function () {
      let playing = false;
      var el = this.el;
      el.addEventListener('click', (ee) => {
        console.log(ee);
        activeAudios.forEach(audio => {
          if (!audio) return;
          if (!playing) {
            audio.play && audio.play();
          } else {
            audio.pause && audio.pause();
          }
        });
        playing = !playing;
      });
    }
  });
}

// Listen for the custom event and (re)register the component with the latest audio elements
window.addEventListener('audioElementsReady', playtracksInit);
  

