let allTravelers;
let singleTraveler;
let allTrips;
let allDestinations;

// GET calls

function getAllTravelers() {
  return fetch('http://localhost:3001/api/v1/travelers')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw Promise.reject(error);
    })
    .then((data) => {
      allTravelers = data;
      return allTravelers;
    })
    .catch((error) => {
      console.log('Error fetching all travelers', error);
    });
};

function getSingleTraveler(id) {
  fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw Promise.reject(error);
    })
    .then(data => {
      singleTraveler = data;
      return singleTraveler;
    })
    .catch((error) => {
      console.log('Error while fetching single traveler', error);
    });
};

function getAllTrips() {
  fetch('http://localhost:3001/api/v1/trips')
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw Promise.reject(error);
    })
    .then(data => {
      allTrips = data;
      return allTrips;
    })
    .catch(error => {
      console.log('Error while fetching all trips', error);
    });
};

function getAllDestinations() {
  fetch('http://localhost:3001/api/v1/destinations')
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Promise.reject(error)
    })
    .then(data => {
      allDestinations = data;
      return allDestinations;
    })
    .catch(error => {
      console.log('Error while fetching all destinations', error)
    });
};

export default { getAllTravelers, getSingleTraveler, getAllTrips, getAllDestinations };