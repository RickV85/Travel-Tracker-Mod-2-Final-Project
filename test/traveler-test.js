import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler';
import travelers from '../test/travelers-test-data'
import trips from '../test/trips-test-data'
import destinations from '../test/destinations-test-data'


describe('Traveler', function() {
  let testTraveler;
  let testTrips;
  let testDestinations;

  this.beforeEach(() => {
    testTrips = trips;
    testDestinations = destinations;
    testTraveler = new Traveler(travelers[0]);
    testTraveler.addPastTrips(testTrips);
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
    expect(testTraveler).to.haveOwnProperty('pastTrips');
  });

  it('should have a method to add past trips to pastTrips property', function() {
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
    expect(testTraveler).to.haveOwnProperty('upcomingTrips');
    expect(testTraveler).to.haveOwnProperty('pendingTrips');
  })

  it('should have a property for total amount spent on trips in the last 365 days', function() {
    expect(testTraveler).to.haveOwnProperty('amountSpentInLastYear');
  })

  it('should have a function to calculate amount spent in the last 365 days plus 10% fee', function() {
    testTraveler.calculateSpendInLastYear();
    expect(testTraveler.amountSpentInLastYear).to.equal(0);

    testTraveler.pastTrips = [
      {
      id: 117,
      userID: 1,
      destinationID: 28,
      travelers: 3,
      date: "2021/01/09",
      duration: 15,
      status: "approved",
      suggestedActivities: [ ]
      },
      {
      id: 118,
      userID: 1,
      destinationID: 1,
      travelers: 1,
      date: "2022/06/09",
      duration: 3,
      status: "approved",
      suggestedActivities: [ ]
      },
      {
      id: 119,
      userID: 1,
      destinationID: 2,
      travelers: 2,
      date: "2022/08/09",
      duration: 3,
      status: "approved",
      suggestedActivities: [ ]
      }
    ]

    testTraveler.calculateSpendInLastYear();
    expect(testTraveler.amountSpentInLastYear).to.equal(2717);
  })

  it('should be able to calculate total spend in last year for any user', function() {
    testTraveler = new Traveler(travelers[2]);
    testTraveler.addPastTrips(testTrips);
    testTraveler.calculateSpendInLastYear();
    expect(testTraveler.amountSpentInLastYear).to.equal(4543);
  })
});