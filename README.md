# CitasV2

A platform for remote data collection, data storage, and a data analysis framework that uses web, mobile, and cloud technologies for the detection and forecasting of plant diseases. 

The web platform is accessible to researchers who wish to acquire data gathered by the farmers and analyzed by the system.

## Soil Analysis

Soil parameters gathered from the field are plotted on a graph to show the trends over a given time period.

## Geospatial Analysis & Disease Mapping

The web platform visualizes the spread of Foc TR4 in the respective farm sites and analyze where the disease might spread to next.

## Plant Image Analysis

Images loaded into the system are processed and analyzed to see if the plants are infected with Foc TR4 or not.

-----------------

# For Developers...

After cloning the project with `git clone ...`, install dependencies with `npm install`. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

## Updating the API Base URL
All the communication with the backend API are handled by the Angular Service: citas.api.service.ts. The API base URL is stored in a variable in this file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
