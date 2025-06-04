/**
 * Create expanding ring on audioanalyser beat.
 */
AFRAME.registerComponent('ring-on-beat2', {
  schema: {
    analyserEl: {type: 'selector'}
  },

  init: function () {
    var analyserEl = this.data.analyserEl || this.el;
    var el = this.el;
    var rings = this.rings = [];
    var ringcolor = this.el.material;

    analyserEl.addEventListener('audioanalyser-beat', function () {
      var ringEl = document.createElement('a-cube');
              // console.log('[ringonbeat] beat seen.');
      ringEl.setAttribute('material','shader','hologram');
      ringEl.setAttribute('position', '0 0 0');
      ringEl.setAttribute('rotation', '0 0 0');
      el.appendChild(ringEl);

      ringEl.addEventListener('loaded', function () {
        rings.push(ringEl);
        setTimeout(function () {
          el.removeChild(ringEl);
          rings.splice(rings.indexOf(ringEl), 1);
        }, 2000);
      });
    });
  },

  /**
   * Expand ring radii.
   */
  tick: function () {
    this.rings.forEach(function (ringEl) {
      var scale = ringEl.getAttribute('scale');
      ringEl.setAttribute('scale', {
        x: scale.x * 1.06 + .05,
        y: scale.y * 1.06 + .05,
        z: scale.z
      });
    });
  }
});