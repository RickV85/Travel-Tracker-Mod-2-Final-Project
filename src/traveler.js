import destinations from "../test/destinations-test-data";
import Trip from "./trip"
import trips from "../test/trips-test-data"

class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.pastTrips = this.addPastTrips(trips);
    this.upcomingTrips = [];
    this.pendingTrips = [];
    this.amountSpentInLastYear = this.calculateSpendInLastYear();
  }

  addPastTrips(trips) {
    let userTrips = trips.filter(trip => trip.userID === this.id);
    let approvedTrips = userTrips.filter(trip => trip.status === "approved");
    let approvedPastTrips = approvedTrips.map(trip => new Trip(trip))
    return approvedPastTrips;
  }

  calculateSpendInLastYear() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
	  let mm = String(today.getMonth() + 1).padStart(2, '0');
	  let yyyy = today.getFullYear();
	  today = `${yyyy}-${mm}-${dd}`;

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
    return totalForPastTrips;
  }
  
}

export default Traveler;