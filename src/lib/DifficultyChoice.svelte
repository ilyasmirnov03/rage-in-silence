<script>
    // @ts-nocheck
    export let percentageCap = 0;

    function changeDifficulty (cap) {
        percentageCap = cap;
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