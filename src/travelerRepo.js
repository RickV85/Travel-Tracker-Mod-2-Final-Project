import Traveler from "./traveler";
import Trip from "./trip";
import moment from 'moment';


class TravelerRepo {
  constructor(allTrips) {
    this.travelers = [];
    this.allTrips = allTrips;
    this.pendingTrips = [];
  }

  instatiateTravelers(allTravelers) {
    allTravelers.forEach(traveler => {
      let newTraveler = new Traveler(traveler);
      newTraveler.addPastTrips(this.allTrips);
      newTraveler.addPendingTrips(this.allTrips);
      newTraveler.addUpcomingTrips(this.allTrips);
      newTraveler.calculateSpendInLastYear();
      this.travelers.push(newTraveler);
    });
  }
  
  calculateTotalIncome() {
    let totalSpend = this.travelers.reduce((total, traveler) => {
      total += traveler.amountSpentInLastYear;
      return total;
    }, 0);
    return Math.round(totalSpend * .1);
  }

  filterPendingTrips() {
    let filteredPending = this.allTrips.reduce((penTrips, trip) => {
      if (trip.status === 'pending') {
        penTrips.push(new Trip(trip, this.allTrips));
      }
      return penTrips;
    }, []);
    this.pendingTrips = filteredPending;
  }

  findNumTravelersOnTrips() {
    let approvedTrips = this.allTrips.filter(trip => trip.status === "approved");
    let today = moment();
    let currentTrips = approvedTrips.reduce((total, trip) => {
      let tripDepartureDate = moment(trip.date, "YYYY/MM/DD");
      let tripEndDate = moment(tripDepartureDate, "YYYY/MM/DD").add(trip.duration, 'days');
      if (moment(today).isBetween(tripDepartureDate, tripEndDate)) {
        total += 1;
      }
      return total;
    }, 0);
    return currentTrips;
  }

  findUserByName(name) {
    let foundTraveler = this.travelers.find(traveler => traveler.name === name);
    if (foundTraveler) {
      return foundTraveler;
    } else {
      return null;
    }
  }
}

export default TravelerRepo;