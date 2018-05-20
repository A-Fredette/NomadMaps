
## Installing
This app can be accessed at without any installation: https://a-fredette.github.io/NomadMaps/

If you would like to download the app:
  1. Clone or downlaod the repository
  2. Using the command line, run 'npm install'
  3. Using the command line, run 'npm run start'

This should automatically launch a development server. If it does not, the app can be accessed at http://localhost:3000/ from your web browser.

Please note that Service Worker will only work in a production build of this project. To launch a production build, run npm build. A production build is also available at this URL: https://a-fredette.github.io/NomadMaps/

## Summary
The purpose of this app is to help nomads quickly become familiar with an area by quickly identifying all of the places that the user might be interested in. Read the guidelines below for instructions on how to use the app.

### Interest View
The app opens in 'interest view,' and initializes with three interests: Co Workings, Coffee Shops, and Gyms. 20 locations for each interest, ranked by Google prominence, will be marked on the map. Each marker will automatically get it's own distinct color, with a maximum of five interests. Interests can be removed by clicking on the minus icon. When a new interest is added, call down it's markers by clicking on the map marker icon. The 'Remove All Markers' button will remove all markers from the map and any associated places from the list view. After removing all markers, the marker icon next to each interest can be used to recreate markers for places that most closely match that interest. Please note that there can be difficulty getting places if the place's name uses characters that are not in the English alphabet (eg., Chinese Characters)

### List View
For each marker on the map, the name of the location will also be displayed in the 'List View,' accessed by clicking on the 'List' button. Deleting an interest will also remove the places associated with it from the list view. Click on the name of a place will open an InfoWindow above the marker for that place. Clicking on the name a second time will close that InfoWindow.

### The Map
There is a search bar at the top of the map that can be used to center the map. This search bar can accept an address or the name of a region, state, country, etc. Each time the map is re-centered, markers for all interests will be automatically created. There are also two 'theme' buttons 'Dark' and 'Light' that can be used to change the color of the map based. Clicking on a marker will open an InfoWindow above the marker. Each InfoWindow lists the name of the location. When available, the InfoWindow's will also hyperlink the name to a Foursquare entry, provide and image and the open hours for that day. Click on the marker a second time to close the InfoWindow. The map also has standard Google Map features enabled, including zoom and street view.

## Contributions
Pull requests and contributions to this repository are welcomed.

## Notes
This project makes use of the following libraries:
React [Create React App](https://github.com/facebookincubator/create-react-app).
Material Designs
Font Awesome
Google Map & Places API
Foursquare API


This project was developed as part of the requirements for Udactiy's Front End Nanodegree. It is intended to demonstrate a proficiency with React, javascript, responsive web design, ARIA / accessibility, offline-first development, asynchronous functions and use of third party APIs.
