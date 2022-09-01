<script lang="ts">
    import { browser } from "$app/env";
    import { fly, fade } from 'svelte/transition';
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    var custom = false
    export let isvisble = false, opentext = "", headline = opentext, callback=()=>{return}
    let text = ""
    
    if(isvisble==true){open(browser)}

    function pushedkey(event = "",elem: HTMLBodyElement|null|undefined){
        if(event == "Escape"){
            close()
        }else if(event == "Enter"){
            close()
        }
        elem.removeEventListener("keydown", ()=>pushedkey(event, elem));
    }
    function close(){
        isvisble = false
        callback()
    }
    function open(browser=false){
        isvisble = true
        if(browser && isvisble){
            let elem = document.querySelector('body')
            elem.addEventListener("keydown", ()=>pushedkey(event.key, elem) );
        }
    }
</script>

<div on:click={open}>{opentext}</div>
{#if isvisble==true}  
<div class="background" transition:fade on:click={()=>close(callback)}/>
<div class="middle-box" transition:fly={{y: -500}}>
            { text }
            <slot />
</div>
{/if}
<style>
    .background {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }
    .middle-box {
        font-weight: normal;
        font-style: normal;
        font-size: 18px;
        text-decoration: none;
        overflow: scroll;

        padding-top: 30px;
        padding-bottom: 30px;
        padding-right: 20px;
        padding-left: 20px;
       
        z-index: 11;
        background-color: rgba(255, 255, 255, 255);
        min-height: 20vh;
        max-height: 70vh;
        width: 600px;
        color: black;
        position: fixed;
        top: 50vh;
        left: 50%;
        margin: -320px 0 0 -320px;
    }
</style>