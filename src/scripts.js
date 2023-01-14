// Imports
import './css/styles.css';
import apicalls from './apiCalls';
import Traveler from './traveler';
import Trip from './trip';

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
  singleTravelerPromise = apicalls.getSingleTraveler(7);
  resolvePromises();
})

submitTripButton.addEventListener('click', () => {
  submitTripRequest(event);
})

// Functions
function resolvePromises() {
  Promise.all([allTravelersPromise, singleTravelerPromise, allTripsPromise, allDestinationsPromise])
    .then(data => {
      currentTraveler = data[1];
      allTrips = data[2].trips;
      allDestinations = data[3].destinations;
      currentTraveler = new Traveler(currentTraveler);
      //Could make a helper for these if I call them more
      currentTraveler.addPastTrips(allTrips);
      currentTraveler.addPendingTrips(allTrips);
      currentTraveler.addUpcomingTrips(allTrips);
      updateDOM();
      console.log('allTrips', allTrips)
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
  userName.innerText = currentTraveler.name;
  displayTrips(currentTraveler.pastTrips);
  displayTrips(currentTraveler.pendingTrips);
  displayTrips(currentTraveler.upcomingTrips);
  setTodaysDateToMin();
  createDestinationOptions();
};

function displayTrips(tripsToDisplay) {
  let sortedTrips;
  if (tripsToDisplay === currentTraveler.pastTrips) {
    sortedTrips = sortTripsForDisplay(tripsToDisplay);
    pastTripsDisplay.innerHTML = '';
    sortedTrips.forEach(trip => {
      pastTripsDisplay.innerHTML += 
      `<article class="trip-tile">
        <p class="trip-tile-copy">
          ${convertDateForDOM(trip.date)}<br>${trip.duration} nights in ${trip.destinationDetails.destination}<br>with ${trip.travelers} guests<br>Total trip cost: $${trip.estimatedCost}
        </p>
      </article>`;
    });
  } else if (tripsToDisplay === currentTraveler.pendingTrips) {
    sortedTrips = sortTripsForDisplay(tripsToDisplay);
    pendingTripsDisplay.innerHTML = '';
    sortedTrips.forEach(trip => {
      pendingTripsDisplay.innerHTML += 
      `<article class="trip-tile">
        <p class="trip-tile-copy">
          ${convertDateForDOM(trip.date)}<br>${trip.duration} nights in ${trip.destinationDetails.destination}<br>with ${trip.travelers} guests<br>Total trip cost: $${trip.estimatedCost}
        </p>
      </article>`;
    });
  } else if (tripsToDisplay === currentTraveler.upcomingTrips) {
    sortedTrips = sortTripsForDisplay(tripsToDisplay);
    upcomingTripsDisplay.innerHTML = '';
    sortedTrips.forEach(trip => {
      upcomingTripsDisplay.innerHTML += 
      `<article class="trip-tile">
        <p class="trip-tile-copy">
          ${convertDateForDOM(trip.date)}<br>${trip.duration} nights in ${trip.destinationDetails.destination}<br>with ${trip.travelers} guests<br>Total trip cost: $${trip.estimatedCost}
        </p>
      </article>`;
    });
  };
};

function convertDateForDOM(date) {
  let dateYear = +(date.slice(0, 4));
  let dateMonth = +(date.slice(5, 7));
  let dateDay = +(date.slice(8, 10));
  return `${dateMonth}/${dateDay}/${dateYear}`
};

// Only sorting by year and then month
// Could build more conditions in this to sort by day
function sortTripsForDisplay(trips) {
  trips.sort((a, b) => {
    if (+(a.date.slice(0, 4)) > +(b.date.slice(0, 4))) {
      a = 1;
      b = 0;
    } else if (+(a.date.slice(0, 4)) < +(b.date.slice(0, 4))) {
      a = 0;
      b = 1;
    } else if (+(a.date.slice(0, 4)) === +(b.date.slice(0, 4))) {
      +a.date.slice(5, 7) >= +b.date.slice(5, 7) ? (a = 1, b = 0) : (a = 0, b = 1);
    }
    return (b - a);
  });
  return trips;
};

function createDestinationOptions() {
  let sortedDest = allDestinations.sort((a, b) => a.destination < b.destination ? -1 : 1);
  sortedDest.forEach(dest => {
    destinationDropdown.innerHTML += `<option value="${dest.id}">${dest.destination}</option>`;
  })
};

function setTodaysDateToMin() {
  let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0');
	let yyyy = today.getFullYear();
	today = `${yyyy}-${mm}-${dd}`;
	tripDepartureDate.setAttribute("min", today);
};

function submitTripRequest(event) {
  event.preventDefault();
  let newTrip = new Trip({
    'userID': currentTraveler.id,
    'destinationID': +(destinationDropdown.value),
    'travelers': +(tripNumTravelers.value),
    'date': tripDepartureDate.value.replaceAll('-', '/'),
    'duration': +(tripDuration.value),
    'status': 'pending',
  }, allTrips)
  let postData = {
  'id': newTrip.id, 
  'userID': newTrip.userID,
  'destinationID': newTrip.destinationID,
  'travelers': newTrip.travelers,
  'date': newTrip.date,
  'duration': newTrip.duration,
  'status': newTrip.status,
  'suggestedActivities': newTrip.suggestedActivities
  };
  console.log(postData);
  apicalls.postTripRequest(postData)
    .then(data => {
      console.log('Trip posted successfully', data);
      currentTraveler.pendingTrips.push(new Trip (data.newTrip, allTrips))
      displayTrips(currentTraveler.pendingTrips);
    })
    .catch(alert('Your trip request failed to send to the server. Please try resubmitting your request.'));
};
