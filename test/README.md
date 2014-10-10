#Mocha Tests

##Purpose

- To test API requests for my routes/endpoints (e.g. api/v1/experiments/:id)
- To test sending/retrieval of data to the DB (*mongodb*)

##Overview

The tests directory will contain [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) style testing. 

The tests are modular. Thus, each entity will have it's own JS file for tests.  One file (**express.spec.js**) will call all the of the other modules:

- **express.spec.js** calls the tests for each module
	- **study.spec.js** - all study route tests
	- **experiment.spec.js** - all experiment route tests
	- **patient.spec.js** - all patient route tests.
	

