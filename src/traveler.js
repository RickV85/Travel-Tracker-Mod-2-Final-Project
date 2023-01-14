import destinations from "../test/destinations-test-data";
import Trip from "./trip"
import trips from "../test/trips-test-data";

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

  returnTodaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
	  let mm = String(today.getMonth() + 1).padStart(2, '0');
	  let yyyy = today.getFullYear();
	  today = `${yyyy}-${mm}-${dd}`;
    return today;
  }

  addPastTrips(tripsToFilter) {
    let today = this.returnTodaysDate();
    let yyyy = +(today.slice(0, 4));
    let mm = +(today.slice(5, 7));
    let dd = +(today.slice(8, 10));

    let userTrips = tripsToFilter.filter(trip => trip.userID === this.id);
    let approvedTrips = userTrips.filter(trip => trip.status === "approved");
    let approvedPastTrips = approvedTrips.reduce((pastTrips, trip) => {
      let tripYear = +(trip.date.slice(0, 4));
      let tripMonth = +(trip.date.slice(5, 7));
      let tripDay = +(trip.date.slice(8, 10));
      // filter for dates only in the future
      // if tripYear is greater than current year its not in the past
      if (tripYear > +(yyyy)) {
        return pastTrips;
        // if tripYear is = to current year AND greater than current month, its not in the past
      } else if (tripYear === yyyy && tripMonth > +(mm)) {
        return pastTrips;
        // if trip year is current year AND trip month is the current month AND tripDay is greater than current day, its not in the past
      } else if (tripYear === +(yyyy) && tripMonth === +(mm) && tripDay > +(dd)) {
        return pastTrips;
      }
      pastTrips.push(new Trip(trip, allTestTrips));
      return pastTrips;
    }, []);

    // Use reduce here to calculate the total

    this.pastTrips = approvedPastTrips;
  };

  calculateSpendInLastYear() {
    let today = this.returnTodaysDate();
    let yyyy = +(today.slice(0, 4));
    let mm = +(today.slice(5, 7));
    let dd = +(today.slice(8, 10));

    let totalForPastTrips = this.pastTrips.reduce((total, trip) => {
      let tripYear = +(trip.date.slice(0, 4));
      let tripMonth = +(trip.date.slice(5, 7));
      let tripDay = +(trip.date.slice(8, 10));
      // if tripYear is less than or equal to current year minus 2, stop
      if (tripYear <= +(yyyy - 2)) {
        return total;
        // if tripYear is current year - 1 AND tripMonth is less than the current month, stop
      } else if (tripYear === +(yyyy - 1) && tripMonth < +(mm)) {
        return total;
        // if trip year is current year - 1 AND trip month is the current month AND tripDay is earlier than current day, stop
      } else if (tripYear === +(yyyy - 1) && tripMonth === +(mm) && tripDay < +(dd)) {
        return total;
      }
      
      let tripDestination = destinations.find(dest => dest.id === trip.destinationID);
      let tripLodgingCost = trip.duration * tripDestination.estimatedLodgingCostPerDay;
      let tripAirfareCost = trip.travelers * tripDestination.estimatedFlightCostPerPerson;
      let tripTotal = Math.round((tripLodgingCost + tripAirfareCost) * 1.1);
      
      return total += tripTotal;
    }, 0);
    this.amountSpentInLastYear = totalForPastTrips;
  };

  addPendingTrips(tripsToFilter) {
    let userTrips = tripsToFilter.filter(trip => trip.userID === this.id);
    let pendingTrips = userTrips.filter(trip => trip.status === "pending");
    this.pendingTrips = pendingTrips.map(trip => new Trip(trip, allTestTrips))
  }

  addUpcomingTrips(tripsToFilter) {
    let today = this.returnTodaysDate();
    let yyyy = +(today.slice(0, 4));
    let mm = +(today.slice(5, 7));
    let dd = +(today.slice(8, 10));

    let userTrips = tripsToFilter.filter(trip => trip.userID === this.id);
    let approvedTrips = userTrips.filter(trip => trip.status === "approved");
    let approvedFutureTrips = approvedTrips.reduce((futureTrips, trip) => {
      let tripYear = +(trip.date.slice(0, 4));
      let tripMonth = +(trip.date.slice(5, 7));
      let tripDay = +(trip.date.slice(8, 10));
      // filter for dates only in the future
      // if tripYear is less than current year its not in the future
      if (tripYear < +(yyyy)) {
        return futureTrips;
        // if tripYear is = to current year AND tripMonth less than current month, its not in the future
      } else if (tripYear === yyyy && tripMonth < +(mm)) {
        return futureTrips;
        // if trip year is current year AND trip month is the current month AND tripDay is less than current day, its not in the future
      } else if (tripYear === +(yyyy) && tripMonth === +(mm) && tripDay < +(dd)) {
        return futureTrips;
      }
      futureTrips.push(new Trip(trip, allTestTrips));
      return futureTrips;
    }, [])
    this.upcomingTrips = approvedFutureTrips;
  };
};

export default Traveler;