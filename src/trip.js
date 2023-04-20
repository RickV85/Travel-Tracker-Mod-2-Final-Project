import destinations from "../test/destinations-test-data";

class Trip {
  constructor(tripDetails, allTrips) {
    this.id = tripDetails.id || allTrips.length + 1;
    this.userID = tripDetails.userID;
    this.destinationID = tripDetails.destinationID;
    this.destinationDetails = this.addDestinationDetails(
      tripDetails.destinationID
    );
    this.travelers = tripDetails.travelers;
    this.date = tripDetails.date;
    this.duration = tripDetails.duration;
    this.status = tripDetails.status;
    this.suggestedActivities = [];
    this.estimatedCost = this.calculateCost();
  }

  calculateCost() {
    let tripDestination = destinations.find(
      (dest) => dest.id === this.destinationID
    );
    let tripLodgingCost =
      this.duration * tripDestination.estimatedLodgingCostPerDay;
    let tripAirfareCost =
      this.travelers * tripDestination.estimatedFlightCostPerPerson;
    let tripTotal = Math.round((tripLodgingCost + tripAirfareCost) * 1.1);
    return tripTotal;
  }

  addDestinationDetails(destID) {
    let foundDest = destinations.find((dest) => dest.id === destID);
    if (foundDest) {
      return foundDest;
    } else {
      return null;
    }
  }
}
export default Trip;
