// Imports
import './css/styles.css';
import apicalls from './apiCalls';
import Traveler from './traveler';

// Promises
let allTravelersPromise = apicalls.getAllTravelers();
let singleTravelerPromise;
let allTripsPromise = apicalls.getAllTrips();
let allDestinationsPromise = apicalls.getAllDestinations();

// Global variables
let currentTraveler;
let allTrips;
let allDestinations;

// Query selectors


// Event listeners
window.addEventListener('load', () => {
  // Get single user here with singleTravelerPromise = apicalls.getSingleTraveler(id);
  singleTravelerPromise = apicalls.getSingleTraveler(3);

  resolvePromises();
})

// Functions
function resolvePromises() {
  Promise.all([allTravelersPromise, singleTravelerPromise, allTripsPromise, allDestinationsPromise])
    .then(data => {
      console.log(data)
      currentTraveler = data[1];
      allTrips = data[2].trips;
      allDestinations = data[3];
      instatiateCurrentTraveler();
    })
}

// Add id parameter after log in is created to make this dynamic
function instatiateCurrentTraveler() {
  currentTraveler = new Traveler(currentTraveler);
  currentTraveler.addPastTrips(allTrips);
  currentTraveler.calculateSpendInLastYear();
  console.log('currentTraveler', currentTraveler)
}
