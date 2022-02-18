<script>
  import { createEventDispatcher } from "svelte";
  import MeetupItem from "./MeetupItem.svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import MeetupToolbar from './MeetupToolbar.svelte'
  import Button from "../UI/Button.svelte";

  const dispatch = createEventDispatcher();
  export let meetups;
  let favsOnly = false

  function filterMeetups(event) {
    favsOnly = event.detail === 1;
  }

  $: filteredMeetups = favsOnly ? meetups.filter(item => item.isFavorite) : meetups;

</script>

<style>

.no-data {
  margin: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
}
  .box{
    height: 10rem;
    width: 10rem;
    margin: 1rem;
    border: 1px solid #ccc;
    padding: 1rem;
    background-color: #ccc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }
 #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<div id="meetup-controls">
  <MeetupToolbar on:filter-items={filterMeetups} on:add/>
  <Button on:click={() => {dispatch('add')}}>New Meetup</Button>
</div>

<section id="meetups">
  {#if filteredMeetups.length > 0}
    {#each filteredMeetups as meetup (meetup.id)}
    <div transition:scale animate:flip={{duration:300}}>
      <MeetupItem 
        id={meetup.id}
        title={meetup.title}
        subtitle={meetup.subtitle}
        description={meetup.description}
        imageUrl={meetup.imageUrl}
        email={meetup.contactEmail}
        address={meetup.address}
        isFav={meetup.isFavorite}
        on:show-detail
        on:edit
        on:error/>
    </div>
    {/each}
  {:else}
     <p class="no-data">No data available.</p>
  {/if}
  
</section>
