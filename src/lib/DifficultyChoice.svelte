<script>
    // @ts-nocheck
    export let percentageCap = 0;
    let style = {
        hsl: `119, 94%, 59%`,
        left: '0%',
        borderRadius: '5vw 0 0 5vw'
    }
    function changeDifficulty (cap, hue, order) {
        percentageCap = cap;
        style = {
            hsl: `${hue}, 94%, 59%`,
            left: order+ '%',
            borderRadius: ''
        }
        if (order == 0){
            style.borderRadius = '5vw 0 0 5vw';
        } else if (order == 75) {
            style.borderRadius = '0 5vw 5vw 0';
        }
    }

</script>
<p class="difficulty__desc">Please choose a difficulty depending on the type of player you are</p>
<div class="difficulty__container">
    <div class="difficulty__wrapper"><input type='radio' name='difficulty' value='peaceful' checked on:click={()=> changeDifficulty(70,119,0)}><label for='peaceful'>Peaceful</label></div>
    <div class="difficulty__wrapper"><input type='radio' name='difficulty' value='easy' on:click={() => changeDifficulty(60, 68, 25)}><label for='easy'>Easy</label></div>    
    <div class="difficulty__wrapper"><input type='radio' name='difficulty' value='normal' on:click={() => changeDifficulty(50, 25, 50)}><label for='normal'>Normal</label></div>
    <div class="difficulty__wrapper"><input type='radio' name='difficulty' value='hardcore' on:click={() => changeDifficulty(30, 0, 75)}><label for='hardcore'>Hardcore</label></div>
    <div class="slider__color" style={`background-color:hsl(${style.hsl}); left:${style.left}; border-radius:${style.borderRadius}`}></div>
</div>

<style>
    .difficulty__desc{
        font-size: 10vw;
        margin: auto;
        width: 85vw;
        text-align: center;
        margin-top: 5vw;
        background:var(--rage-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .slider__color{
        width:25%;
        height: 12vw;
        bottom:0;
        z-index: -1;
        transition: all ease-in 100ms;
        position: absolute;
    }
    .difficulty__container {
        display:flex;
        width: 85vw;
        margin: auto;
        position: relative;
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
        margin: 0;
        padding: 0;
    }
    .difficulty__container input[value='peaceful']{
        border-radius: 5vw 0 0 5vw;
        
    }
    .difficulty__container input[value='hardcore']{
        border-radius: 0 5vw 5vw 0;
    }
    .difficulty__container input+label{
        transition: all ease-in 150ms;
        letter-spacing: 0.5vw;
        opacity: 60%;
        font-size: 8vw;
        transform: translate(0,125%);
        text-align: center;
        pointer-events: none;
    }
    .difficulty__container input:checked+label{
        opacity: 100%;
        letter-spacing: 0vw;
    }
    .difficulty__container input:checked{
        opacity: 0%;
    }
</style>