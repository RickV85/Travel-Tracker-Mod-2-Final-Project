import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler';
import travelers from '../test/travelers-test-data';
import trips from '../test/trips-test-data';
import destinations from '../test/destinations-test-data';


describe('Traveler', function() {
  let testTraveler;
  let testTrips;
  let testDestinations;

  this.beforeEach(() => {
    testTrips = trips;
    testDestinations = destinations;
    testTraveler = new Traveler(travelers[0]);
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
    expect(testTraveler.pastTrips).to.deep.equal([
      {
      id: 117,
      userID: 1,
      destinationID: 28,
      destinationDetails: {
        id: 28,
        destination: "San Juan, Puerto Rico",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 900,
        image: "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
        alt: "white and brown concrete buildings near sea under white clouds during daytime"
        },
      travelers: 3,
      date: "2021/01/09",
      duration: 15,
      status: "approved",
      suggestedActivities: [ ],
      estimatedCost: 4125
      }
    ]);
  });

  it('should have a method to add past trips to pastTrips property', function() {
    testTraveler.addPastTrips(testTrips);
    expect(testTraveler.pastTrips).to.deep.equal(
      [
      {
        id: 117,
        userID: 1,
        destinationID: 28,
        destinationDetails: {
          id: 28,
          destination: "San Juan, Puerto Rico",
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 900,
          image: "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
          alt: "white and brown concrete buildings near sea under white clouds during daytime"
          },
        travelers: 3,
        date: "2021/01/09",
        duration: 15,
        status: "approved",
        suggestedActivities: [ ],
        estimatedCost: 4125
        }
      ]
    );
  });

  it('should have properties for upcoming and pending trips', function() {
    expect(testTraveler.upcomingTrips).to.deep.equal([]);
    expect(testTraveler.pendingTrips).to.deep.equal([]);
  })

  it('should have a function to calculate amount spent in the last 365 days plus 10% fee', function() {
    expect(testTraveler.amountSpentInLastYear).to.equal(0);
  })

  it('should be able to calculate total spend in last year for any user', function() {
    testTraveler = new Traveler(travelers[2]);
    expect(testTraveler.amountSpentInLastYear).to.equal(4543);
    testTraveler = new Traveler(travelers[1]);
    expect(testTraveler.amountSpentInLastYear).to.equal(0);
  })
});