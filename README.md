# Citas V2 Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Setting Up for Development
To setup your development environment, do the following:
1. Install [NodeJS](https://nodejs.org/en/).
2. From the [Official Repository](https://gitlab.discs.ateneo.edu/Ayo/citasv2), clone the project to your computer.
3. Go to the cloned directory: `cd citasv2`
4. Install dependencies: `npm i`
5. Install Angular CLI globally: `npm i -g @angular/cli`
6. Run `ng serve` for a dev server.
7. Open your browser to `http://localhost:4200/` -- The app will automatically reload if you change any of the source files.

### Recommendations:
1. [VS Code](https://code.visualstudio.com/) for editing source code
2. [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html) for checking/debugging the web app

### Required Knowledge:
1. [TypeScript](https://www.typescriptlang.org/)
2. [Angular](https://angular.io/)
3. [Angular CLI](https://cli.angular.io/)
4. [Node](https://nodejs.org/en/)
5. [Leaflet](http://leafletjs.com/)
6. [jQuery](https://jquery.com/)
7. [HTTP](https://angular.io/guide/http)
8. [Bootstrap](http://getbootstrap.com/)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Components, Services, and Other Modules

This section lists the different parts of the app. Source files are in `src/app`

### Services

Service<br />Name| Files | Definition
--- | --- | ---
App Session Service | app.session.services.ts | Service for session handling and storing data
Citas API Service | citas.api.service.ts | Service for communication with the backend API

### Components

Component<br />Name | Files | Definition
--- | --- | ---
App Component | app.component.ts,<br /> app.component.html,<br /> app.component.css | The parent component of the app. 
About Citas | about.citas.component.ts,<br /> about.citas.component.html,<br /> about.citas.component.css| Displays content for the About page
About Events | about-events.component.ts,<br /> about-events.component.html,<br /> about-events.component.css | Displays content for the Events page 
About Research | about-research.component.ts,<br /> about-research.component.html,<br /> about-research.component.css | Displays content for the Research page 
About Team | about-team.component.ts,<br /> about-team.component.html,<br /> about-team.component.css | Displays content for the Team page 
About Trainings | about-trainings.component.ts,<br /> about-trainings.component.html,<br /> about-trainings.component.css | Displays content for the Trainings page 
About | about.component.ts,<br /> about.component.html,<br /> about.component.css | Displays content for the About CITAS page (when logged in)
Blank | blank.component.ts,<br /> blank.component.html,<br /> blank.component.css | Contains the Component that displays Lorem Ipsum 
Contact Us | contact-us.component.ts,<br /> contact-us.component.html,<br /> contact-us.component.css | Displays a web form for submitting messages to the admin
Dashboard | dashboard.component.ts,<br /> dashboard.component.html,<br /> dashboard.component.css | The parent component for the user dashboard
Dashboard <br /> Farm Info | dashboard.farm-info.component.ts,<br /> dashboard.farm-info.component.html,<br /> dashboard.farm-info.component.css | Displays information of farm in the dashboard
Dashboard <br /> Farms | dashboard.farms.component.ts,<br /> dashboard.farms.component.html,<br /> dashboard.farms.component.css | Lists all the first three farms and a link to view all farms
Dashboard <br /> Plant Health | dashboard.plant-health.component.ts,<br /> dashboard.plant-health.component.html,<br /> dashboard.plant-health.component.css | Displays a historical bar chart of plant health 
Dashboard <br /> Plants | dashboard.plants.component.ts,<br /> dashboard.plants.component.html,<br /> dashboard.plants.component.css | Display a summary of plants' health
Dashboard <br /> Sensors | dashboard.sensors.component.ts,<br /> dashboard.sensors.component.html,<br /> dashboard.sensors.component.css | Displays a summary of data from the sensors
Dashboard <br /> Sidebar | dashboard.sidebar.component.ts,<br /> dashboard.sidebar.component.html,<br /> dashboard.sidebar.component.css | Handles navigation in the sidebar (when logged in)
Datasets<br />Plant Images | datasets.plant-images.component.ts,<br /> datasets.plant-images.component.html,<br /> datasets.plant-images.component.css | Parent component for the Collected Plant Images page
Datasets<br />Plant Images Gallery | datasets.plant-images.gallery.component.ts,<br /> datasets.plant-images.gallery.component.html,<br /> datasets.plant-images.gallery.component.css | Displays all available images for the plants
Datasets<br />Sensor Data | datasets.sensor-data.component.ts,<br /> datasets.sensor-data.component.html,<br /> datasets.sensor-data.component.css | Parent component for the Collected Sensor Data page
Datasets<br />Soil Data | datasets.soil-data.component.ts,<br /> datasets.soil-data.component.html,<br /> datasets.soil-data.component.css | Displays soil characteristics for the farm
Downloads | downloads.component.ts,<br /> downloads.component.html,<br /> downloads.component.css | Parent component for the downloads page
Downloads<br />Plant Data | downloads.plant-data.component.ts,<br /> downloads.plant-data.component.html,<br /> downloads.plant-data.component.css | Offers a set of filters for downloading plant images
Downloads<br />Sensor Data | downloads.sensor-data.component.ts,<br /> downloads.sensor-data.component.html,<br /> downloads.sensor-data.component.css | Offers a set of filters for downloading sensor data CSV
Edit Farm | edit-farm.component.ts,<br /> edit-farm.component.html,<br /> edit-farm.component.css | For farm owners, handles editing farm feature
Edit Profile | edit-farm.component.ts,<br /> edit-farm.component.html,<br /> edit-farm.component.css | For users, handles editing user information
Footer | footer.component.ts,<br /> footer.component.html,<br /> footer.component.css | Displays info an navigation in footer (when not logged in)
Header | header.component.ts,<br /> header.component.html,<br /> header.component.css | Displays header info in the home page (when not logged in)
Login | login.component.ts,<br /> login.component.html,<br /> login.component.css | Displays a modal with a form for submiting username and password for authentication
Login<br />Forgot Password | login.forgot-password.component.ts,<br /> login.forgot-password.component.html,<br /> login.forgot-password.component.css | Displays a modal with a form for submitting request to reset user password
Map Component | map.component.ts,<br /> map.component.html,<br /> map.component.css | All maps in the web app are handled by this component
Nav Component | nav.component.ts,<br /> nav.component.html,<br /> nav.component.css | Displays the nav bar (when not logged in)
Not Found | notfound.component.ts,<br /> notfound.component.html,<br /> notfound.component.css | Displays a 404 page when user tries to view someting not in app routes
Plant Analysis | plant-analysis.component.ts,<br /> plant-analysis.component.html,<br /> plant-analysis.component.css | Parent component for the Plant Analysis page
Plant Analysis<br />Plant Info | plant-analysis.plant-info.component.ts,<br /> plant-analysis.plant-info.component.html,<br /> plant-analysis.plant-info.component.css | Displays information on selected plant
Plant List | plant-list.component.ts,<br /> plant-list.component.html,<br /> plant-list.component.css | Displays controls for selecting a plant (search, map)
Register Farm | register-farm.component.ts,<br /> register-farm.component.html,<br /> register-farm.component.css | For farm owners, offers a wizard for adding a farm
Registration | registration.component.ts,<br /> registration.component.html,<br /> registration.component.css | Displays a form for user registration
Reset Password | reset-password.component.ts,<br /> reset-password.component.html,<br /> reset-password.component.css | Displays a modal with a form for resetting user password
Sensor Analysis | sensor-analysis.component.ts,<br /> sensor-analysis.component.html,<br /> sensor-analysis.component.css | Parent component for the Sensor Analysis page
Sensor Analysis<br />Sensor Info | sensor-analysis.sensor-info.component.ts,<br /> sensor-analysis.sensor-info.component.html,<br /> sensor-analysis.sensor-info.component.css | Displays information on selected sensor
Sensor List | sensor-list.component.ts,<br /> sensor-list.component.html,<br /> sensor-list.component.css | Displays controls for selecting a sensor (search, map)
Soil Info | soil-info.component.ts,<br /> soil-info.component.html,<br /> soil-info.component.css | Displays a table of collected soil characteristics
Terms | terms.component.ts,<br /> terms.component.html,<br /> terms.component.css | Displays a modal with the terms of using Citas V2
Total Analysis | total-analysis.component.ts,<br /> total-analysis.component.html,<br /> total-analysis.component.css | Displays a full map with the visualizations in the Total Analysis page
Update Events | update-events.component.ts,<br /> update-events.component.html,<br /> update-events.component.css | CMS page for updating Events List
Update Research | update-research.component.ts,<br /> update-research.component.html,<br /> update-research.component.css | CMS page for updating Research list
Update Team | update-team.component.ts,<br /> update-team.component.html,<br /> update-team.component.css | CMS page for updateing team members list
Update Training | update-training.component.ts,<br /> update-training.component.html,<br /> update-training.component.css | CMS page for updating trainings list
User<br />Nav | user.nav.component.ts,<br /> user.nav.component.html,<br /> user.nav.component.css | Displays the nav bar (when logged in)
View Farms | view-farms.component.ts,<br /> view-farms.component.html,<br /> view-farms.component.css | Displays all farms in a scrollable page
View Profile | view-profile.component.ts,<br /> view-profile.component.html,<br /> view-profile.component.css | Displays User info
Why Component | why.component.ts,<br /> why.component.html,<br /> why.component.css | Displays content on registration's Why Are We Asking link
[//]: App | app.component.ts,<br /> app.component.html,<br /> app.component.css | 

## Frequently Asked Questions

**_Q:_ How do I update the API Base URL?<br />**
_A:_ All the communication with the backend API are handled by the Angular Service: citas.api.service.ts. The API base URL is stored in a variable in this file.

**_Q:_ What are the third-party libraries used?<br />**
_A:_ A list of third-party libraries can be found (and should be updated everytime a new library is needed) in the meta file: .angular-cli.json. This file is used to gather all scripts used when the app is built.

## Running unit tests

The tests in this app will fail because they are not updated and contain out-of-the-box tests from Angular CLI.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

The tests in this app will fail because they are not updated and contain out-of-the-box tests from Angular CLI.

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
