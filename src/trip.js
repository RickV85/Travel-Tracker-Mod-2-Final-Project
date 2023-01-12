import destinations from "../test/destinations-test-data";

class Trip {
  constructor(tripDetails) {
    this.id = new Date().toString();
    this.userID = tripDetails.userID;
    this.destinationID = tripDetails.destinationID;
    this.destinationName = this.addDestinationName(tripDetails.destinationID);
    this.travelers = tripDetails.travelers;
    this.date = tripDetails.date;
    this.duration = tripDetails.duration;
    this.status = tripDetails.status;
    this.suggestedActivities = [];
    this.estimatedCost = this.calculateCost();
  }

  calculateCost(){
    let tripDestination = destinations.find(dest => dest.id === this.destinationID);
    let tripLodgingCost = this.duration * tripDestination.estimatedLodgingCostPerDay;
    let tripAirfareCost = this.travelers * tripDestination.estimatedFlightCostPerPerson;
    let tripTotal = Math.round((tripLodgingCost + tripAirfareCost) * 1.1);
    return tripTotal;
  }

  addDestinationName(destID) {
    return destinations.find(dest => dest.id === destID).destination;
  }
};
export default Trip;