import { writable } from "svelte/store";

const store = writable([]);

const meetupStore = {
    subscribe: store.subscribe,
    set: store.set,
    addMeetup: (meetupData) => {
      store.update(items => {
          return [meetupData, ...items];
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