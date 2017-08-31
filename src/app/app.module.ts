import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CookieModule } from 'ngx-cookie';
import { ChartModule } from 'angular2-highcharts/index';

import { AnalysisPipe } from './pipes/analysis.pipe';

import { AppComponent } from './app.component';
import { AppNavComponent } from './nav.component';
import { AppFooterComponent } from './footer.component';
import { AppLoginComponent } from './login.component';
import { AppLoginForgotPasswordComponent } from './login.forgot-password.component';
import { AppHeaderComponent } from './header.component';
import { AppHomeComponent } from './home.component';
import { AppPageNotFoundComponent } from './notfound.component';
import { AppRegistrationComponent } from './registration.component';
import { AppAboutCitasComponent } from './about-citas.component';
import { AppAboutTeamComponent } from './about-team.component';
import { AppAboutEventsComponent } from './about-events.component';
import { AppAboutResearchComponent} from './about-research.component';
import { AppAboutTrainingsComponent } from './about-trainings.component';
import { AppContactUsComponent } from './contact-us.component';
import { AppEditProfileComponent } from './edit-profile.component';
import { ViewProfileComponent } from './view-profile.component';
import { MapComponent } from './map.component';
import { AboutComponent } from './about.component';
import { AppResetPasswordComponent } from './reset-password.component';

import { UserNavComponent} from './user.nav.component';
import { AppDashboardComponent } from './dashboard.component';
import { DashboardFarmInfoComponent } from './dashboard.farm-info.component';
import { DashboardPlantsComponent } from './dashboard.plants.component';
import { DashboardSensorsComponent } from './dashboard.sensors.component';
import { DashboardFarmsComponent} from './dashboard.farms.component';
import { DashboardPlantHealthComponent } from './dashboard.plant-health.component';
import { DashboardSidebarComponent } from './dashboard.sidebar.component';

import { AppPlantAnalysisComponent } from './plant-analysis.component';
import { PlantAnalysisPlantInfoComponent } from './plant-analysis.plant-info.component';

import { AppSensorAnalysisComponent } from './sensor-analysis.component';
import { SensorAnalysisSensorInfoComponent } from './sensor-analysis.sensor-info.component';

import { AppTotalAnalysisComponent } from './total-analysis.component';

import { DatasetsPlantImagesComponent } from './datasets.plant-images.component';
import { DatasetsPlantImagesGalleryComponent } from './datasets.plant-images.gallery.component';
import { DatasetsSensorDataComponent } from './datasets.sensor-data.component';

import { DownloadsComponent } from './downloads.component';
import { DownloadSensorDataComponent } from './downloads.sensor-data.component';
import { DownloadPlantDataComponent } from './downloads.plant-data.component';

import { PlantListComponent } from './plant-list.component';
import { SensorListComponent } from './sensor-list.component';

import { EditFarmComponent } from './edit-farm.component';
import { RegisterFarmComponent } from './register-farm.component';
import { BlankComponent } from './blank.component';
import { ViewFarmsComponent } from './view-farms.component';

import { AppTermsComponent } from './terms.component';
import { AppWhyComponent } from './why.component';

const appRoutes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'blank', component: BlankComponent },
  { path: 'view-profile', component: ViewProfileComponent },
  { path: 'view-farms', component: ViewFarmsComponent },
  { path: 'dashboard', component: AppDashboardComponent },
  { path: 'plant-analysis', component: AppPlantAnalysisComponent },
  { path: 'sensor-analysis', component: AppSensorAnalysisComponent },
  { path: 'total-analysis', component: AppTotalAnalysisComponent },
  { path: 'plant-images', component: DatasetsPlantImagesComponent },
  { path: 'sensor-data', component: DatasetsSensorDataComponent },
  { path: 'registration', component: AppRegistrationComponent },
  { path: 'reset-password', component: AppResetPasswordComponent },
  { path: 'about-citas', component: AppAboutCitasComponent },
  { path: 'about-team', component: AppAboutTeamComponent },
  { path: 'about-events', component: AppAboutEventsComponent },
  { path: 'about-research', component: AppAboutResearchComponent },
  { path: 'about-trainings', component: AppAboutTrainingsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register-farm', component: RegisterFarmComponent },
  { path: 'contact-us', component: AppContactUsComponent },
  { path: 'downloads', component: DownloadsComponent },
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
    SensorAnalysisSensorInfoComponent,
    MapComponent,
    DashboardPlantHealthComponent,
    DashboardSidebarComponent,
    AppTotalAnalysisComponent,
    DatasetsPlantImagesComponent,
    DatasetsPlantImagesGalleryComponent,
    DatasetsSensorDataComponent,
    AboutComponent,
    DownloadsComponent,
    DownloadSensorDataComponent,
    DownloadPlantDataComponent,
    ViewProfileComponent,
    ViewFarmsComponent,
    AppLoginForgotPasswordComponent,
    AppResetPasswordComponent,
    PlantListComponent,
    SensorListComponent,
    AppAboutEventsComponent,
    AppAboutResearchComponent,
    AppAboutTrainingsComponent,
    AnalysisPipe,
    RegisterFarmComponent,
    BlankComponent,
    AppTermsComponent,
    AppWhyComponent,
    EditFarmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CookieModule.forRoot(),
    ChartModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
