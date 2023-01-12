import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/trip';
import Traveler from '../src/traveler';
import travelers from '../test/travelers-test-data';
import trips from '../test/trips-test-data';
import destinations from '../test/destinations-test-data';

describe('Trip', function() {
  let newTrip;
  let destination;

  beforeEach(() => {
    newTrip = new Trip({
      'userID': 1,
      'destinationID': 32,
      'travelers': 4,
      'date': "2023/08/02",
      'duration': 14,
      'status': 'pending',
    });
  });

  it('should be an instance of Trip', function() {
    expect(newTrip).to.be.an.instanceOf(Trip);
  });

  it('should have properties of id, userID, destinationID, travelers, date, duration, status, suggestedActivities, and estimatedCost', function() {
    expect(newTrip.id).to.equal(new Date().toString());
    expect(newTrip.userID).to.equal(1);
    expect(newTrip.destinationID).to.equal(32);
    expect(newTrip.travelers).to.equal(4);
    expect(newTrip.date).to.equal("2023/08/02");
    expect(newTrip.duration).to.equal(14);
    expect(newTrip.status).to.equal('pending');
    expect(newTrip.suggestedActivities).to.deep.equal([]);
    expect(newTrip.estimatedCost).to.equal(null);
  });

  it('should have a method for estimating cost for the trip', function() {
    newTrip.calculateCost();
    expect(newTrip.estimatedCost).to.equal(5973)
  })

});