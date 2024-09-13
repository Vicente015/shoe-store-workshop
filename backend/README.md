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

### 1st part

 - Write a tests to cover the **happy path** of the checkout controller
   - *we have to be safe here, this brings the money to our simulated business*
   - don't forget to check: that an order is created, an email is sent 
 - Write a test for the **price validation**, a user cannot pay less than the expected price
 - Create a test builder (Laravel calls it "model factories") to refactor the tests and remove duplication

### 2nd part

 - Refactor the controller to inject the ApiClient
 - Why does it fail the tests now?
 - Create a service provider to enable the injection
 - Mock the ApiClient to speed-up tests
 - Update your tests or add a new one to check the payment is done correctly

### 3rd part

 - Add discount for registered users purchasing 1 item
 - Add discount for VIP users purchasing 1 item
  
### Extra

if times allows it

 - Create the remaining discount rules, from 1 to 4 products for each user type
 - Refactor and use parametrized tests to reduce duplication
