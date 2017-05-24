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
import { AppDashboardComponent } from './dashboard.component';
import { AppPageNotFoundComponent } from './notfound.component';
import { AppRegistrationComponent } from './registration.component';
import { AppAboutCitasComponent } from './about-citas.component';
import { AppNavPagesComponent } from './nav.pages.component';
import { AppAboutTeamComponent } from './about-team.component';
import { AppContactUsComponent } from './contact-us.component';
import { AppEditProfileComponent } from './edit-profile.component';

const appRoutes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'edit-profile', component: AppEditProfileComponent },
  { path: 'dashboard', component: AppDashboardComponent },
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
    AppDashboardComponent,
    AppHomeComponent,
    AppPageNotFoundComponent,
    AppRegistrationComponent,
    AppAboutCitasComponent,
    AppNavPagesComponent,
    AppAboutTeamComponent,
    AppContactUsComponent,
    AppEditProfileComponent
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
