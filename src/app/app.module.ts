import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { AppNavComponent } from './nav.component';
import { AppFooterComponent } from './footer.component';
import { AppLoginComponent } from './login.component';
import { AppHeaderComponent } from './header.component';
import { AppHomeComponent } from './home.component';
import { AppPageNotFoundComponent } from './notfound.component';
import { AppRegistrationComponent } from './registration.component';
import { AppAboutCitasComponent } from './about-citas.component';
import { AppNavPagesComponent } from './nav.pages.component';
import { AppAboutTeamComponent } from './about-team.component';
import { AppContactUsComponent } from './contact-us.component';
import { AppEditProfileComponent } from './edit-profile.component';

import { UserNavComponent} from './user.nav.component';
import { AppDashboardComponent } from './dashboard.component';
import { DashboardFarmInfoComponent } from './dashboard.farm-info.component';
import { DashboardPlantsComponent } from './dashboard.plants.component';
import { DashboardSensorsComponent } from './dashboard.sensors.component';
import { DashboardFarmsComponent} from './dashboard.farms.component';

import { AppPlantAnalysisComponent } from './plant-analysis.component';
import { PlantAnalysisPlantInfoComponent } from './plant-analysis.plant-info.component';

import { AppSensorAnalysisComponent } from './sensor-analysis.component';
import { SensorAnalysisSensorInfoComponent } from './sensor-analysis.sensor-info.component';

const appRoutes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'edit-profile', component: AppEditProfileComponent },
  { path: 'dashboard', component: AppDashboardComponent },
  { path: 'plant-analysis', component: AppPlantAnalysisComponent },
  { path: 'sensor-analysis', component: AppSensorAnalysisComponent },
  { path: 'registration', component: AppRegistrationComponent },
  { path: 'about-citas', component: AppAboutCitasComponent },
  { path: 'about-team', component: AppAboutTeamComponent },
  { path: 'contact-us', component: AppContactUsComponent },
  { path: '**', component: AppPageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    AppFooterComponent,
    AppLoginComponent,
    AppHeaderComponent,
    AppHomeComponent,
    AppPageNotFoundComponent,
    AppRegistrationComponent,
    AppAboutCitasComponent,
    AppNavPagesComponent,
    AppAboutTeamComponent,
    AppContactUsComponent,
    AppEditProfileComponent,
    UserNavComponent,
    AppDashboardComponent,
    AppPlantAnalysisComponent,
    AppSensorAnalysisComponent,
    DashboardFarmInfoComponent,
    DashboardPlantsComponent,
    DashboardSensorsComponent,
    DashboardFarmsComponent,
    PlantAnalysisPlantInfoComponent,
    SensorAnalysisSensorInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CookieModule.forRoot()
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
