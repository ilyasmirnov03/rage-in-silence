<script>
    // @ts-nocheck
    export let percentageCap = 0;

    function changeDifficulty (cap) {
        percentageCap = cap;
    }

</script>
<p class="difficulty__desc">Please choose a difficulty depending on the type of player you are</p>
<div class="difficulty__container">
    <div class="difficulty__wrapper"><input type='radio' name='difficulty' value='peaceful' checked on:click={()=> changeDifficulty(70)}><label for='peaceful'>Peaceful</label></div>
    <div class="difficulty__wrapper"><input type='radio' name='difficulty' value='easy' on:click={() => changeDifficulty(60)}><label for='easy'>Easy</label></div>    
    <div class="difficulty__wrapper"><input type='radio' name='difficulty' value='normal' on:click={() => changeDifficulty(50)}><label for='normal'>Normal</label></div>
    <div class="difficulty__wrapper"><input type='radio' name='difficulty' value='hardcore' on:click={() => changeDifficulty(30)}><label for='hardcore'>Hardcore</label></div>
    <div class="slider_color"></div>
</div>

<style>
    .difficulty__desc{
        font-size: 5vw;
        margin: auto;
        width: 85vw;
        text-align: center;
        margin-top: 5vw;
        background:var(--rage-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .difficulty__container {
        display:flex;
        width: 85vw;
        margin: auto;
    }
    .difficulty__wrapper {
        display:flex;
        width:25%;
        height: 20vw;
        flex-direction: column-reverse;
    }
    .difficulty__container input{
        opacity: 60%;
        width: 100%;
        height: 100%;
        appearance: none;
        background-color: #515151;
    }
    .difficulty__container input[value='peaceful']{
        border-radius: 5vw 0 0 5vw;
        
    }
    .difficulty__container input[value='hardcore']{
        border-radius: 0 5vw 5vw 0;
    }
    .difficulty__container input+label{
        opacity: 60%;
        font-size: 5vw;
        transform: translate(0,200%);
        text-align: center;
        pointer-events: none;
    }
    .difficulty__container input:checked[value='peaceful']{
        background-color: hsl(var(--onHue), 94%, 59%);
        
    }
    .difficulty__container input:checked[value='easy']{
        background-color: hsl(68, 94%, 59%);
    }
    .difficulty__container input:checked[value='normal']{
        background-color: hsl(25, 94%, 59%);
    }
    .difficulty__container input:checked[value='hardcore']{
        background-color: hsl(var(--offHue), 94%, 59%);
     
    }
    .difficulty__container input:checked+label{
        opacity: 100%;
    }
    .difficulty__container input:checked{
        opacity: 100%;
    }
</style>