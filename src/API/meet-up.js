
export const meetupServer = {
    addMeetup: (meetupdata) => {
        return fetch('https://meet-up-4ebeb-default-rtdb.firebaseio.com/meetups.json', {
            method: 'POST',
            body: JSON.stringify(meetupdata),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if(!response.ok) {
                throw new Error('Something went wrong, meetup cannot be saved.');
            }
            else {
                return response.json();
            }
        });
    },
    updateMeetup: (id, meetupdata) => {
        return fetch(`https://meet-up-4ebeb-default-rtdb.firebaseio.com/meetups/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(meetupdata),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if(!response.ok) {
                throw new Error('Something went wrong, meetup cannot be saved.');
            }
        });
    },
    getMeetups: () => {
        return fetch('https://meet-up-4ebeb-default-rtdb.firebaseio.com/meetups.json').then(response => {
            if(!response.ok) {
                throw new Error('Something went wrog, metups could not be fetched');
            } else {
                return response.json();
            }
        });
    },
    rmeoveMeetup: (id) => {
        return fetch(`https://meet-up-4ebeb-default-rtdb.firebaseio.com/meetups/${id}.json`, {
            method: 'DELETE'
        });
    }
};