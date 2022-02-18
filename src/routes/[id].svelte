
<script context="module">
  export function preload(page) {
    const meetupId = page.params.id;
    return meetupServer.getMeetupDetail(meetupId, this).then(response => {
      return {meetup: response };
    }).catch(ex => {
        this.error(500, ex);
    });
  }
</script>
<script>
  import Button from '../components/UI/Button.svelte';
  import { meetupServer } from "../API/meet-up";

  export let meetup;
</script>


<style>
    section {
  margin-top: 4rem;
}

.image {
  width: 100%;
  height: 25rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image {
  background: #e7e7e7;
}

.content {
  text-align: center;
  width: 80%;
  margin: auto;
}

h1 {
  font-size: 2rem;
  font-family: 'Roboto Slab', sans-serif;
  margin: 0.5rem 0;
}

h2 {
  font-size: 1.25rem;
  color: #6b6b6b;
}

p {
  font-size: 1.5rem;
}

</style>


<svelte:head>
	<title>Meetups::Detail</title>
</svelte:head>

<section>
    <div class="image">
        <img src="{meetup.imageUrl}" alt="{meetup.imageUrl}">
    </div>
    <div class="content">
        <h1>{meetup.title}</h1>
        <h2>{meetup.subtitle}</h2>
        <p>{meetup.description}</p>
        <Button href="mailto:{meetup.contactEmail}">Contact</Button>
        <Button href="/">Close</Button>
    </div>
</section>