import chai from "chai";
const expect = chai.expect;
import TravelerRepo from "../src/travelerRepo";
import travelers from "../test/travelers-test-data";
import trips from "./trips-test-data";

describe("TravelerRepo", function () {
  let testTravelers;
  let testRepo;
  let testTrips;

  beforeEach(() => {
    testTravelers = travelers;
    testTrips = trips;
    testRepo = new TravelerRepo(testTrips);
    testRepo.instatiateTravelers(testTravelers);
    testRepo.filterPendingTrips();
  });

  it("should create a new instance of TravlerRepo", function () {
    expect(testRepo).to.be.an.instanceOf(TravelerRepo);
  });

  it("should have a method to instantiate new Travelers for each object passed in", function () {
    expect(testRepo.travelers).to.deep.equal([
      {
        amountSpentInLastYear: 0,
        id: 1,
        name: "Ham Leadbeater",
        pastTrips: [
          {
            id: 117,
            userID: 1,
            destinationID: 28,
            destinationDetails: {
              id: 28,
              destination: "San Juan, Puerto Rico",
              estimatedLodgingCostPerDay: 70,
              estimatedFlightCostPerPerson: 900,
              image:
                "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
              alt: "white and brown concrete buildings near sea under white clouds during daytime",
            },
            travelers: 3,
            date: "2021/01/09",
            duration: 15,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 4125,
          },
        ],
        pendingTrips: [
          {
            id: 1003,
            userID: 1,
            destinationID: 3,
            destinationDetails: {
              id: 3,
              destination: "Sydney, Austrailia",
              estimatedLodgingCostPerDay: 130,
              estimatedFlightCostPerPerson: 950,
              image:
                "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
              alt: "opera house and city buildings on the water with boats",
            },
            travelers: 3,
            date: "2023/05/02",
            duration: 3,
            status: "pending",
            suggestedActivities: [],
            estimatedCost: 3564,
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
              image:
                "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80",
            },
            travelers: 3,
            date: "2023/06/02",
            duration: 3,
            status: "pending",
            suggestedActivities: [],
            estimatedCost: 1782,
          },
        ],
        travelerType: "relaxer",
        upcomingTrips: [
          {
            id: 1001,
            userID: 1,
            destinationID: 32,
            destinationDetails: {
              id: 32,
              destination: "Kathmandu, Nepal",
              estimatedLodgingCostPerDay: 45,
              estimatedFlightCostPerPerson: 1200,
              image:
                "https://images.unsplash.com/photo-1558799401-1dcba79834c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
              alt: "temple with buntings during daytime",
            },
            travelers: 3,
            date: "2023/03/02",
            duration: 3,
            status: "approved",
            suggestedActivities: [],
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
              image:
                "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
              alt: "sand with palm trees and tall buildings in the background",
            },
            travelers: 2,
            date: "2023/04/02",
            duration: 2,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 953,
          },
        ],
      },
      {
        amountSpentInLastYear: 2838,
        id: 2,
        name: "Rachael Vaughten",
        pastTrips: [
          {
            id: 100,
            userID: 2,
            destinationID: 6,
            destinationDetails: {
              id: 6,
              destination: "Jakarta, Indonesia",
              estimatedLodgingCostPerDay: 70,
              estimatedFlightCostPerPerson: 890,
              image:
                "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
              alt: "lit up city at night",
            },
            travelers: 6,
            date: "2020/3/28",
            duration: 10,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 6644,
          },
          {
            id: 116,
            userID: 2,
            destinationID: 7,
            destinationDetails: {
              id: 7,
              destination: "Paris, France",
              estimatedLodgingCostPerDay: 100,
              estimatedFlightCostPerPerson: 395,
              image:
                "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
              alt: "city during the day time with eiffel tower",
            },
            travelers: 3,
            date: "2020/04/03",
            duration: 8,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 2184,
          },
          {
            id: 166,
            userID: 2,
            destinationID: 7,
            destinationDetails: {
              id: 7,
              destination: "Paris, France",
              estimatedLodgingCostPerDay: 100,
              estimatedFlightCostPerPerson: 395,
              image:
                "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
              alt: "city during the day time with eiffel tower",
            },
            travelers: 2,
            date: "2020/03/05",
            duration: 6,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 1529,
          },
          {
            id: 177,
            userID: 2,
            destinationID: 20,
            destinationDetails: {
              id: 20,
              destination: "Miami, Florida",
              estimatedLodgingCostPerDay: 158,
              estimatedFlightCostPerPerson: 275,
              image:
                "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
              alt: "sand with palm trees and tall buildings in the background",
            },
            travelers: 6,
            date: "2020/01/29",
            duration: 8,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 3205,
          },
          {
            id: 1005,
            userID: 2,
            destinationID: 22,
            destinationDetails: {
              alt: "people standing inside a colosseum during the day",
              destination: "Rome, Italy",
              estimatedFlightCostPerPerson: 650,
              estimatedLodgingCostPerDay: 90,
              id: 22,
              image:
                "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            },
            travelers: 3,
            date: "2023/01/15",
            duration: 7,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 2838,
          },
        ],
        pendingTrips: [
          {
            id: 171,
            userID: 2,
            destinationID: 43,
            destinationDetails: {
              id: 43,
              destination: "Nassau, The Bahamas",
              estimatedLodgingCostPerDay: 550,
              estimatedFlightCostPerPerson: 90,
              image:
                "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1664&q=80",
              alt: "aerial photography of white and blue cruise ships during daytime",
            },
            travelers: 1,
            date: "2020/12/27",
            duration: 18,
            status: "pending",
            suggestedActivities: [],
            estimatedCost: 10989,
          },
        ],
        travelerType: "thrill-seeker",
        upcomingTrips: [],
      },
      {
        amountSpentInLastYear: 4543,
        id: 3,
        name: "Sibby Dawidowitsch",
        pastTrips: [
          {
            id: 3,
            userID: 3,
            destinationID: 22,
            destinationDetails: {
              id: 22,
              destination: "Rome, Italy",
              estimatedLodgingCostPerDay: 90,
              estimatedFlightCostPerPerson: 650,
              image:
                "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
              alt: "people standing inside a colosseum during the day",
            },
            travelers: 4,
            date: "2022/05/22",
            duration: 17,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 4543,
          },
          {
            id: 41,
            userID: 3,
            destinationID: 25,
            destinationDetails: {
              id: 25,
              destination: "New York, New York",
              estimatedLodgingCostPerDay: 175,
              estimatedFlightCostPerPerson: 200,
              image:
                "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
              alt: "people crossing the street during the day surrounded by tall buildings and advertisements",
            },
            travelers: 3,
            date: "2020/08/30",
            duration: 11,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 2778,
          },
          {
            id: 50,
            userID: 3,
            destinationID: 16,
            destinationDetails: {
              id: 16,
              destination: "Bangkok, Thailand",
              estimatedLodgingCostPerDay: 35,
              estimatedFlightCostPerPerson: 988,
              image:
                "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
              alt: "ornate buildings with a garden during the day",
            },
            travelers: 5,
            date: "2020/07/02",
            duration: 17,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 6089,
          },
          {
            id: 65,
            userID: 3,
            destinationID: 35,
            destinationDetails: {
              id: 35,
              destination: "Anchorage, Alaska",
              estimatedLodgingCostPerDay: 200,
              estimatedFlightCostPerPerson: 100,
              image:
                "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
              alt: "man riding on kayak surrounded by mountains",
            },
            travelers: 4,
            date: "2020/03/21",
            duration: 18,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 4400,
          },
          {
            id: 102,
            userID: 3,
            destinationID: 3,
            destinationDetails: {
              id: 3,
              destination: "Sydney, Austrailia",
              estimatedLodgingCostPerDay: 130,
              estimatedFlightCostPerPerson: 950,
              image:
                "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
              alt: "opera house and city buildings on the water with boats",
            },
            travelers: 3,
            date: "2020/09/26",
            duration: 8,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 4279,
          },
          {
            id: 121,
            userID: 3,
            destinationID: 44,
            destinationDetails: {
              id: 44,
              destination: "Caye Caulker, Belize",
              estimatedLodgingCostPerDay: 450,
              estimatedFlightCostPerPerson: 80,
              image:
                "https://images.unsplash.com/photo-1544525977-0a3bca9e560d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
              alt: "boat on dock during daytime",
            },
            travelers: 2,
            date: "2020/03/11",
            duration: 13,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 6611,
          },
          {
            id: 173,
            userID: 3,
            destinationID: 9,
            destinationDetails: {
              id: 9,
              destination: "Amsterdam, Netherlands",
              estimatedLodgingCostPerDay: 100,
              estimatedFlightCostPerPerson: 950,
              image:
                "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
              alt: "canal with boats and trees and buildings along the side",
            },
            travelers: 6,
            date: "2020/04/21",
            duration: 18,
            status: "approved",
            suggestedActivities: [],
            estimatedCost: 8250,
          },
        ],
        pendingTrips: [],
        travelerType: "shopper",
        upcomingTrips: [],
      },
    ]);
  });

  it("should have a method to return total income from all travelers it holds", function () {
    expect(testRepo.calculateTotalIncome()).to.equal(738);
  });

  it("should have a method to filter all pending trips and return them", function () {
    testRepo.filterPendingTrips();
    expect(testRepo.pendingTrips).to.deep.equal([
      {
        id: 171,
        userID: 2,
        destinationID: 43,
        destinationDetails: {
          id: 43,
          destination: "Nassau, The Bahamas",
          estimatedLodgingCostPerDay: 550,
          estimatedFlightCostPerPerson: 90,
          image:
            "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1664&q=80",
          alt: "aerial photography of white and blue cruise ships during daytime",
        },
        travelers: 1,
        date: "2020/12/27",
        duration: 18,
        status: "pending",
        suggestedActivities: [],
        estimatedCost: 10989,
      },
      {
        id: 1003,
        userID: 1,
        destinationID: 3,
        destinationDetails: {
          id: 3,
          destination: "Sydney, Austrailia",
          estimatedLodgingCostPerDay: 130,
          estimatedFlightCostPerPerson: 950,
          image:
            "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          alt: "opera house and city buildings on the water with boats",
        },
        travelers: 3,
        date: "2023/05/02",
        duration: 3,
        status: "pending",
        suggestedActivities: [],
        estimatedCost: 3564,
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
          image:
            "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80",
        },
        travelers: 3,
        date: "2023/06/02",
        duration: 3,
        status: "pending",
        suggestedActivities: [],
        estimatedCost: 1782,
      },
    ]);
  });

  it("should have a method to return how many travelers are currently on trips", function () {
    // This test relies on today's date and will fail in the future
    expect(testRepo.findNumTravelersOnTrips()).to.equal(1);
  });

  it("should have a method to find a user by name and return it", function () {
    expect(testRepo.findUserByName("Ham Leadbeater").name).to.deep.equal(
      "Ham Leadbeater"
    );
  });
});
