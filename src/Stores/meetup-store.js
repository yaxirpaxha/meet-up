import { writable } from "svelte/store";

const store = writable([
    {
      id: Math.random().toString(),
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to code!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "code@test.com",
      isFavorite: false
    },
    {
      id: Math.random().toString(),
      title: "Swim Together",
      subtitle: "Let's go for some swimming",
      description: "We will simply swim some rounds!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "swim@test.com",
      isFavorite: false
    }
  ]);

const meetupStore = {
    subscribe: store.subscribe,
    addMeetup: (meetupData) => {
        store.update(items => {
            return [{
                ...meetupData,
                id: Math.random().toString(),
                imageUrl: `https://picsum.photos/200/300?random=${Math.random().toString()}`,
                isFavorite: false
            }, ...items];
        });
    },
    toggleFavorite: (id) => {
        store.update(items => {
            const updatedMeetup = { ...items.find(m => m.id === id) };
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupIndex = items.findIndex(m => m.id === id);
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups; 
        });
    },
    updateMeetup: (id, meetupData) => {
      store.update(items => {
        const meetupIndex = items.findIndex(item => item.id === id);
        const updatedMeetup = {...items[meetupIndex], ...meetupData};
        items[meetupIndex] = updatedMeetup;
        return items;
      });
    },
    deleteMeetup: (id) => {
      store.update(items => {
        return items.filter(item => item.id !== id);
      });
    }
};

export default meetupStore;