<script>
  import meetups from '../Stores/meetup-store.js'
  import { createEventDispatcher, tick } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isNotEmpty, isValidEmail } from "../helpers/validation";

  const dispatch = createEventDispatcher();

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let description = "";
  export let editMode = null;
  export let id = null;

  $: fetchDetails(id);
  $: titleValid = isNotEmpty(title);
  $: addressValid = isNotEmpty(address);
  $: emailValid = isValidEmail(email);
  $: formValid = titleValid && addressValid && emailValid;
  
  

  function fetchDetails(id) {
    if(id) {
        const unsubscribe = meetups.subscribe(items => {
          const selectedMeetup = items.find(item => item.id === id);
          title = selectedMeetup.title;
          subtitle = selectedMeetup.subtitle;
          email = selectedMeetup.contactEmail;
          address = selectedMeetup.address;
          description = selectedMeetup.description;
      });
      unsubscribe();
    }    
  }

  function submitForm() {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      contactEmail: email,
      address: address
    };
    if(id) {
      meetups.updateMeetup(id ,meetupData);
    } else {
      meetups.addMeetup(meetupData);
    }
    
    dispatch("save");
  }

  function cancel() {
      dispatch('cancel');
  }
</script>

<style>
  form {
    width: 100%;
  }

  .information {
    color: rgb(216, 175, 99);
  }
</style>

<Modal title="{editMode === 'add' ? 'Add Meetup' : 'Edit Meetup'}" on:cancel>

  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title*"
      valid={titleValid}
      errorMessage="Please enter a title."
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address*"
      valid={addressValid}
      errorMessage="Please enter an address."
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="email"
      label="E-Mail*"
      valid={emailValid}
      errorMessage="Please enter a valid contact email."
      type="email"
      value={email}
      on:input={event => (email = event.target.value)} />
    <TextInput
      id="description"
      label="Description"
      controlType="textarea"
      bind:value={description}/>
      <p class="information">* fields are required</p>
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formValid}>Save</Button>
  </div>
</Modal>
