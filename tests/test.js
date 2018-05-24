const chai = require("chai");
const expect = chai.expect;
// import our getIndexPage function
const sinon = require("sinon");

const signUpPage = require("../api/controllers/user.js");
//SimonJS
/* 
Spies: Creates fake functions which we can use to track executions. This means we can tell/ find out whether the function has been executed/ how many times its been called etc. We can also use spies on existing functions and get the same capability, to track those functions executions. We'll see this in action a bit later.

Stubs: Enables us to replace functions. This gives us more control. We can return whatever we want or have our functions work in a way that suites us to be able to test multiple scenarios.

Mocks: They are fake methods, that have pre-programmed behavior and pre-programmed expectations.
*/

//Sign Up User Spy
describe("signUpUser", function() {
  it("should return a new signed user", function() {

    let req = {
        body: {
            email: "testemail@gmail.com",
            password: "test"
        }
    }
    // Have `res` have a send key with a function value coz we use `res.send()` in our func
    let res = {
      status: sinon.spy(),
      json: sinon.spy(),
      message : sinon.spy()
    }

    signUpPage.user_signup(req, res);
    // console.log(res.json
    console.log(res.message);

    // `res.send` called once
    // expect(res.json).to.be.true;

    // expect to get argument `bla` on first call
    // expect(res.json.firstCall.args[0]).to.equal("bla");
  });
});

