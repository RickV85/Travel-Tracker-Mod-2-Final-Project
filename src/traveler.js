class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.pastTrips = [];
    this.upcomingTrips = [];
    this.pendingTrips = [];
  }

  addPastTrips(trips) {
    let filteredTrips = trips.filter(trip => trip.userID === this.id);
    this.pastTrips = filteredTrips;
  }
}

export default Traveler;