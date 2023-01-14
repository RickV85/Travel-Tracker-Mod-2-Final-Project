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
let inputs = document.querySelectorAll('#destinationDropdown, #tripDepartureDate, #tripDuration, #tripNumTravelers')

// Event listeners
window.addEventListener('load', () => {
  // Get single user here with singleTravelerPromise = apicalls.getSingleTraveler(id);
  // Will likely need to move this to a submit event listener and remove from here
  singleTravelerPromise = apicalls.getSingleTraveler(18);
  resolvePromises();
})

quoteTripButton.addEventListener('click', (event) => {
  event.preventDefault();
  //Add func call here for a new func that creates a new Trip
  // then injects a message in to the modal with trip.estimatedCost
  // based on details entered
  tripConfirmModal.showModal();
});

modalGoBack.addEventListener('click', () => {
  tripConfirmModal.close();
})

submitTripButton.addEventListener('click', (event) => {
  event.preventDefault();
  submitTripRequest();
  // Could add timeout and add a confirmation message "An agent will contact you soon to approve your booking"
  tripConfirmModal.close();
  inputs.forEach(input => {
    input.value = '';
  })
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
      console.log(currentTraveler);
    })
}

// Add id parameter after log in is created to make this dynamic
// function instatiateCurrentTraveler() {
//   currentTraveler = new Traveler(currentTraveler);
//   // currentTraveler.addPastTrips(allTrips);
//   // currentTraveler.displayPastTripsTotal();
//   console.log('currentTraveler', currentTraveler)
// }

function updateDOM() {
  userName.innerText = currentTraveler.name;
  displayTrips(currentTraveler.pastTrips);
  displayTrips(currentTraveler.pendingTrips);
  displayTrips(currentTraveler.upcomingTrips);
  displayPastTripsTotal();
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

// Make a new modal and have the current article be a button to 
function displayPastTripsTotal() {
  currentTraveler.calculateSpendInLastYear();
  let total = currentTraveler.amountSpentInLastYear;
  if (total > 0) {
  pastTripTotal.innerText = `Thanks for booking $${total} in trips with us this year!`
  } else {
    pastTripTotal.innerText = `You haven't booked a trip in the last year.
    Imagine where we could take you!`;
  }
}


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

function submitTripRequest() {
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
  apicalls.postTripRequest(postData)
    .then(data => {
      console.log('Trip posted successfully', data);
      currentTraveler.pendingTrips.push(new Trip (data.newTrip, allTrips))
      displayTrips(currentTraveler.pendingTrips);
    })
    .catch('Your trip request failed to send to the server. Please try resubmitting your request.');
};
