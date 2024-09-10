# Simple legacy backend application example

This is a simplified backend application which simulates the API for an online store.

The code is highly coupled, and it presents some challenges to be tested. We will use
this code on a workshop to show testing strategies.


## Running the project

Install dependencies and start the application and database

    make setup

Run the test suite

    make test


## Try the endpoints

List products:

```
curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     http://localhost/api
```

Checkout a cart:
```
curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -X POST \
     http://localhost/api/checkout \
     --data '{"email": "user@codium.team", "price": 100, "products": ["example-product"]}'
```

# Workshop steps

 - Write integration tests to cover at least the happy path of the checkout controller.
   - (we have to be safe here, this brings the money to our simulated business)
 - Make changes to controller to improve testing
   - extract payment gateway logic to a service
   - run tests and make sure everything is okay
   - replace payment gateway with a test collaborator
   - enjoy faster tests
 - Write a self-validating test for the Payment API
   - before this, we would have to rely on checking the sandbox environment to see if payments where correct
 - Implement discounts for registered users following TDD
