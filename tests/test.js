const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const request = require("supertest");
const app = require('../app');

const bodyValidation = require("../api/middleware/body-validation");

//SimonJS
/* 

Spies: Creates fake functions which we can use to track executions. This means we can tell/ find out whether the function has been executed/ how many times its been called etc. We can also use spies on existing functions and get the same capability, to track those functions executions. We'll see this in action a bit later.

Stubs: Enables us to replace functions. This gives us more control. We can return whatever we want or have our functions work in a way that suites us to be able to test multiple scenarios.

Mocks: They are fake methods, that have pre-programmed behavior and pre-programmed expectations.

*/


// //Validation on Sign Up - User Spy
// describe("validateUser_signUpData", function() {
//   it("should return validated data", function() {

//     let req = {
//         body: {
//             email: "testemail@gmail.com",
//             password: "testes"
//         }
//     }

//     let res = {
//       // json: sinon.spy(),
//       next : sinon.spy()
//     }

//     bodyValidation.validateUser(req, res);

//     // console.log(res.json);
//     console.log(res.next);

//     // `res.send` called once
//     // expect(res.json).to.be.true;

//     // expect to get argument `bla` on first call
//     // expect(res.json.firstCall.args[0]).to.equal("bla");
//   });
// });

//Validation on Sign Up - User Spy
describe("validateUser_signUpData", function() {
  it("should return validated data", function() {
    request(app)
      .get('/')
      .expect(401, 'Auth failed', done);
  });
});


