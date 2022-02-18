
<script context="module">
  export function preload(page) {
    return meetupServer.getMeetups(this).then(response => {
      const meetupsArray = [];
      for (const key in response) {
          meetupsArray.push({
              ...response[key],
              id: key
          });
      }
      return {fetchedMeetups:  meetupsArray.reverse() };
      
    }).catch(ex => {
        this.error(500, ex);
    });

  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { meetupServer } from "../API/meet-up";
  import meetups from '../Stores/meetup-store'
  import MeetupItem from "../components/Meetups/MeetupItem.svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import MeetupToolbar from '../components/Meetups/MeetupToolbar.svelte'
  import Button from "../components/UI/Button.svelte";
  import EditMeetup from "../components/Meetups/EditMeetup.svelte";
  import LoadingSpinner from '../components/UI/LoadingSpinner.svelte';
  import Alert from '../components/UI/Alert.svelte'

  export let fetchedMeetups;
  let loadedMeetups = [];
  let favsOnly = false
  let editMode;
  let meetupdata = {};
  let isLoading = false;
  let showAlert = false;
  let errorMessage = '';
  let unsubscribe;


  onMount(() => {
    unsubscribe = meetups.subscribe(items => {
      loadedMeetups = items;
    });
    meetups.set(fetchedMeetups);
  });

  onDestroy(() =>{
    if(unsubscribe) {
      unsubscribe();
    }
  });

  function filterMeetups(event) {
    favsOnly = event.detail === 1;
  }

  $: filteredMeetups = favsOnly ? loadedMeetups.filter(item => item.isFavorite) : loadedMeetups;

  function openAddMeetupDialog() {
    editMode = 'add';
    meetupdata = {};
  }

  function meetupSaved() {
    editMode = null;
  }

  function cancelEdit() {
    editMode = null;
    meetupdata = {};
  }

  function editMeetup(event) {
    editMode = 'edit';
    meetupdata.id = event.detail;
  } 

  function errorClose() {
    showAlert = false;
  }

  function showError(event) {
    errorMessage = event.detail;
    showAlert = true;
  }

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

<svelte:head>
	<title>Meetups</title>
</svelte:head>


{#if editMode}
<EditMeetup
  on:save={meetupSaved} 
  on:cancel={cancelEdit}
  {editMode} 
  id={meetupdata.id}
  on:error={showError}/>
{/if}
{#if isLoading}
  <LoadingSpinner/>
{:else}

<div id="meetup-controls">
  <MeetupToolbar on:filter-items={filterMeetups} on:add/>
  <Button on:click={openAddMeetupDialog}>New Meetup</Button>
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
        on:edit={editMeetup}
        on:error/>
    </div>
    {/each}
  {:else}
     <p class="no-data">No data available.</p>
  {/if}
  
</section>
{/if}

{#if showAlert}
<Alert on:close={errorClose} message="{errorMessage}"/>
{/if}
