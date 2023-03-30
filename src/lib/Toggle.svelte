<script>
  // @ts-nocheck

  let volumePercentage = "0%";
  let volumeInterval = null;

  import { isOpen, audio, percentage, percentageCap } from "./../store.js";

  Notification.requestPermission();

  /**
   * Called if volume intensity is superior or equal to a cap
   */
  function punishment() {
    $isOpen = true;
    try {
      let notification = new Notification("Stay QUIET!!!");
    } catch (err) {
      navigator.vibrate(10000);
    }
  }

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
    audio.set({ volumes, analyser });
  }

  /**
   * interval callback that gets live audio and renders canvas
   * @param audio
   */
  function volumeCallback() {
    $audio.analyser.getByteFrequencyData($audio.volumes);
    let volumeSum = 0;
    let screamCounter = 0;
    for (const volume of $audio.volumes) {
      volumeSum += volume;
    }
    const averageVolume = volumeSum / $audio.volumes.length;
    // Value range: 127 = analyser.maxDecibels - analyser.minDecibels;
    volumePercentage = ((averageVolume * 100) / 127) * 0.73;
    percentage.set(volumePercentage);
    if (volumePercentage >= $percentageCap && !$isOpen) {
      punishment();
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
      await init();
      volumeInterval = setInterval(volumeCallback, 100);
    }
  }
</script>

<div class="volume__button">
  <label class="t">
    <input
      class="t__checkbox"
      type="checkbox"
      on:click={handleListening}
      value="on"
    />
    <svg
      class="t__svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="t__svg-ring"
        cx="12"
        cy="12"
        r="6"
        fill="none"
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="0 5 27.7 5"
        stroke-dashoffset="0.01"
        transform="rotate(-90,12,12)"
      />
      <line
        class="t__svg-line"
        x1="12"
        y1="6"
        x2="12"
        y2="15"
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="9 9"
        stroke-dashoffset="3"
      />
      <line
        class="t__svg-line"
        x1="12"
        y1="6"
        x2="12"
        y2="12"
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="6 6"
        stroke-dashoffset="6"
      />
    </svg>
    <span class="t__sr">Power</span>
  </label>
</div>

<style>
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
