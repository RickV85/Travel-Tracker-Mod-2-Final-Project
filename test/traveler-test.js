import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler';
import travelers from '../test/travelers-test-data'
import trips from '../test/trips-test-data'
import destinations from '../test/destinations-test-data'


describe('Traveler', function() {
  let testTraveler = travelers[0];
  let testTrips = trips;
  let testDestinations = destinations;

  this.beforeEach(() => {
    testTraveler = new Traveler(testTraveler);
  });

  it('should instantiate new travelers', function() {
    expect(testTraveler).to.be.an.instanceof(Traveler);
  });

  it('should have an id property', function() {
    expect(testTraveler.id).to.equal(1);
  });

  it('should have a name property', function() {
    expect(testTraveler.name).to.equal("Ham Leadbeater");
  });

  it('should have a travelerType property', function() {
    expect(testTraveler.travelerType).to.equal("relaxer");
  });

  it('should have a pastTrips property', function() {
    expect(testTraveler.pastTrips).to.deep.equal([]);
  });

  it('should have a function to add past trips to pastTrips property', function() {
    testTraveler.addPastTrips(testTrips);
    expect(testTraveler.pastTrips).to.deep.equal(
      [
      {
        id: 117,
        userID: 1,
        destinationID: 28,
        travelers: 3,
        date: "2021/01/09",
        duration: 15,
        status: "approved",
        suggestedActivities: [ ]
        }
      ]
    );
  });

  it('should have properties for upcoming and pending trips', function() {
    expect(testTraveler.upcomingTrips).to.deep.equal([]);
    expect(testTraveler.pendingTrips).to.deep.equal([]);
  })

});