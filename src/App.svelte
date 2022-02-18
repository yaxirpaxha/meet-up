<script>
  import meetups from './Stores/meetup-store.js'
  import { meetupServer } from "./API/meet-up";
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from './Meetups/MeetupDetail.svelte';
  import LoadingSpinner from './UI/LoadingSpinner.svelte';
  import Alert from './UI/Alert.svelte'

  let page = 'overview';
  let editMode;
  let meetupdata = {};
  let isLoading = true;
  let showAlert = false;
  let errorMessage = '';

  meetupServer.getMeetups().then(response => {
    const meetupsArray = [];
    for (const key in response) {
        meetupsArray.push({
            ...response[key],
            id: key
        });
    }
    meetups.set(meetupsArray.reverse());
    isLoading = false;
    
  }).catch(ex => {
      isLoading = false;
      showError({detail: ex});
  });

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

  function showDetails(event) {
    page = 'meetup-detail';
    meetupdata.id = event.detail;
  }

  function closeDetail() {
    page = 'overview';
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
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>

  {#if page === 'overview'}
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
    <MeetupGrid meetups={$meetups} 
    on:show-detail={showDetails}
    on:edit={editMeetup}
    on:add={openAddMeetupDialog}
    on:error={showError}/>
    {/if}
  {:else if page === 'meetup-detail'}
    <MeetupDetail id={meetupdata.id} on:close={closeDetail}/>
  {/if}

  {#if showAlert}
  <Alert on:close={errorClose} message="{errorMessage}"/>
  {/if}
  
</main>
