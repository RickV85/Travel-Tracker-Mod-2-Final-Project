let allTravelers;
let singleTraveler;
let allTrips;
let allDestinations;

// GET calls

function getAllTravelers() {
  return fetch('http://localhost:3001/api/v1/travelers')
    .then((response) => {
      if (response.ok) {
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
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw Promise.reject(error);
    })
    .then((data) => {
      singleTraveler = data;
      return singleTraveler;
    })
    .catch((error) => {
      console.log('Error while fetching single traveler', error);
    });
};

function getAllTrips() {
  return fetch('http://localhost:3001/api/v1/trips')
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw Promise.reject(error);
    })
    .then((data) => {
      allTrips = data;
      return allTrips;
    })
    .catch((error) => {
      console.log('Error while fetching all trips', error);
    });
};

function getAllDestinations() {
  return fetch('http://localhost:3001/api/v1/destinations')
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Promise.reject(error)
    })
    .then((data) => {
      allDestinations = data;
      return allDestinations;
    })
    .catch((error) => {
      console.log('Error while fetching all destinations', error)
    });
};

function postTripRequest(data) {
  let promise = fetch(`http://localhost:3001/api/v1/trips`, {
    method: postTripRequest,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Trip request failed to post")
    }
    return response.json();
  })
  return promise;
};

export default { getAllTravelers, getSingleTraveler, getAllTrips, getAllDestinations, postTripRequest };