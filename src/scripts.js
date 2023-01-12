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
  // Will likely need to move this to a submit event listener and remove from here
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
      updateDOM();
    })
}

// Add id parameter after log in is created to make this dynamic
function instatiateCurrentTraveler() {
  currentTraveler = new Traveler(currentTraveler);
  currentTraveler.addPastTrips(allTrips);
  currentTraveler.calculateSpendInLastYear();
  console.log('currentTraveler', currentTraveler)
}

function updateDOM() {
  userName.innerText = currentTraveler.name;
  currentTraveler.pastTrips.forEach(trip => {
    pastTripsDisplay.innerHTML += 
    `<article class="trip-tile">
      <p class="trip-tile-copy">
        ${trip.date}<br>${trip.duration} nights in DESTINATION<br>with ${trip.travelers} guests<br>Total trip cost: $TRIPCOST
      </p>
    </article>`
  })
}
