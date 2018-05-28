const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const chaiJWT = require('chai-jwt');
chai.use(chaiJWT);

const request = require("supertest");

const app = require('../app');


/* 

Spies: Creates fake functions which we can use to track executions. This means we can tell/ find out whether the function has been executed/ how many times its been called etc. We can also use spies on existing functions and get the same capability, to track those functions executions. We'll see this in action a bit later.

Stubs: Enables us to replace functions. This gives us more control. We can return whatever we want or have our functions work in a way that suites us to be able to test multiple scenarios.

Mocks: They are fake methods, that have pre-programmed behavior and pre-programmed expectations.

*/


describe("checkProducts AuthPaths", function() {
  it("should return 401 not Authorized", function() {
      request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(401, {message: 'Auth failed'})
      .end(function(err, res) {
        if (err) throw err;
      });
  });
});

describe("checkOrders AuthPaths", function() {
  it("should return 401 not Authorized", function() {
    return request(app)
      .get('/orders')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(401, {message: 'Auth failed'});
  });
});


describe("checkSignUp", function() {

  it('it responds with 201 status on signUp',  (done) => {
    
    request(app)
      .post('/user/signup')
      .type('json')
      .send('{"email":"test2@gmail.com","password":"password"}')
      .expect(201)
      .end(function(err, res) {
          if (err) {
            return done(err);
          }

          console.log(res.body);
          done(res);
      });
  });
//   it("should return 201 and a new user", function(done) {

//        request(app)
//       .post('/user/signup')
//       .send({email: 'tester@gmail.com',password: '1234567890'})
//       // .send('email=tester@gmail.com;password=1234567890')
//       // .type('json')
//       //       .send('{"username":"bad","password":"wrong"}')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', 'application/json; charset=utf-8')
//       // .expect(function(res) {
//       //   res.body.message = 'User created'
//       // })
//       .expect(201, {message: 'User created'})
//       .catch((err) => {
//         console.log(err);
//         done();
//       });

//   });
});

describe("checkLogIn POST /user/login", function() {

  //CallBack Hell Approach
  it('it responds with 401 status code if bad username or password', function(done) {

    request(app)
        .post('/user/login')
        .type('json')
        .send('{"email":"bad","password":"wrong"}')
        .expect(422, {
          status: 'error',
          message: 'Invalid request data',
          data: {
            email: "bad",
            password: "wrong"
          }
        })
        .end(function(err, res) {
            if (err) return done(err);
            console.log(res.body);
            done();
        });
  });

  //Async Await approach
  it('it responds with 401 status code if bad username or password', async () => {

    var result = await request(app)
        .post('/user/login')
        .type('json')
        .send('{"email":"bad","password":"wrong"}')
        .expect(422, {
          status: 'error',
          message: 'Invalid request data',
          data: {
            email: "bad",
            password: "wrong"
          }
        })
      
      console.log(result.body); //expect on that result

  });

  //JWT 
  it('it returns JWT token if good username or password', function(done) {
    request(app)
        .post('/user/login')
        .type('json')
        .send('{"username":"test2@gmail.com","password":"password"}')
        .end(function(err, res) {
            if (err) {
              return done(err);
            }
            expect(res.body).have.property('token'); //expect().to.be.a.jwt

            done(res);
        });
  });

});

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