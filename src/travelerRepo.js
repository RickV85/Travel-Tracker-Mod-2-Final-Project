import Traveler from "./traveler";


class TravelerRepo {
  constructor(allTrips) {
    this.travelers = [];
    this.allTrips = allTrips;
    this.pendingTrips = [];
    this.travelersOnTrips = [];
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
  
}





export default TravelerRepo;