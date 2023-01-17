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
    testTraveler.addPastTrips(testTrips);
    testTraveler.addPendingTrips(testTrips);
    testTraveler.addUpcomingTrips(testTrips);
    testTraveler.calculateSpendInLastYear();
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

  it('should have properties to hold past, pending and upcoming trips', function() {
    expect(testTraveler).to.haveOwnProperty('pastTrips');
    expect(testTraveler).to.haveOwnProperty('pendingTrips');
    expect(testTraveler).to.haveOwnProperty('upcomingTrips');
  })

  it('should have a method for adding trips to pastTrips property', function() {
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

  it('should have a function to calculate amount spent in the last 365 days plus 10% fee', function() {
    expect(testTraveler.amountSpentInLastYear).to.equal(0);
  })

  it('should be able to calculate total spend in last year for any user', function() {
    testTraveler = new Traveler(travelers[2]);
    testTraveler.addPastTrips(testTrips);
    testTraveler.calculateSpendInLastYear();
    expect(testTraveler.amountSpentInLastYear).to.equal(4543);
  })

  it('should have a method to add pending trips to pendingTrips property', function() {
    expect(testTraveler.pendingTrips).to.deep.equal([
      {
      id: 1003,
      userID: 1,
      destinationID: 3,
      destinationDetails: {
        id: 3,
        destination: "Sydney, Austrailia",
        estimatedLodgingCostPerDay: 130,
        estimatedFlightCostPerPerson: 950,
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "opera house and city buildings on the water with boats"
        },
      travelers: 3,
      date: "2023/05/02",
      duration: 3,
      status: "pending",
      suggestedActivities: [ ],
      estimatedCost: 3564
      },
      {
      id: 1004,
      userID: 1,
      destinationID: 10,
      destinationDetails: {
        id: 10,
        destination: "Toronto, Canada",
        estimatedLodgingCostPerDay: 90,
        estimatedFlightCostPerPerson: 450,
        image: "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
        },
      travelers: 3,
      date: "2023/06/02",
      duration: 3,
      status: "pending",
      suggestedActivities: [ ],
      estimatedCost: 1782
      },
    ]);
  });

  it('should have a method to add upcoming trips to upcomingTrips property', function() {
    expect(testTraveler.upcomingTrips).to.deep.equal([
      {
      id: 1001,
      userID: 1,
      destinationID: 32,
      destinationDetails: {
        id: 32,
        destination: "Kathmandu, Nepal",
        estimatedLodgingCostPerDay: 45,
        estimatedFlightCostPerPerson: 1200,
        image: "https://images.unsplash.com/photo-1558799401-1dcba79834c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
        alt: "temple with buntings during daytime"
      },
      travelers: 3,
      date: "2023/03/02",
      duration: 3,
      status: "approved",
      suggestedActivities: [ ],
      estimatedCost: 4109,
      },
      {
      id: 1002,
      userID: 1,
      destinationID: 20,
      destinationDetails: {
        id: 20,
        destination: "Miami, Florida",
        estimatedLodgingCostPerDay: 158,
        estimatedFlightCostPerPerson: 275,
        image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
        alt: "sand with palm trees and tall buildings in the background"
        },
      travelers: 2,
      date: "2023/04/02",
      duration: 2,
      status: "approved",
      suggestedActivities: [ ],
      estimatedCost: 953,
      }
    ])
  })

});