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

Depending on the speed at which the group advances some topics will not be hands-on (the ones marked as **_extra_**), instead
the trainer will solve these entries in front of the class while explaining everything.

To reduce friction with Laravel, you can use the [Cheat sheet](./CHEAT_SHEET.md)

### 1st part

 - Write a tests to cover the **happy path** of the checkout controller
   - *we have to be safe here, this brings the money to our simulated business*
   - don't forget to check:
     - the API response
     - **_extra_** that an order is created
     - **_extra_** an email is sent
 - **_extra_** Write a test for the **price validation**, a user cannot pay less than the expected price
 - **_extra_** Create a test builder (Laravel calls it "model factories") to refactor the tests and remove duplication

### 2nd part

The tests are running slow because we are using the production API client for the payment gateway, and it has slow responses.
We want to make changes to avoid contacting an external API while running tests, this makes our tests faster and more reliable, we can even run them offline.

 - Refactor the controller to inject the ApiClient
 - Mock the ApiClient to speed-up tests
 - Update your tests, check the payment is done correctly

 - **Demo time**, things that can go wrong:
   - What happens if we need to inject params to the api client?
     - show tests and production
     - create a service provider to enable the injection
   - mocked API chainable 

### 3rd part

 - Add discount for registered users purchasing 1 item
 - Add discount for VIP users purchasing 1 item
  
### Extra

if times allows it

 - Create the remaining discount rules, from 1 to 4 products for each user type
 - Refactor and use parametrized tests to reduce duplication
