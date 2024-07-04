# weatherWebsite
Weather Comparison App
This is a web application that allows users to compare the weather conditions between two cities. The application uses JavaScript, HTML, CSS, and APIs to fetch and display the weather information.

Features
  *  Input two cities and their respective states to compare their weather.
  * Choose the temperature unit (Fahrenheit or Celsius).
  * Display weather information including temperature, humidity, and weather conditions.
  * User-friendly interface with styled elements.
Files
  * weather.html: The main HTML file containing the structure of the application.
  * weather.css: The CSS file for styling the application.
  * weather.js: The JavaScript file containing the functionality and API calls.
Setup
  1. Clone the repository to your local machine.
  2. Ensure you have an internet connection to fetch weather data from the APIs.
  3. Open weather.html in your web browser to use the application.
Usage
  1. Open the weather.html file in a web browser.
  2. Enter the names of two cities and their respective states.
  3. Choose the temperature unit (Fahrenheit or Celsius).
  4. Click the "Compare" button to fetch and display the weather information for both cities.
     
Code Overview

HTML (weather.html)
  * Contains the structure of the app including input fields for city names and states, radio buttons for temperature units, and a button to trigger the comparison.
  * Imports the weather.css and weather.js files for styling and functionality.

CSS (weather.css)
  * Styles the application with custom fonts, colors, and layout.
  * Uses classes and IDs to apply specific styles to different elements.

JavaScript (weather.js)
  * Adds event listeners to handle user interactions.
  * Fetches latitude and longitude for the cities using the geocoding API.
  * Retrieves weather data using the fetched coordinates and displays it in the app.
  * Handles error messages for missing inputs.
Dependencies
  * Google Fonts for custom fonts.
  * External APIs for geocoding and weather data.
