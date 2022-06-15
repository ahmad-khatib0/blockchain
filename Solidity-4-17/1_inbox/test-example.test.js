// const assert = require("assert");
// const ganache = require("ganache-cli");
// const Web3 = require("web3");

// const web3 = new Web3(ganache.provider()); // attempt to connect to this local test network that
// // we are hosting on our machine solely for the purpose of running these tests in the future.
// // so this argument is going to change over time depending on what network we attempt to connect to .

// class Car {
//   park() {
//     return "parked";
//   }
//   drive() {
//     return "vroom";
//   }
// }

// let car;
// beforeEach(() => {
//   car = new Car();
// });

// // describe "Car" could be anything else
// describe("Car", () => {
//   it("it can park ", () => {
//     assert.equal(car.park(), "parked");
//   });
//   it("can drive ", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
