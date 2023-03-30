<script>
  // @ts-nocheck

  import { audio, percentage } from "./../store.js";
  import { onMount } from "svelte";

  let canvas;
  let context;
  let circleRadius = 75;
  let canvasWidth = 300;
  let canvasHeight = 300;

  onMount(() => {
    context = canvas.getContext("2d");
    context.translate(canvasWidth / 2, canvasHeight / 2);
    context.strokeStyle = "#fff";
    context.fillStyle = "#fff";
    context.lineWidth = 2;
    drawCircle(context);
  });

  function drawCircle(context) {
    context.beginPath();
    context.arc(0, 0, circleRadius + 1, 0, 2 * Math.PI);
    context.fill();
  }

  function hslToHex(percentage, s, l) {
    const hue = 120 - percentage * 1.2;
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + hue / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  $: $audio,
    (() => {
      if (context && $audio.volumes) {
        let bars = 45;
        context.clearRect(-200, -200, 500, 500);
        context.fillStyle = hslToHex($percentage, 100, 50);
        drawCircle(context);
        for (let i = 0; i < 90; i += 90 / bars) {
          let barHeight = $audio.volumes[i + 4] / 4;
          let barWidth = (2 * Math.PI * circleRadius) / bars;
          context.rotate((Math.PI * 2) / bars);
          context.fillRect(circleRadius, barWidth / 2, barHeight, barWidth);
        }
      }
    })();
</script>

<canvas bind:this={canvas} width={canvasWidth} height={canvasHeight} />
