import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiplicationComponent } from './multiplication/multiplication.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { AdditionComponent } from './addition/addition.component';
import { SubtractionComponent } from './subtraction/subtraction.component'; // <--- JavaScript import from Angular

@NgModule({
  declarations: [
    AppComponent,
    MultiplicationComponent,
    AboutComponent,
    AdditionComponent,
    SubtractionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
