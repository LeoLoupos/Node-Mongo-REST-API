# NodeJS Rest API with Express , MongoDB , JWT and multer

A simple NodeJS Rest API with Express , MongoDB , JWT and multer.

- The packages I use: 
  - bcrypt for password hashing
  - mongoose for MongoDB client
  - morgan for logging
  - body-parser and jsonwebtoken 
  - file and image uploading with multer
 
- The server has a custom CORS solution.

- The data model entities: User, Product, Order.
- I use uid reference to join the data structures and relate them. 


## Getting Started

 - git clone
 - Download Zip and unzip
 
### Prerequisites

What do you need installed ? 
  - Node 
  - MongoDB 
  - npm 

<<<<<<< HEAD
Search how to pass your process.env data , in your nodeJS server

=======
>>>>>>> 909bab43ebe47dcc73927eb52ccba7f12ecf879e
### Installing

 - Start your mongoDB by running: mongod.
```
> mongod
```

 - Then npm install within the project dir.

```
> npm install
```

 - Last, run the server , with npm start.

```
> npm start
```

## Next Patch (v1):

   - passport.js with jwt strategy
   - data validation with [Joi](https://www.npmjs.com/package/joi)
   - [Redis](https://www.npmjs.com/package/redis) middleware caching 
   - Security Issues as : CSRF - XSS - Http Headers with Helmet
   - Brute force Protection with [ratelimiter](https://www.npmjs.com/package/ratelimiter)
   - Errors with [Winston](https://www.npmjs.com/package/winston)
   - End to End tests , Unit testing , assertion test : [Mocha](https://www.npmjs.com/package/mocha) and [Chai](https://www.npmjs.com/package/chai)
  
## Authors

<<<<<<< HEAD
* **Leonidas Loupos** - *FullStack JS Developer* - [LeoLoupos](https://www.linkedin.com/in/leo-loupos/)
=======
* **Leonidas Loupos** - *CTO of QuickBee Web Technologies* - [LeoLoupos](https://github.com/LeoLoupos)
>>>>>>> 909bab43ebe47dcc73927eb52ccba7f12ecf879e

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

