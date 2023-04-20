import scripts from "./scripts";

let allTravelers;
let singleTraveler;
let allTrips;
let allDestinations;

// GET calls

function getAllTravelers() {
  return fetch("http://localhost:3001/api/v1/travelers")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => {
      allTravelers = data;
      return allTravelers;
    });
}

function getSingleTraveler(id) {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => {
      singleTraveler = data;
      return singleTraveler;
    })
    .catch((error) => {
      scripts.showErrorModal("loginNetworkError", error);
    });
}

function getAllTrips() {
  return fetch("http://localhost:3001/api/v1/trips")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => {
      allTrips = data;
      return allTrips;
    });
}

function getAllDestinations() {
  return fetch("http://localhost:3001/api/v1/destinations")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => {
      allDestinations = data;
      return allDestinations;
    });
}

// Post requests

function postTripRequest(postData) {
  return fetch(`http://localhost:3001/api/v1/trips`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  });
}

function modifyTripRequest(postData) {
  return fetch("http://localhost:3001/api/v1/updateTrip", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  });
}

// Delete request

function deleteTrip(id) {
  return fetch(`http://localhost:3001/api/v1/trips/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  });
}

export default {
  getAllTravelers,
  getSingleTraveler,
  getAllTrips,
  getAllDestinations,
  postTripRequest,
  modifyTripRequest,
  deleteTrip,
};
