<script>
  // @ts-nocheck
  import { onMount } from "svelte";

  let volumePercentage = "0%";
  let volumeInterval = null;
  //canvas global variables
  let canvas;
  let context;
  let circleRadius = 75;
  let canvasWidth = 300;
  let canvasHeight = 300;

  function drawCircle(context) {
    context.beginPath();
    context.arc(0, 0, circleRadius + 1, 0, 2 * Math.PI);
    context.fill();
  }

  onMount(() => {
    context = canvas.getContext('2d');
    context.translate(canvasWidth / 2, canvasHeight / 2);
    context.strokeStyle = "#fff";
    context.fillStyle = "#fff";
    context.lineWidth = 2;
    drawCircle(context);
  });

  /**
   * initializes audio device used
   * @return Object{Uint8Array volumes, AnalyserNode analyser}
   */
  async function init() {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
        },
      });
      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaStreamSource(audioStream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.minDecibels = -127;
      analyser.maxDecibels = 0;
      analyser.smoothingTimeConstant = 0.4;
      audioSource.connect(analyser);
      const volumes = new Uint8Array(analyser.frequencyBinCount);
      return {volumes, analyser};
    };
    
    /**
     * interval callback that gets live audio and renders canvas
     * @param audio
     */
    function volumeCallback(audio) {
      audio.analyser.getByteFrequencyData(audio.volumes);
      let volumeSum = 0;
      let screamCounter = 0;
      for (const volume of audio.volumes) {
        volumeSum += volume;
      }
      const averageVolume = volumeSum / audio.volumes.length;
      // Value range: 127 = analyser.maxDecibels - analyser.minDecibels;
      volumePercentage = (averageVolume * 100) / 127 * 0.73;
      volumeColor = (1 - volumePercentage / 100) * 96;
      //canvas rendering
      let bars = 90;
      context.clearRect(-200, -200, 500, 500);
      drawCircle(context);
      for (let i = 0; i < 180; i+= (180/bars)) {
        let barHeight = audio.volumes[i] / 2;
        let barWidth = 2 * Math.PI * circleRadius / bars;
        context.rotate((Math.PI * 2) / bars);
        context.fillRect(circleRadius, barWidth / 2, barHeight, barWidth);
      }
    }

    /**
     * On/off button handler
     */
    async function handleListening() {
      if (volumeInterval !== null) {
        clearInterval(volumeInterval);
        volumeInterval = null;
      } else if (volumeInterval === null) {
        let audio = await init();
        volumeInterval = setInterval(volumeCallback, 100, audio);
      }
    }
</script>

<div class="volume__container">
  <canvas class="volume__equalizer" bind:this={canvas} width="{canvasWidth}" height="{canvasHeight}"></canvas>
</div>
<div class="volume__button">
  <label class="t">
    <input class="t__checkbox" type="checkbox" on:click={handleListening} value="on">
    <svg class="t__svg" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle class="t__svg-ring" cx="12" cy="12" r="6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-dasharray="0 5 27.7 5" stroke-dashoffset="0.01" transform="rotate(-90,12,12)"/>
      <line class="t__svg-line" x1="12" y1="6" x2="12" y2="15" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-dasharray="9 9" stroke-dashoffset="3"/>
      <line class="t__svg-line" x1="12" y1="6" x2="12" y2="12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 6" stroke-dashoffset="6"/>
    </svg>
    <span class="t__sr">Power</span>
  </label>
</div>


<style>
  .volume__container {
    display:flex;
    justify-content: center;
    padding:1rem 0;
  }

  .volume__button {
    display: flex;
    justify-content: center;
    font: 1em/1.5 sans-serif;
  }

  .volume__button * {
    border: 0;
    margin: 0;
    padding: 0;
  }
</style>
