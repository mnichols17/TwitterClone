# Mock Twitter Clone

### Features

- Front-end uses React with Redux & Hooks for state handling
- Back-end uses Express to act as a REST API for the client side. API interacts with a MongoDB Atlas DB using Mongoose. The API has 3 endpoints for getting different information:
  * /api/accounts for Accounts
  * /api/tweets for Tweets
  * /api/replies for Replies
- DB contains collection of user accounts, tweets & replies
- User passwords protected with salt and hashing using [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- Authentication for protected routes using [JWT](https://www.npmjs.com/package/jsonwebtoken)

### User Abilities
- Create/Delete an account
- Login/Logout
- Edit username
- Send tweets/replies
- Favorite tweets/replies
- Delete thier own tweets/replies

## Using the site
If you would like to use the site you need to do one of the following
- **Create an account:** You'll need to enter information in all the fields on the registration page. Although it asks for an email, it doesn't have to be a real one.
- **Use the guest account:** If you don't wish to create an account you can sign in with the guest account information. Username/email is guest/guest@gmail.com and the password is guest. You cannot delete the guest account so if you want to test that feature you'll need to create your own.
