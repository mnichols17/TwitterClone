# TwitterClone

### A mock clone of Twitter (currently a work in progress)

- Front-end uses React with Redux & Hooks for state handling

- Back-end uses Express to act as a REST API for the client side. API interacts with a MongoDB Atlas DB
  * /api/accounts for Accounts
  * /api/tweets for Tweets

- DB contains collection of user accounts and tweets

- User passwords protected with salt and hashing using [bcryptjs](https://www.npmjs.com/package/bcryptjs)

- Authentication for protected routes using [JWT](https://www.npmjs.com/package/jsonwebtoken)
