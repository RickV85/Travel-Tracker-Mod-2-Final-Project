// Imports
import './css/styles.css';
import apicalls from './apicalls';
import Traveler from './traveler';
import Trip from './trip';
import moment from 'moment';

// Promises
let allTravelersPromise = apicalls.getAllTravelers();
let allTripsPromise = apicalls.getAllTrips();
let allDestinationsPromise = apicalls.getAllDestinations();
let singleTravelerPromise;
let postTripPromise;

// Global variables
let allTrips;
let allDestinations;
let allTravelers;
let currentTraveler;

// Query selectors
let inputs = document.querySelectorAll('#destinationDropdown, #tripDepartureDate, #tripDuration, #tripNumTravelers');
let destinationDropdown = document.getElementById('destinationDropdown');
let quoteTripButton = document.getElementById('quoteTripButton');
let modalGoBack = document.getElementById('modalGoBack');
let tripConfirmModal = document.getElementById('tripConfirmModal');
let submitTripButton = document.getElementById('submitTripButton');
let userName = document.getElementById('userName');
let pastTripsDisplay = document.getElementById('pastTripsDisplay');
let pendingTripsDisplay = document.getElementById('pendingTripsDisplay');
let upcomingTripsDisplay = document.getElementById('upcomingTripsDisplay');
let modalTripQuote = document.getElementById('modalTripQuote');
let tripRequestOptions = document.getElementById('tripRequestOptions');
let tripConfirmHeader = document.getElementById('tripConfirmHeader');
let pastTripTotal = document.getElementById('pastTripTotal');
let tripDepartureDate = document.getElementById('tripDepartureDate');
let tripNumTravelers = document.getElementById('tripNumTravelers');
let tripDuration = document.getElementById('tripDuration');
let loginPage = document.getElementById('loginPage');
let userDashboard = document.getElementById('userDashboard');
let userProfileDisplay = document.getElementById('userProfileDisplay');
let loginConfirmButton = document.getElementById('loginConfirmButton');
let loginUserNameInput = document.getElementById('loginUserNameInput');
let loginPassword = document.getElementById('loginPassword');
let loginErrorModal = document.getElementById('loginErrorModal');
let loginErrorMessage = document.getElementById('loginErrorMessage');
let userDashErrorModal = document.getElementById('userDashErrorModal');
let userDashErrorMessage = document.getElementById('userDashErrorMessage');


// Event listeners
window.addEventListener('load', () => {
  resolvePromisesPageLoad();
  setTodaysDateToMin();
});

loginConfirmButton.addEventListener('click', (event) => {
  event.preventDefault();
  logUserIn();
});

loginPage.addEventListener('click', (event) => {
  event.preventDefault();
  showForgotCreds(event);
});

destinationDropdown.addEventListener('focus', () => {
  createDestinationOptions();
});

quoteTripButton.addEventListener('click', (event) => {
  event.preventDefault();
  openModalEstimateTrip();
});

modalGoBack.addEventListener('click', (event) => {
  event.preventDefault();
  tripConfirmModal.close();
});

tripConfirmModal.addEventListener('click', (event) => {
  if (event.target === tripConfirmModal) {
    tripConfirmModal.close();
  }
});

submitTripButton.addEventListener('click', (event) => {
  event.preventDefault();
  submitTripRequest();
});

// Functions

// This gets all available data but likely will want to make a
// user login version and an agent login version so as not to 
// pull more data than I need. submitTripRequest is calling
// all data and would need to change to user only promise.all
function resolvePromisesPageLoad() {
  Promise.all([allTravelersPromise, allTripsPromise, allDestinationsPromise])
    .then((data) => {
      allTravelers = data[0].travelers;
      allTrips = data[1].trips;
      allDestinations = data[2].destinations;
    })
    .catch((error) => showErrorModal('resolvePageLoadError', error))
};

// Add id parameter after log in is created to make this dynamic
function logUserIn() {
  let enteredName = loginUserNameInput.value;
  let enteredPassword = loginPassword.value;
  let loginUserID = +(loginUserNameInput.value.split('traveler')[1]);

  // MIGHT WANT TO MAKE A SWITCH FUNC HERE to trigger modals
  // Could use an iterator to run each case against.

  // if (!(enteredPassword === 'travel')) {
  //   showErrorModal('badCredentials');
  //   return;
  // } else if (!(enteredName.startsWith('traveler')) || loginUserID > allTravelers.length)
  
  // else if (!(enteredName === 'agency') || !(enteredPassword === 'travel')) {
  //   showErrorModal('badCredentials');
  //   return;
  // }
  if (enteredPassword === 'travel' && enteredName.startsWith('traveler')) {
    singleTravelerPromise = apicalls.getSingleTraveler(loginUserID);
    Promise.resolve(singleTravelerPromise)
      .then((data) => {
        currentTraveler = data;
        currentTraveler = new Traveler(currentTraveler);
        addAllTravelerTrips();
        loginPage.classList.add('hidden');
        userDashboard.classList.remove('hidden');
        userProfileDisplay.classList.remove('hidden');
        updateDOM();
        console.log('currentTraveler', currentTraveler)
      })  
  } else if (enteredName === 'agency' && enteredPassword === 'travel') {
    loginPage.classList.add('hidden');
    agentDashboard.classList.remove('hidden');
    userProfileDisplay.classList.remove('hidden');
  }
};

function showErrorModal(errorType, error) {
  if (errorType === 'badCredentials') {
  openErrorModalReset();
  } else if (errorType === 'loginNetworkError') {
    loginErrorMessage.innerHTML = `Please try logging in again.<br>${error}`;
    openErrorModalReset();
  } else if (errorType === 'resolvePageLoadError') {
    loginErrorMessage.innerHTML = `A server error occoured on page load.<br>Please try reloading the page.<br>${error}`;
    openErrorModalReset();
  } else if (errorType === 'newTripPostError') {
    userDashErrorMessage.innerHTML = `A server error occoured while submitting your trip.<br>Please try to resubmit your trip request.<br>${error}`;
    openUserDashModalReset();
  } else if (errorType === 'missingRequiredInputValues') {
    userDashErrorMessage.innerHTML = `Please fill out all fields in trip request form.<br>Also, please do not enter 0 in any field.`;
    openUserDashModalReset();
  }
};

function openErrorModalReset() {
  loginErrorModal.showModal();
  setTimeout(() => {
    loginErrorModal.close();
    loginUserNameInput.value = '';
    loginPassword.value = '';
    loginErrorMessage.innerHTML = `Your username and password did not match.<br>Please check your credentials and try again.`
  }, 3500)
};

function openUserDashModalReset() {
  userDashErrorModal.showModal();
  setTimeout(() => {
    userDashErrorModal.close();
    userDashErrorMessage.innerHTML = '';
  }, 3500)
}

function addAllTravelerTrips() {
  currentTraveler.addPastTrips(allTrips);
  currentTraveler.addPendingTrips(allTrips);
  currentTraveler.addUpcomingTrips(allTrips);
};

function updateDOM() {
  userName.innerText = currentTraveler.name;
  displayTrips(currentTraveler.pastTrips);
  displayTrips(currentTraveler.pendingTrips);
  displayTrips(currentTraveler.upcomingTrips);
  displayPastTripsTotal();
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
          Departure date: ${convertDateForDOM(trip.date)}<br>${trip.duration} nights in ${trip.destinationDetails.destination}<br>with ${trip.travelers} guests<br>Total trip cost: $${trip.estimatedCost}
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
          Departure date: ${convertDateForDOM(trip.date)}<br>${trip.duration} nights in ${trip.destinationDetails.destination}<br>with ${trip.travelers} guests<br>Total trip cost: $${trip.estimatedCost}
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
          Departure date: ${convertDateForDOM(trip.date)}<br>${trip.duration} nights in ${trip.destinationDetails.destination}<br>with ${trip.travelers} guests<br>Total trip cost: $${trip.estimatedCost}
        </p>
      </article>`;
    });
  };
};

function openModalEstimateTrip() {
  const empty = (input) => input === '';
  const zero = (input) => input === '0';
  const values = [];
  inputs.forEach(input => values.push(input.value));
  if (values.some(empty) || values.some(zero)) {
    showErrorModal('missingRequiredInputValues');
    return;
  } else {
    let newTripQuote = new Trip({
      'userID': currentTraveler.id,
      'destinationID': +(destinationDropdown.value),
      'travelers': +(tripNumTravelers.value),
      'date': tripDepartureDate.value.replaceAll('-', '/'),
      'duration': +(tripDuration.value),
      'status': 'pending',
    }, allTrips);
    let tripQuoteCopy = `Departure: ${convertDateForDOM(newTripQuote.date)}
    ${newTripQuote.duration} nights in ${newTripQuote.destinationDetails.destination}
    with ${newTripQuote.travelers} guests
    Total trip cost: $${newTripQuote.estimatedCost}`;
    modalTripQuote.innerText = tripQuoteCopy;
    tripConfirmModal.setAttribute('aria-label', tripQuoteCopy)
    tripConfirmModal.showModal();
  };
};

function showForgotCreds(event) {
  if (event.target.id === 'loginForgotCreds') {
    loginErrorMessage.innerText = `User name should start with 'traveler' followed by
    a unique user ID number between 1 and 50.
    User name example: traveler35
    The password is 'travel'.`;
    openErrorModalReset();
  }
}

function showThankYouMessage() {
  tripRequestOptions.classList.add('hidden');
  tripConfirmHeader.innerHTML = 'Thank you for booking with Travel Tracker!';
  modalTripQuote.innerText = 'An agent will contact you shortly to confirm your trip.';
};

function closeModalClearInputs() {
  tripConfirmModal.close();
  inputs.forEach(input => {
    input.value = '';
  })
  tripRequestOptions.classList.remove('hidden');
  tripConfirmHeader.innerHTML = 'Request to book your trip';
  destinationDropdown.innerHTML = '<option value="" disabled selected hidden>Where to?</option>';
  modalTripQuote.innerText = '';
}

/////////////////////////////////// USE moment.JS!
function convertDateForDOM(date) {
  let dateYear = +(date.slice(0, 4));
  let dateMonth = +(date.slice(5, 7));
  let dateDay = +(date.slice(8, 10));
  return `${dateMonth}/${dateDay}/${dateYear}`
};

// Only sorting by year and then month
// Could build more conditions in this to sort by day

/////////////////////////////////// USE moment.JS!
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

function displayPastTripsTotal() {
  currentTraveler.calculateSpendInLastYear();
  let total = currentTraveler.amountSpentInLastYear;
  if (total > 0) {
    pastTripTotal.innerText = `Thanks for booking $${total} with us
     in the last year!`
  } else {
    pastTripTotal.innerText = `You haven't booked a trip in the last year.
      You deserve a vacation!`;
  }
}

function createDestinationOptions() {
  let sortedDest = allDestinations.sort((a, b) => a.destination < b.destination ? -1 : 1);
  destinationDropdown.innerHTML = '';
  sortedDest.forEach(dest => {
    destinationDropdown.innerHTML += `<option value="${dest.id}">${dest.destination}</option>`;
  })
};

/////////////////////////////////// USE moment.JS!
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
  postTripPromise = apicalls.postTripRequest(postData);
  Promise.resolve(postTripPromise)
    .then((data) => {
      if (data) {
        allTripsPromise = apicalls.getAllTrips();
        Promise.resolve(allTripsPromise)
          .then((data) => {
            allTrips = data.trips;
            addAllTravelerTrips();
            updateDOM();
            showThankYouMessage();
            setTimeout(() => {
              closeModalClearInputs();
            }, 3000);
          })
      } 
    })
    .catch((error) => {
      showErrorModal('newTripPostError', error);
    });
};

export default { showErrorModal };