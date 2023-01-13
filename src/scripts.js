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
      allDestinations = data[3].destinations;
      currentTraveler = new Traveler(currentTraveler);
      console.log('currentTraveler', currentTraveler);
      updateDOM();
    })
}

// Add id parameter after log in is created to make this dynamic
// function instatiateCurrentTraveler() {
//   currentTraveler = new Traveler(currentTraveler);
//   // currentTraveler.addPastTrips(allTrips);
//   // currentTraveler.calculateSpendInLastYear();
//   console.log('currentTraveler', currentTraveler)
// }

function updateDOM() {
  displayUserDOM();
  setTodaysDateToMin();
  createDestinationOptions();
}

function displayUserDOM() {
  userName.innerText = currentTraveler.name;
  currentTraveler.pastTrips.forEach(trip => {
    pastTripsDisplay.innerHTML += 
    `<article class="trip-tile">
      <p class="trip-tile-copy">
        ${convertDateForDOM(trip.date)}<br>${trip.duration} nights in ${trip.destinationDetails.destination}<br>with ${trip.travelers} guests<br>Total trip cost: $${trip.estimatedCost}
      </p>
    </article>`
  })
}

function convertDateForDOM(date) {
  let dateYear = +(date.slice(0, 4));
  let dateMonth = +(date.slice(5, 7));
  let dateDay = +(date.slice(8, 10));
  return `${dateMonth}/${dateDay}/${dateYear}`
}

function createDestinationOptions() {
  let sortedDest = allDestinations.sort((a, b) => a.destination < b.destination ? -1 : 1);
  console.log(sortedDest);
  sortedDest.forEach(dest => {
    destinationDropdown.innerHTML += `<option value="${dest.id}">${dest.destination}</option>`;
  })
  
}

function setTodaysDateToMin() {
  let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0');
	let yyyy = today.getFullYear();
	today = `${yyyy}-${mm}-${dd}`;
	tripDepartureDate.setAttribute("min", today);
}