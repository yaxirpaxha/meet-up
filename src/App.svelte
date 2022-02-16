<script>
  import meetups from './Stores/meetup-store.js'
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from './Meetups/MeetupDetail.svelte'

  let page = 'overview';
  let editMode;
  let meetupdata = {};

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
      <EditMeetup on:save={meetupSaved} 
      on:cancel={cancelEdit}
      {editMode} 
      id={meetupdata.id}/>
    {/if}
    <MeetupGrid meetups={$meetups} 
    on:show-detail={showDetails}
    on:edit={editMeetup}
    on:add={openAddMeetupDialog}/>
  {:else if page === 'meetup-detail'}
    <MeetupDetail id={meetupdata.id} on:close={closeDetail}/>
  {/if}

  
</main>
