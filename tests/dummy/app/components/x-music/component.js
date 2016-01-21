import Ember from 'ember';
import { process, sleep } from 'ember-concurrency';

export default Ember.Component.extend({
  playMusic: process(function * () {
    let i = 0;
    while(i++ < 6) {
      this.set('value', i);
      yield sleep(150);
    }

    let AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) {
      console.error("AudioContext not detected... perhaps web audio api not supported?");
      return;
    }

    let context, beepOscillator;

    try {
      context = new AudioContext();
      beepOscillator = context.createOscillator();
      beepOscillator.frequency.value = 300;

      let beepGain = context.createGain();
      beepGain.gain.value = 0;

      beepOscillator.connect(beepGain);
      beepOscillator.type = 'triangle';
      beepGain.connect(context.destination);

      beepOscillator.start(0);

      let bps = this.get('bpm') / 60.0;
      let halfTimeout = 1 / bps / 2 * 1000;

      // sleep randomly so that multiple x-musics don't annoying start at the same time.
      yield sleep(Math.random() * 1000);

      for (;;) {
        // main
        beepOscillator.frequency.value = 100 + Math.random() * 600;
        beepGain.gain.setTargetAtTime(0.5, context.currentTime, 0.01);
        this.set('isPlaying', true);
        yield sleep(halfTimeout);

        beepGain.gain.setTargetAtTime(0, context.currentTime, 0.01);
        this.set('isPlaying', false);
        yield sleep(halfTimeout);
      }
    } finally {
      beepOscillator.stop();
    }
  }).autoStart(),

  isPlaying: false,
});

