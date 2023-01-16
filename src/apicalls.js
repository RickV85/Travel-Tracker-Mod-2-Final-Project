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
    // .catch((error) => {
    //   alert('Error while fetching all travelers. Please try reloading the page.', error);
    // });
};

function getSingleTraveler(id) {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Promise.reject(error);
    })
    .then((data) => {
      singleTraveler = data;
      return singleTraveler;
    })
    // .catch((error) => {
    //   alert('Error while fetching traveler information. Please try reloading the page.', error);
    // });
};

function getAllTrips() {
  return fetch('http://localhost:3001/api/v1/trips')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Promise.reject(error);
    })
    .then((data) => {
      allTrips = data;
      return allTrips;
    })
    // .catch((error) => {
    //   alert('Error while fetching trips. Please try reloading the page.', error);
    // });
};

function getAllDestinations() {
  return fetch('http://localhost:3001/api/v1/destinations')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Promise.reject(error)
    })
    .then((data) => {
      allDestinations = data;
      return allDestinations;
    })
    // .catch((error) => {
    //   alert('Error while fetching destinations. Please try reloading the page.', error)
    // });
};

// Post request

function postTripRequest(postData) {
  return fetch(`http://localhost:3001/api/v1/trips`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: { "Content-Type": "application/json" }
  })
  .then(response => {
    if (response.ok) {
      
      return response.json();
    }
    throw new Promise.reject(error);
  })
};

export default { getAllTravelers, getSingleTraveler, getAllTrips, getAllDestinations, postTripRequest };