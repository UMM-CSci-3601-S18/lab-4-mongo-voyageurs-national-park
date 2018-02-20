## Questions

1. :question: What do we do in the `Server` and `UserController` constructors
to set up our connection to the development database?
1. :question: How do we retrieve a user by ID in the `UserController.getUser(String)` method?
1. :question: How do we retrieve all the users with a given age 
in `UserController.getUsers(Map...)`? What's the role of `filterDoc` in that
method?
1. :question: What are these `Document` objects that we use in the `UserController`? 
Why and how are we using them?
1. :question: What does `UserControllerSpec.clearAndPopulateDb` do?
1. :question: What's being tested in `UserControllerSpec.getUsersWhoAre37()`?
How is that being tested?
1. :question: Follow the process for adding a new user. What role do `UserController` and 
`UserRequestHandler` play in the process?

## Your Team's Answers

1. The server gets the MongoDB named dev, then it passes that to the UserController, which looks for a collection in the database called users.

1. The getUser() method takes an id as a string for its argument and then it searches a database for an id that matches the id it was given. If there is a match, it returns the information of that user, else returns null because the id wasn't found.

1. The getusers method gets a map of parameters, and an if statement checks if age is a parameter, then it adds the age to the filterDoc, then Mongo uses the filterDoc to search for matches, and then it updates the collection with the matching users.

1. The document objects tell Mongo which keys to look for, and then finds the users with matching values for those keys. We need the keys because it reduces the likelihood of finding duplicated values inside of each user.

1. It gets the MongoDb, then it clears it and populates it with new data that you give it for testing. This lets you have a small database for testing, and you always know whats in the database.

1. It gets all the users that are age 37, then tests that only 2 were found, and that those two have the right names.

1. The userRequestHandler gets the information from the webpage and converts that information into integers and strings, then passes that information to the userController method addNewUser. The userController uses that information to create a document, and then sends that document to the database.
