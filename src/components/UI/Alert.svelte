
<script>
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let message = '';
</script>
<style>
.alert {
  padding: 1rem;
  margin: 1rem;
  background-color: red;
  color: white;  
  border-radius: 5px;
  position: fixed;
  right: 0%;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}
</style>

<div class="alert" transition:fly={{x: 300}}>
    <span class="closebtn" on:click={() => { dispatch('close') }}>&times;</span> 
    <strong>Attention!</strong> {message}
  </div>