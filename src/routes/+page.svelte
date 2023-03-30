<script>
  // @ts-nocheck
  
  import DifficultyChoice from "$lib/DifficultyChoice.svelte";
  import Canvas from "$lib/Canvas.svelte";
  import Popup from "$lib/Popup.svelte";
  import Toggle from "$lib/Toggle.svelte";
</script>

<DifficultyChoice></DifficultyChoice>
<div class="volume__container">
  <Canvas></Canvas>
</div>
<Toggle></Toggle>
<Popup>
	<p class="popup__text">Can you stay quiet???</p>
</Popup>

<style>
  .volume__container {
    display:flex;
    justify-content: center;
    padding:1rem 0;
  }

  .popup__text {
    color:white;
    margin-bottom:.5rem;
  }
</style>
