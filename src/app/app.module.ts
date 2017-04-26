import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppNavComponent } from './nav.component'
import { AppFooterComponent } from './footer.component'
import { AppLoginComponent } from './login.component'

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    AppFooterComponent,
    AppLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
