// Imports
import "./css/styles.css";
import apicalls from "./apicalls";
import Traveler from "./traveler";
import Trip from "./trip";
import TravelerRepo from "./travelerRepo";
import moment from "moment";

// Promises
let allTravelersPromise = apicalls.getAllTravelers();
let allTripsPromise = apicalls.getAllTrips();
let allDestinationsPromise = apicalls.getAllDestinations();
let singleTravelerPromise;
let postTripPromise;
let modifyTripPromise;

// Global variables
let allTrips;
let allDestinations;
let allTravelers;
let currentTraveler;
let allTravelersRepo;

// Query selectors
let inputs = document.querySelectorAll(
  "#destinationDropdown, #tripDepartureDate, #tripDuration, #tripNumTravelers"
);
let destinationDropdown = document.getElementById("destinationDropdown");
let quoteTripButton = document.getElementById("quoteTripButton");
let modalGoBack = document.getElementById("modalGoBack");
let tripConfirmModal = document.getElementById("tripConfirmModal");
let submitTripButton = document.getElementById("submitTripButton");
let userName = document.getElementById("userName");
let pastTripsDisplay = document.getElementById("pastTripsDisplay");
let pendingTripsDisplay = document.getElementById("pendingTripsDisplay");
let upcomingTripsDisplay = document.getElementById("upcomingTripsDisplay");
let modalTripQuote = document.getElementById("modalTripQuote");
let tripRequestOptions = document.getElementById("tripRequestOptions");
let tripConfirmHeader = document.getElementById("tripConfirmHeader");
let pastTripTotal = document.getElementById("pastTripTotal");
let tripDepartureDate = document.getElementById("tripDepartureDate");
let tripNumTravelers = document.getElementById("tripNumTravelers");
let tripDuration = document.getElementById("tripDuration");
let loginPage = document.getElementById("loginPage");
let userDashboard = document.getElementById("userDashboard");
let userProfileDisplay = document.getElementById("userProfileDisplay");
let loginConfirmButton = document.getElementById("loginConfirmButton");
let loginUserNameInput = document.getElementById("loginUserNameInput");
let loginPassword = document.getElementById("loginPassword");
let loginErrorModal = document.getElementById("loginErrorModal");
let loginErrorMessage = document.getElementById("loginErrorMessage");
let userDashErrorModal = document.getElementById("userDashErrorModal");
let userDashErrorMessage = document.getElementById("userDashErrorMessage");
let totalRevenueYTD = document.getElementById("totalRevenueYTD");
let currentBookedTravelers = document.getElementById("currentBookedTravelers");
let reviewTrips = document.getElementById("reviewTrips");
let reviewRequestSection = document.getElementById("reviewRequestSection");
let agencyDashErrorModal = document.getElementById("agencyDashErrorModal");
let agencyDashErrorMessage = document.getElementById("agencyDashErrorMessage");
let searchTravelerInput = document.getElementById("searchTravelerInput");
let agentSearchSection = document.getElementById("agentSearchSection");
let findTravelerSection = document.getElementById("findTravelerSection");
let tripDestImage = document.getElementById('tripDestImage');

// Event listeners
window.addEventListener("load", () => {
  resolvePromisesPageLoad();
  setTodaysDateToMin();
});

loginConfirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  logUserIn();
});

loginPage.addEventListener("click", (event) => {
  event.preventDefault();
  showForgotCreds(event);
});

destinationDropdown.addEventListener("focus", () => {
  createDestinationOptions();
});

quoteTripButton.addEventListener("click", (event) => {
  event.preventDefault();
  openModalEstimateTrip();
});

modalGoBack.addEventListener("click", (event) => {
  event.preventDefault();
  tripConfirmModal.classList.remove('add-flex');
  tripConfirmModal.close();
});

tripConfirmModal.addEventListener("click", (event) => {
  if (event.target === tripConfirmModal) {
    tripConfirmModal.classList.remove('add-flex');
    tripConfirmModal.close();
  }
});

submitTripButton.addEventListener("click", (event) => {
  event.preventDefault();
  submitTripRequest();
});

reviewRequestSection.addEventListener("click", (event) => {
  event.preventDefault();
  agentModifyDeleteRequest(event);
});

findTravelerSection.addEventListener("click", (event) => {
  if (event.target.id === "searchTravelersButton") {
    agentSearchSection = document.getElementById("agentSearchSection");
    searchTravelerInput = document.getElementById("searchTravelerInput");
    travelerSearch();
  }
});

findTravelerSection.addEventListener("click", (event) => {
  if (event.target.id === "agentSearchGoBack") {
    findTravelerSection.innerHTML = `
    <div class="agent-search-section" id="agentSearchSection">
      <h2 id="findTravelerTitle">Find a traveler by name</h2>
      <input type="text" id="searchTravelerInput" placeholder="i.e. John Doe" required>
      <button class="submit-buttons" id="searchTravelersButton">Search</button>
    </div>`;
    agentSearchSection.innerHTML = "";
    findTravelerSection.classList.add("search-open");
  }
});

// Functions

function resolvePromisesPageLoad() {
  Promise.all([allTravelersPromise, allTripsPromise, allDestinationsPromise])
    .then((data) => {
      allTravelers = data[0].travelers;
      allTrips = data[1].trips;
      allDestinations = data[2].destinations;
      allTravelersRepo = new TravelerRepo(allTrips);
      allTravelersRepo.instatiateTravelers(allTravelers);
      allTravelersRepo.filterPendingTrips();
      updateAgencyDOM();
    })
    .catch((error) => showErrorModal("resolvePageLoadError", error));
}

function logUserIn() {
  let enteredName = loginUserNameInput.value;
  let enteredPassword = loginPassword.value;
  let loginUserID = +loginUserNameInput.value.split("traveler")[1];
  let validUserNames = allTravelersRepo.travelers.map((traveler) => {
    return `traveler${traveler.id}`;
  });

  if (validUserNames.includes(enteredName) && enteredPassword === "travel") {
    singleTravelerPromise = apicalls.getSingleTraveler(loginUserID);
    Promise.resolve(singleTravelerPromise).then((data) => {
      currentTraveler = data;
      currentTraveler = new Traveler(currentTraveler);
      addAllTravelerTrips();
      loginPage.classList.add("hidden");
      userDashboard.classList.remove("hidden");
      userProfileDisplay.classList.remove("hidden");
      updateTravelerDOM();
    });
  } else if (enteredName === "agency" && enteredPassword === "travel") {
    loginPage.classList.add("hidden");
    agentDashboard.classList.remove("hidden");
    userProfileDisplay.classList.remove("hidden");
    updateAgencyDOM();
  } else {
    showErrorModal("badCredentials");
  }
}

function showErrorModal(errorType, error) {
  if (errorType === "badCredentials") {
    openErrorModalReset();
  } else if (errorType === "loginNetworkError") {
    loginErrorMessage.innerHTML = `Please try logging in again.<br>${error}`;
    openErrorModalReset();
  } else if (errorType === "resolvePageLoadError") {
    loginErrorMessage.innerHTML = `A server error occoured on page load.<br>Please try reloading the page.<br>${error}`;
    openErrorModalReset();
  } else if (errorType === "newTripPostError") {
    userDashErrorMessage.innerHTML = `A server error occoured while submitting your trip.<br>Please try to resubmit your trip request.<br>${error}`;
    openUserDashModalReset();
  } else if (errorType === "missingRequiredInputValues") {
    userDashErrorMessage.innerHTML = `Please fill out all fields in trip request form.<br>Also, please do not enter 0 in any field.`;
    openUserDashModalReset();
  } else if (errorType === "agentModifyError") {
    agencyDashErrorMessage.innerHTML = `The request you made to approve or deny a trip failed.<br>Please try your request again.<br>${error}`;
    openAgencyDashModalReset();
  }
}

function openErrorModalReset() {
  loginErrorModal.showModal();
  loginErrorModal.classList.add('login-modal');
  setTimeout(() => {
    loginErrorModal.close();
    loginErrorModal.classList.remove('login-modal');
    loginUserNameInput.value = "";
    loginPassword.value = "";
    loginErrorMessage.innerHTML = `Your username and password did not match.<br>Please check your credentials and try again.`;
  }, 3500);
}

function openUserDashModalReset() {
  userDashErrorModal.showModal();
  setTimeout(() => {
    userDashErrorModal.close();
    userDashErrorMessage.innerHTML = "";
  }, 3500);
}

function openAgencyDashModalReset() {
  agencyDashErrorModal.showModal();
  setTimeout(() => {
    agencyDashErrorModal.close();
    agencyDashErrorMessage.innerHTML = "";
  }, 3500);
}

function addAllTravelerTrips() {
  currentTraveler.addPastTrips(allTrips);
  currentTraveler.addPendingTrips(allTrips);
  currentTraveler.addUpcomingTrips(allTrips);
}

function updateTravelerDOM() {
  userName.innerText = currentTraveler.name;
  displayTrips(currentTraveler.pastTrips);
  displayTrips(currentTraveler.pendingTrips);
  displayTrips(currentTraveler.upcomingTrips);
  displayPastTripsTotal();
}

function updateAgencyDOM() {
  userName.innerText = "Agent Portal";
  let totalRevenue = allTravelersRepo.calculateTotalIncome();
  totalRevenueYTD.innerText = `Total revenue YTD:$${totalRevenue}`;
  let currentlyOnTrips = allTravelersRepo.findNumTravelersOnTrips();
  currentBookedTravelers.innerText = `Currently on trips: ${currentlyOnTrips} travelers`;
  reviewTrips.innerHTML = "";
  allTravelersRepo.pendingTrips.forEach((trip) => {
    let travelerDetails = allTravelersRepo.travelers.find(
      (traveler) => traveler.id === trip.userID
    );
    reviewTrips.innerHTML += `
      <section class="trips-to-review">
        <article class="trip-tile agent-tile">
          <p class="trip-tile-copy">${
            travelerDetails.name
          }<br>${convertDateForDOM(trip.date)}<br>${trip.duration} nights in ${
      trip.destinationDetails.destination
    }<br>with ${trip.travelers} guests<br>Total trip cost: $${
      trip.estimatedCost
    }</p>
        </article>
        <div class="trip-review-buttons">
          <button class="submit-buttons agent-buttons" id="approveTrip${
            trip.id
          }">Approve</button>
          <button class="submit-buttons agent-buttons" id="denyTrip${
            trip.id
          }">Deny</button>
        </div>
      </section>`;
  });
}

function displayTrips(tripsToDisplay) {
  let sortedTrips = sortTripsForDisplay(tripsToDisplay);
  let displayTarget;

  if (tripsToDisplay === currentTraveler.pastTrips) {
    displayTarget = pastTripsDisplay;
  } else if (tripsToDisplay === currentTraveler.pendingTrips) {
    displayTarget = pendingTripsDisplay;
  } else if (tripsToDisplay === currentTraveler.upcomingTrips) {
    displayTarget = upcomingTripsDisplay;
  }

  displayTarget.innerHTML = "";
  sortedTrips.forEach((trip) => {
    displayTarget.innerHTML += `<article class="trip-tile">
      <p class="trip-tile-copy">
        Departure date: ${convertDateForDOM(trip.date)}<br>${
      trip.duration
    } nights in ${trip.destinationDetails.destination}<br>with ${
      trip.travelers
    } guests<br>Total trip cost: $${trip.estimatedCost}
      </p>
    </article>`;
  });
}

function openModalEstimateTrip() {
  const empty = (input) => input === "";
  const bad = (input) => +(input) <= 0;
  const values = [];
  inputs.forEach((input) => values.push(input.value));
  if (values.some(empty) || values.some(bad)) {
    showErrorModal("missingRequiredInputValues");
    return;
  } else {
    let newTripQuote = new Trip(
      {
        userID: currentTraveler.id,
        destinationID: +destinationDropdown.value,
        travelers: +tripNumTravelers.value,
        date: tripDepartureDate.value.replaceAll("-", "/"),
        duration: +tripDuration.value,
        status: "pending",
      },
      allTrips
    );
    let tripQuoteCopy = `Departure: ${convertDateForDOM(newTripQuote.date)}
    ${newTripQuote.duration} nights in ${
      newTripQuote.destinationDetails.destination
    }
    with ${newTripQuote.travelers} guests
    Total trip cost: $${newTripQuote.estimatedCost}`;
    modalTripQuote.innerText = tripQuoteCopy;
    tripDestImage.setAttribute('src', newTripQuote.destinationDetails.image);
    tripConfirmModal.setAttribute("aria-label", tripQuoteCopy);
    tripConfirmModal.classList.add('add-flex');
    tripConfirmModal.showModal();
  }
}

function showForgotCreds(event) {
  if (event.target.id === "loginForgotCreds") {
    loginErrorMessage.innerText = `To log in as a traveler:
    User name should start with 'traveler' followed by
    a unique user ID number between 1 and 50.
    User name example: traveler35
    
    To log in as an agent:
    user name: agency
    
    The password is 'travel' for all users.`;
    openErrorModalReset();
  }
}

function showThankYouMessage() {
  tripRequestOptions.classList.add("hidden");
  tripConfirmHeader.innerHTML = "Thank you for booking with Travel Tracker!";
  modalTripQuote.innerText =
    "An agent will contact you shortly to confirm your trip.";
}

function closeModalClearInputs() {
  tripConfirmModal.close();
  inputs.forEach((input) => {
    input.value = "";
  });
  tripRequestOptions.classList.remove("hidden");
  tripConfirmHeader.innerHTML = "Request to book your trip";
  destinationDropdown.innerHTML =
    '<option value="" disabled selected hidden>Where to?</option>';
  modalTripQuote.innerText = "";
}

function convertDateForDOM(date) {
  return moment(date, "YYYY/MM/DD").format("l");
}

function sortTripsForDisplay(trips) {
  let sortedTrips = trips.sort((a, b) => {
    let aDate = moment(a.date, "YYYY/MM/DD");
    let bDate = moment(b.date, "YYYY/MM/DD");
    if (aDate.isBefore(bDate)) {
      a = 0;
      b = 1;
    } else {
      b = 0;
      a = 1;
    }
    return b - a;
  });
  return sortedTrips;
}

function displayPastTripsTotal() {
  currentTraveler.calculateSpendInLastYear();
  let total = currentTraveler.amountSpentInLastYear;
  if (total > 0) {
    pastTripTotal.innerText = `Thanks for booking $${total} with us
     in the last year!`;
  } else {
    pastTripTotal.innerText = `You haven't booked a trip in the last year.
      You deserve a vacation!`;
  }
}

function createDestinationOptions() {
  let sortedDest = allDestinations.sort((a, b) =>
    a.destination < b.destination ? -1 : 1
  );
  destinationDropdown.innerHTML = "";
  sortedDest.forEach((dest) => {
    destinationDropdown.innerHTML += `<option value="${dest.id}">${dest.destination}</option>`;
  });
}

function setTodaysDateToMin() {
  let today = moment().format("YYYY-MM-DD");
  tripDepartureDate.setAttribute("min", today);
}

function submitTripRequest() {
  let newTrip = new Trip(
    {
      userID: currentTraveler.id,
      destinationID: +destinationDropdown.value,
      travelers: +tripNumTravelers.value,
      date: tripDepartureDate.value.replaceAll("-", "/"),
      duration: +tripDuration.value,
      status: "pending",
    },
    allTrips
  );
  let postData = {
    id: newTrip.id,
    userID: newTrip.userID,
    destinationID: newTrip.destinationID,
    travelers: newTrip.travelers,
    date: newTrip.date,
    duration: newTrip.duration,
    status: newTrip.status,
    suggestedActivities: newTrip.suggestedActivities,
  };
  postTripPromise = apicalls.postTripRequest(postData);
  Promise.resolve(postTripPromise)
    .then((data) => {
      if (data) {
        allTripsPromise = apicalls.getAllTrips();
        Promise.resolve(allTripsPromise).then((data) => {
          allTrips = data.trips;
          addAllTravelerTrips();
          updateTravelerDOM();
          showThankYouMessage();
          setTimeout(() => {
            closeModalClearInputs();
            tripConfirmModal.classList.remove('add-flex');
          }, 3000);
        });
      }
    })
    .catch((error) => {
      showErrorModal("newTripPostError", error);
    });
}

function agentModifyDeleteRequest(event) {
  let actionTarget = event.target.id;
  let actionTripID;
  let tripToModify;
  let modifyTripPostData;

  if (actionTarget.startsWith("approveTrip")) {
    actionTripID = +actionTarget.split("approveTrip")[1];
    tripToModify = allTravelersRepo.pendingTrips.find(
      (trip) => trip.id === actionTripID
    );
    modifyTripPostData = { id: tripToModify.id, status: "approved" };
    modifyTripPromise = apicalls.modifyTripRequest(modifyTripPostData);
  } else if (actionTarget.startsWith("denyTrip")) {
    actionTripID = +actionTarget.split("denyTrip")[1];
    tripToModify = allTravelersRepo.pendingTrips.find(
      (trip) => trip.id === actionTripID
    );
    modifyTripPostData = tripToModify.id;
    modifyTripPromise = apicalls.deleteTrip(modifyTripPostData);
  }

  Promise.resolve(modifyTripPromise)
    .then((data) => {
      if (data) {
        allTravelersPromise = apicalls.getAllTravelers();
        allTripsPromise = apicalls.getAllTrips();
        allDestinationsPromise = apicalls.getAllDestinations();
        resolvePromisesPageLoad();
      }
    })
    .catch((error) => {
      showErrorModal("agentModifyError", error);
    });
}

function travelerSearch() {
  let searchValue = searchTravelerInput.value;
  let foundTraveler = allTravelersRepo.travelers.find(
    (traveler) => traveler.name === searchValue
  );
  let travelerName = foundTraveler.name;
  let amountSpent = foundTraveler.amountSpentInLastYear;
  let travelerPastTrips = displayTripsAgentSearch(foundTraveler.pastTrips);
  let travelerPendingTrips = displayTripsAgentSearch(
    foundTraveler.pendingTrips
  );
  let travelerUpcomingTrips = displayTripsAgentSearch(
    foundTraveler.upcomingTrips
  );
  
  agentSearchSection.innerHTML = `
  <h2 id="findTravelerTitle">${travelerName} - YTD Spend: $${amountSpent}</h2>
  <h3>Past Trips</h3>
  ${travelerPastTrips}
  <h3>Pending Trips</h3>
  ${travelerPendingTrips}
  <h3>Upcoming Trips</h3>
  ${travelerUpcomingTrips}
  <button class="submit-buttons agent-buttons" id="agentSearchGoBack">Go back</button>`;
  agentSearchSection.classList.add("traveler-trips-view");
  findTravelerSection.classList.remove("search-open");
}

function displayTripsAgentSearch(tripsToShow) {
  let travelerTrips = tripsToShow.reduce((html, trip) => {
    let tripHTML = `
    <div class= "agent-search-trip-tile">
      <article class="trip-tile agent-tile">
        <p class="trip-tile-copy">
          Departure date: ${convertDateForDOM(trip.date)}<br>${
      trip.duration
    } nights in ${trip.destinationDetails.destination}<br>with ${
      trip.travelers
    } guests<br>Total trip cost: $${trip.estimatedCost}
        </p>
      </article>
    </div>`;
    html += tripHTML;
    return html;
  }, "");
  return travelerTrips;
}

export default { showErrorModal };