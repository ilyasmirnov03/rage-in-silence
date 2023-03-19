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
    for (const volume of audio.volumes) volumeSum += volume;
    const averageVolume = volumeSum / audio.volumes.length;
    // Value range: 127 = analyser.maxDecibels - analyser.minDecibels;
    volumePercentage = (averageVolume * 100) / 127 + "%";
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

<div id="volume-visualizer" style="width:{volumePercentage}" />
<button on:click={startListening} id="start">Start</button>
<button on:click={stopListening} id="stop">Stop</button>

<style>
  #volume-visualizer {
    --volume: 0%;
    position: relative;
    width: 200px;
    height: 20px;
    margin: 50px;
    background-color: #ddd;
  }

  #volume-visualizer::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: var(--volume);
    background-color: green;
    transition: all 30ms ease-in-out;
  }

  button {
    margin-left: 50px;
  }
</style>
