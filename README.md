# How to get running:

* create a .env file with the following or similar properties:
```
API_URL=[BCS API URL]
LOGIN_PATH=login
ME_PATH=me
LOCAL_USERNAME=root
LOCAL_PASSWORD=root
LOCAL_DATABASE=board_tracker
LOCAL_PORT=8889
```

* make sure your node and yarn are up to date:
```
"node" = "^11.13.0",
"yarn" = "^1.15.2"
```

* create a database schema in mysql:
```mysql
CREATE DATABASE board_tracker;
```

* from the root folder install packages using yarn:
```
yarn
```

* from the root folder build site to run, **sometimes you need to run this twice**:
```
yarn build
```

* from the root folder run seeds to add some starter data to the page:
```
yarn seed
```

* from the root folder run server:
```
yarn start
```

## Currently working:

* use bcs login info to log in to the website at [http://localhost:8080/](http://localhost:8080/) deployed at [http://whiteboardtrack.herokuapp.com/](http://whiteboardtrack.herokuapp.com/)

* accept terms that your github picture and username might be shared.

* create a whiteboarding problem using MarkDown to style the question including the use of code snippets with three backtick (`) marks and your language of choice!

* look at existing whiteboarding problems that are currently available.

## Future development:

* use bcs info to allow students to answer whiteboarding problems publicly to everyone who uses the site, or privately within their class, or more privately with only their TAs/Instructors.

    * Allow anyone who has access to the student's answers to comment on the answer to provide feedback and growth.

* allow instructors and tas to keep track of a student's profile of what questions they have answered already.

* allow students to dive into problems at home and also keep track of what questions they've done themselves.