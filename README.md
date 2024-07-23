# Shoe Store Workshop
## Overview
This workshop is designed to enhance your skills in web development by focusing on adding tests, refactoring code, and implementing new functionality using Test-Driven Development (TDD). The project we will be working on is a shoe store web page with specific business logic related to discounts based on user status and the number of shoes purchased.

![Home page Shoe store](/docs/docs-home.png)

### Workshop Structure
The workshop consists of the following key sections:

1. Adding End-to-End (E2E) Tests
2. Refactoring Code
3. Adding Unit Tests
4. Implementing Discount Functionality with TDD

#### 1. Adding End-to-End (E2E) Tests
In this section, you will learn how to add comprehensive E2E tests to the shoe store web page. E2E tests will ensure that the entire application is functioning correctly from the user's perspective, covering various user interactions and scenarios.

#### 2. Refactoring Code
The focus here is on separating business logic from presentation logic. This improves the maintainability and scalability of the codebase. You'll refactor the existing code to create a clear distinction between the business rules and the UI components.

#### 3. Adding Unit Tests
Once the code is refactored, you will add unit tests to validate the business logic. Unit tests will help ensure that individual components and functions behave as expected, making the code more reliable and easier to debug.

#### 4. Implementing Discount Functionality with TDD
In this final section, you will implement a new discount feature using TDD. This involves writing tests before the actual implementation to ensure that the feature meets all requirements and works correctly.

<hr />

### Shoe Store Business Logic
#### User Types and Discounts
The shoe store has different discount rules based on the user type and the number of shoes purchased:

##### 1. Non-Logged-In User

- Can select up to 4 shoes.
- No discount is applied regardless of the number of shoes purchased.

##### 2. Logged-In User
`user@codium.team:<what-ever>`

- 1 shoe = 2% discount
- 2 shoes = 5% discount
- 3 shoes = 10% discount
- 4 shoes = 10% discount

##### 3. VIP User
`vip@codium.team:<what-ever>`

- 1 shoe = 10% discount
- 2 shoes = 15% discount
- 3 shoes = 25% discount
- 4 shoes = 25% discount

### Requirements for Cart and Payment Pages
To implement the discount logic effectively, we need to add a discount block to both the [Cart](/docs/cart-page.png) and [Payment pages](/docs/payment-page.png). The discount should be calculated based on the user's status and the number of shoes selected.

### Cart Page

![Cart page Shoe store with discount](/docs/cart-page.png)

##### Display Items in Cart

- List all selected shoes ✅
- Show subtotal prices before discount ✅
- Show discount Block ❌
- Calculate and display the total price after applying the discount ❌

<hr />

**Discount Block**

- Non-Logged-In User: Display "0€ ".
- Logged-In User: Display the calculated discount in € (amount saved).
- VIP User: Display the calculated discount in € (amount saved).

### Payment Page

![Cart page Shoe store with discount](/docs/payment-page.png)

- Show card form ✅
- Show original prices before discount ✅
- Show discount Block ❌
- Calculate and display the total price after applying the discount ❌

<hr />

Happy coding!
