const BASE_URL = `<INSERT_BASE_URL_HERE>`;
export const meetupServer = {
    addMeetup: (meetupdata) => {
        return fetch(`${BASE_URL}/meetups.json`, {
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
        return fetch(`${BASE_URL}/meetups/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(meetupdata),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if(!response.ok) {
                throw new Error('Something went wrong, meetup cannot be saved.');
            }
        });
    },
    getMeetups: (ref) => {
        return ref.fetch(`${BASE_URL}/meetups.json`).then(response => {
            if(!response.ok) {
                throw new Error('Something went wrog, metups could not be fetched');
            } else {
                return response.json();
            }
        });
    },
    getMeetupDetail: (id, ref) => {
        return ref.fetch(`${BASE_URL}/meetups/${id}.json`).then(response => {
            if(!response.ok) {
                throw new Error('Something went wrog, metups could not be fetched');
            } else {
                return response.json();
            }
        });
    },
    rmeoveMeetup: (id) => {
        return fetch(`${BASE_URL}/meetups/${id}.json`, {
            method: 'DELETE'
        });
    }
};