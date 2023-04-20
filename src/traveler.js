import destinations from "../test/destinations-test-data";
import Trip from "./trip";
import trips from "../test/trips-test-data";
import moment from "moment";

let allTestTrips = trips;

class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.pastTrips = [];
    this.upcomingTrips = [];
    this.pendingTrips = [];
    this.amountSpentInLastYear = 0;
  }

  addPastTrips(tripsToFilter) {
    let userTrips = tripsToFilter.filter((trip) => trip.userID === this.id);
    let approvedTrips = userTrips.filter((trip) => trip.status === "approved");
    let today = moment();
    let approvedPastTrips = approvedTrips.reduce((pastTrips, trip) => {
      let tripDate = moment(trip.date, "YYYY/MM/DD");
      if (tripDate.isBefore(today)) {
        pastTrips.push(new Trip(trip, allTestTrips));
      }
      return pastTrips;
    }, []);
    this.pastTrips = approvedPastTrips;
  }

  calculateSpendInLastYear() {
    let today = moment();
    let oneYearAgo = moment(today).subtract(1, "y");
    let totalForPastTrips = this.pastTrips.reduce((total, trip) => {
      let tripDate = moment(trip.date, "YYYY/MM/DD");
      if (tripDate.isBetween(oneYearAgo, today)) {
        let tripDestination = destinations.find(
          (dest) => dest.id === trip.destinationID
        );
        let tripLodgingCost =
          trip.duration * tripDestination.estimatedLodgingCostPerDay;
        let tripAirfareCost =
          trip.travelers * tripDestination.estimatedFlightCostPerPerson;
        let tripTotal = Math.round((tripLodgingCost + tripAirfareCost) * 1.1);
        return (total += tripTotal);
      }
      return total;
    }, 0);
    this.amountSpentInLastYear = totalForPastTrips;
  }

  addPendingTrips(tripsToFilter) {
    let userTrips = tripsToFilter.filter((trip) => trip.userID === this.id);
    let pendingTrips = userTrips.filter((trip) => trip.status === "pending");
    if (pendingTrips) {
      this.pendingTrips = pendingTrips.map(
        (trip) => new Trip(trip, allTestTrips)
      );
    } else {
      return null;
    }
  }

  addUpcomingTrips(tripsToFilter) {
    let userTrips = tripsToFilter.filter((trip) => trip.userID === this.id);
    let approvedTrips = userTrips.filter((trip) => trip.status === "approved");
    let today = moment();
    let approvedFutureTrips = approvedTrips.reduce((futureTrips, trip) => {
      let tripDepartureDate = moment(trip.date, "YYYY/MM/DD");
      if (moment(today).isBefore(tripDepartureDate)) {
        futureTrips.push(new Trip(trip, allTestTrips));
      }
      return futureTrips;
    }, []);
    this.upcomingTrips = approvedFutureTrips;
  }
}

export default Traveler;
