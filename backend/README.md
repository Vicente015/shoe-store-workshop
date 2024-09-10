# Simple legacy backend application example

This is a simplified backend application which simulates the API for an online store.

The code is highly coupled, and it presents some challenges to be tested. We will use
this code on a workshop to show testing strategies.


## Running the project

Install dependencies and start the application and database

    make setup

Run the test suite

    make test

# Workshop steps

 - Write integration tests to cover at least the happy path of the checkout controller.
   - (we have to be safe here, this brings the money to our simulated business)
 - Make changes to controller to improve testing
   - extract payment gateway logic to a service
   - run tests and make sure everything is okay
   - replace payment gateway with a test collaborator
   - enjoy faster tests
