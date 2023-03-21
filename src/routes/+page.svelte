<script>
  // @ts-nocheck

  let volumePercentage = "0%";
  let volumeInterval = null;

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
    console.log(volumePercentage > 80);
  }

  async function startListening() {
    if (volumeInterval === null) {
      let audio = await init();
      volumeInterval = setInterval(volumeCallback, 100, audio);
    }
  }

  function stopListening() {
    if (volumeInterval !== null) {
      clearInterval(volumeInterval);
      volumeInterval = null;
    }
  }
</script>

<div class="volume__container">
  <div class="volume__visualizer" style="width:{volumePercentage + "%"}; background-color:hsl({(1 - volumePercentage / 100) * 160}, 100%, 50%)" />
</div>
<button on:click={startListening} disabled="{volumeInterval}" class="volume__start">Start</button>
<button on:click={stopListening} disabled="{!volumeInterval}" class="volume__stop">Stop</button>

<style>
  .volume__container {
    width:300px;
    height:20px;
    background-color: #ddd;
    position: relative;
  }
  
  .volume__visualizer {
    position:absolute;
    top:0;
    left:0;
    z-index:1;
    height: 20px;
  }
</style>
