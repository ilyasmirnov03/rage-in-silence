<script>
  // @ts-nocheck

  import Canvas from "./../lib/Canvas.svelte";

  let volumePercentage = "0%";
  let volumeInterval = null;
  let volumeColor = 0;
  //canvas global variables
  let canvas;

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
    
    function volumeCallback(audio) {
      audio.analyser.getByteFrequencyData(audio.volumes);
      let volumeSum = 0;
      let screamCounter = 0;
      for (const volume of audio.volumes) volumeSum += volume;
      const averageVolume = volumeSum / audio.volumes.length;
      // Value range: 127 = analyser.maxDecibels - analyser.minDecibels;
      volumePercentage = (averageVolume * 100) / 127 * 0.73;
      volumeColor = (1 - volumePercentage / 100) * 96;
      //canvas rendering
      let bar_count = window.innerWidth / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#ffffff";

      for (let i = 0; i < bar_count; i++) {
        bar_pos = i * 4;
        bar_width = 2;
        bar_height = -(audio.volumes[i] / 2);
          
        context.fillRect(bar_pos, height, bar_width, bar_height);
      }
    }

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
  <div class="volume__visualizer" style="background-color:hsl({volumeColor}, 83%, 50%)" />
</div>
<div class="volume__buttons">
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

<Canvas bind:canvas = {canvas}></Canvas>

<style>
  .volume__container {
    display:flex;
    justify-content: center;
    padding:1rem 0;
  }

  .volume__buttons {
    display: flex;
    justify-content: center;
    font: 1em/1.5 sans-serif;
  }

  .volume__buttons * {
    border: 0;
    margin: 0;
    padding: 0;
  }

  .volume__visualizer {
    width:calc(3rem + 2vw); 
    height:calc(3rem + 2vw);
    background-color: #ddd;
    border-radius: 50%;
    position: relative;
  }
</style>
