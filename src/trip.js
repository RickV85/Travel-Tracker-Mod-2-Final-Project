import destinations from "../test/destinations-test-data";

class Trip {
  constructor(tripRequest) {
    this.id = new Date().toString();
    this.userID = tripRequest.userID;
    this.destinationID = tripRequest.destinationID;
    this.travelers = tripRequest.travelers;
    this.date = tripRequest.date;
    this.duration = tripRequest.duration;
    this.status = tripRequest.status;
    this.suggestedActivities = [];
    this.estimatedCost = null;
  }

  calculateCost(){
    let tripDestination = destinations.find(dest => dest.id === this.destinationID);
    let tripLodgingCost = this.duration * tripDestination.estimatedLodgingCostPerDay;
    let tripAirfareCost = this.travelers * tripDestination.estimatedFlightCostPerPerson;
    let tripTotal = Math.round((tripLodgingCost + tripAirfareCost) * 1.1);
    this.estimatedCost = tripTotal;
  }

};
export default Trip;