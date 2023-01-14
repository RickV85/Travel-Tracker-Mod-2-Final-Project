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
    }, trips);
  });

  it('should be an instance of Trip', function() {
    expect(newTrip).to.be.an.instanceOf(Trip);
  });

  it('should have properties of id, userID, destinationID, travelers, date, duration, status, suggestedActivities, and estimatedCost', function() {
    expect(newTrip.id).to.equal(18);
    expect(newTrip.userID).to.equal(1);
    expect(newTrip.destinationID).to.equal(32);
    expect(newTrip.travelers).to.equal(4);
    expect(newTrip.date).to.equal("2023/08/02");
    expect(newTrip.duration).to.equal(14);
    expect(newTrip.status).to.equal('pending');
    expect(newTrip.suggestedActivities).to.deep.equal([]);
    expect(newTrip.estimatedCost).to.equal(5973);
  });

  it('should have a method for estimating cost for the trip', function() {
    expect(newTrip.estimatedCost).to.equal(5973)
  });

  it('should have a method to add all destination details on instatiation', function() {
    expect(newTrip.destinationDetails).to.deep.equal(
      {
      id: 32,
      destination: "Kathmandu, Nepal",
      estimatedLodgingCostPerDay: 45,
      estimatedFlightCostPerPerson: 1200,
      image: "https://images.unsplash.com/photo-1558799401-1dcba79834c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      alt: "temple with buntings during daytime"
      }
    );
  });

});