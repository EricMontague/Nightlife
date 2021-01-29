# Nightlife

> Nightlife is a fully-responsive React application backed by Google Firestore, that allows users to plan their night out

<br>

![Image of Discover page](https://github.com/EricMontague/Nightlife/blob/master/Nightlife_Screenshot.png)

<br>

After spending some time learning server side development, I wanted to try something new and learn more about frontend development. After learning the fundamentals of Javascript and CSS, I decided to learn React because of its simple yet powerful model for building UI components. Also, since React is not a framework that comes with "batteries included" it forced me to implement features such as client side routing and form validation by myself, which was a great learning experience.


[Nightlife](https://nightlife-5dd44.web.app/) is a simple way for you to discover and manage the places that you plan to visit on a night out with friends. Core features include creating lists of places you would like to visit on a particular night and exploring potential places to visit using the Google Maps API. Application state is stored in Redux, user data is stored in Google Firestore, and the application is deployed on Google Firebase. The application is fully responsive and is built without using any CSS frameworks.


## Development
- First [install npm](https://www.npmjs.com/get-npm), if you don't already have it on your machine
- Next [sign up](https://console.firebase.google.com/) for Firebase and also register you application on [Google Cloud Platform](https://console.cloud.google.com/home)
- Then, in the root project directory, create a file named .env.development.local and add all of your environment variables to this file (see below)
- Then, install all dependencies and start the development server
- Note: the development server will be running at http://localhost:3000
- See this [stackoverflow post](https://stackoverflow.com/questions/52500573/where-can-i-find-my-firebase-apikey-and-authdomain) for where to find the Firebase environment variables and [Google's documentation](https://developers.google.com/places/web-service/get-api-key) for finding your GCP API key


`.env.development.local`

```sh
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DB_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGE_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_GCP_API_KEY=

```

### Running with npm
```sh
➜ git clone https://github.com/EricMontague/Nightlife.git
➜ cd Nightlife
➜ touch .env.development.local (add environment variables here)
➜ npm install
➜ npm start
```


## Technologies
- React
- Redux
- Google Maps API
- Google Places API
- Google Firestore
- Google Firebase
