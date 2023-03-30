<script>
    // @ts-nocheck

    import { percentageCap } from "./../store.js";

    function changeDifficulty (cap) {
        percentageCap.set(cap);
    }
</script>

<div class="difficulty__container">
    <button on:click={() => changeDifficulty(70)}>Easy</button>
    <button on:click={() => changeDifficulty(60)}>Medium</button>
    <button on:click={() => changeDifficulty(50)}>Hard</button>
    <button on:click={() => changeDifficulty(30)}>Insane</button>
</div>

<style>
    .difficulty__container {
        display:flex;
    }
</style>