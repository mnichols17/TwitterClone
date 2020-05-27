# TwitterClone

### A mock clone of Twitter (currently a work in progress)

- Front-end uses React with Redux & Hooks for state handling

- Back-end uses Express to act as a REST API for the client side. API interacts with a MongoDB Atlas DB

- DB contains collection of user accounts (later on "tweets" will be saved as well)

- User passwords protected with salt and hashing using [bcryptjs](https://www.npmjs.com/package/bcryptjs)

- Authentication for protected routes using [JWT](https://www.npmjs.com/package/jsonwebtoken)
