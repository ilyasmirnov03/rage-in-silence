<script>
  // @ts-nocheck
  
  import DifficultyChoice from "$lib/DifficultyChoice.svelte";
  import Canvas from "$lib/Canvas.svelte";
  import Popup from "$lib/Popup.svelte";
  import Toggle from "$lib/Toggle.svelte";
</script>

<h1 class="title">Please, rage in<br><div class="title--styling">SILENCE</div></h1>
<DifficultyChoice></DifficultyChoice>
<div class="volume__container">
  <Canvas></Canvas>
</div>
<Toggle></Toggle>
<Popup>
	<p class="popup__text">Can you stay quiet???</p>
</Popup>

<style>
  .title{
    background:var(--rage-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 15vw;
    text-align: center;
    margin-top: 5vw;
    letter-spacing: 1.5vw;
  }
  
  .title--styling{
    letter-spacing: 7vw;
    background:var(--rage-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    font-weight: 800;
    font-size: 20vw;
    transform: translate(0, -59%);
  }
  
  .volume__container {
    display:flex;
    justify-content: center;
  }

  .popup__text {
    color:white;
    margin-bottom:.5rem;
  }
</style>