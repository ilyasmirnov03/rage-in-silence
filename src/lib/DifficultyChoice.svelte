<script>
    // @ts-nocheck
    export let percentageCap = 0;

    function changeDifficulty (cap) {
        percentageCap = cap;
    }
</script>

<div class="difficulty__container">
    <input type='radio' name='difficulty' value='peaceful' checked on:click={()=> changeDifficulty(70)}><label for='peaceful'>Peaceful</label>
    <input type='radio' name='difficulty' value='easy' on:click={() => changeDifficulty(60)}><label for='easy'>Easy</label>
    <input type='radio' name='difficulty' value='normal' on:click={() => changeDifficulty(50)}><label for='normal'>Normal</label>
    <input type='radio' name='difficulty' value='hardcore' on:click={() => changeDifficulty(30)}><label for='hardcore'>Hardcore</label>
</div>

<style>
    .difficulty__container {
        display:flex;
        width: 85%;
    }
    .difficulty__container input{
        opacity: 60%;
        width:25%
    }
    .difficulty__container input+label{
        opacity: 60%;
        transform: translate(0, -50%);
        font-size: 1.5rem;
    }
    .difficulty__container input:checked+label{
        opacity: 100%;
    }
    .difficulty__container input:checked{
        opacity: 100%;
    }
</style>