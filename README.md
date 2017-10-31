# Citas V2 Frontend

Clone the project to your computer. Install dependencies with `npm install`.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Components, Services, and Other Modules

This section lists the different parts of the app.

### Services

Service Name| Files | Definition
--- | --- | ---
App Session Service | app.session.services.ts | Service for session handling and storing data
Citas API Service | citas.api.service.ts | Service for communication with the backend API

### Components

Component Name | Files | Definition
--- | --- | ---
App Component | app.component.ts<br /> app.component.html<br /> app.component.css | The parent component of the app. 
About Citas Component | about.citas.component.ts<br /> about.citas.component.html<br /> about.citas.component.css| Content for the About page (when not logged in) 
About Events Component | about-events.component.ts<br /> about-events.component.html<br /> about-events.component.css | Content for the Events page 
About Research Component | about-research.component.ts<br /> about-research.component.html<br /> about-research.component.css | Component for the Research page 
About Team Component | about-team.component.ts<br /> about-team.component.html<br /> about-team.component.css | Component for the Team page 
About Trainings Component | about-trainings.component.ts<br /> about-trainings.component.html<br /> about-trainings.component.css | Component for the Trainings page 
About Component | about.component.ts<br /> about.component.html<br /> about.component.css | Content for the About page (when not logged in) 
Blank Component | blank.component.ts<br /> blank.component.html<br /> blank.component.css | Contains the Component that displays Lorem Ipsum 
Contact Us Component | app.component.ts<br /> app.component.html<br /> app.component.css | 
App Component | app.component.ts<br /> app.component.html<br /> app.component.css | 
App Component | app.component.ts<br /> app.component.html<br /> app.component.css | 
App Component | app.component.ts<br /> app.component.html<br /> app.component.css | 
App Component | app.component.ts<br /> app.component.html<br /> app.component.css | 
App Component | app.component.ts<br /> app.component.html<br /> app.component.css | 
App Component | app.component.ts<br /> app.component.html<br /> app.component.css | 
App Component | app.component.ts<br /> app.component.html<br /> app.component.css | 
App Component | app.component.ts<br /> app.component.html<br /> app.component.css | 

## Frequently Asked Questions

_Q:_ How do I update the API Base URL? <br />
_A:_ All the communication with the backend API are handled by the Angular Service: citas.api.service.ts. The API base URL is stored in a variable in this file.

_Q:_ What are the third-party libraries used?<br />
_A:_ A list of third-party libraries can be found (and should be updated everytime a new library is needed) in the meta file: .angular-cli.json. This file is used to gather all scripts used when the app is built.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

The tests in this app will fail because they are not updated and contain out-of-the-box tests from Angular CLI.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
