<script>
  import { createEventDispatcher } from "svelte";
  import { meetupServer } from "../API/meet-up";
  import meetups from '../Stores/meetup-store.js'
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from '../UI/LoadingSpinner.svelte'


  const dispatch = createEventDispatcher();

  export let id;
  export let title;
  export let subtitle;
  export let imageUrl;
  export let description;
  export let address;
  export let email;
  export let isFav;
  let isLoading = false;

  function togglefavorite() {
    isLoading = true;
    meetupServer.updateMeetup(id, {isFavorite: !isFav}).then(() => {
      meetups.toggleFavorite(id);
      isLoading = false;
    }).catch(ex => {
      isLoading = false;
      dispatch('error', ex);
    });
  }

  function deleteMeetup() {
    meetupServer.rmeoveMeetup(id).then(response => {
      meetups.deleteMeetup(id);
    }).catch(ex => {
      dispatch('error', ex);
    });
    
  }
</script>

<style>
  .cross-button {
    color: red;
    margin-top: -1.5rem;
    cursor: pointer;
    position: relative;
  }
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>

<article>
  {#if isLoading}
     <LoadingSpinner />
  {/if}
  <header>
    <h1>
      {title}
      {#if isFav}
        <Badge>FAVORITE</Badge>
      {/if}
      <div class="cross-button" >
        <span on:click="{deleteMeetup}">X</span>
      </div>
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
  <div class="image">
    <img src={imageUrl} alt={title} />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button type="button" on:click={() => { dispatch('edit', id) }}>Edit</Button>
    <Button
      mode="outline"
      color={isFav ? null : 'success'}
      type="button"
      on:click={togglefavorite}>
      {isFav ? 'Unfavorite' : 'Favorite'}
    </Button>
    <Button type="button" on:click={() => { dispatch('show-detail', id) }}>Show Details</Button>
  </footer>
</article>
