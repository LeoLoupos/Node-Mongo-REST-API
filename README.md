# node-rest_jwt-mongo
node-rest_jwt-mongo
# NodeJS Rest API with Express , MongoDB , JWT

The data model entities: User, Product, Order and I use id reference to join the data structures. 

## Getting Started

 - git clone
 - Download Zip and unzip
 
### Prerequisites

What do you need installed ? 
  - Node 
  - MongoDB 
  - npm 

What things you need to install the software and how to install them

```
Give examples
```

### Installing

 - Start your mongoDB by running: mongod.
```
> mongod
```

 - Then npm install within the project dir.

```
npm install
```

 - Last, run the server , with npm start.

```
npm start
```

## Deployment

 - Next Patch (v1):
   - passport.js with jwt strategy
   - data validation with [Joi] {https://www.npmjs.com/package/joi}
   - [Redis] middleware caching {https://www.npmjs.com/package/redis}
   - Security Issues as : CSRF - XSS - Http Headers with Helmet
   - Brute force Protection with [ratelimiter] {https://www.npmjs.com/package/ratelimiter}
   - Errors with [Winston] {https://www.npmjs.com/package/winston}
   - End to End tests , Unit testing , assertion test : [Mocha] {https://www.npmjs.com/package/mocha} and [Chai] {https://www.npmjs.com/package/chai}
  
   

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
