import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultiplicationComponent } from './multiplication/multiplication.component';
import { AdditionComponent } from './addition/addition.component';
import { SubtractionComponent } from './subtraction/subtraction.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/multiplication', pathMatch: 'full' },
  { path: 'multiplication', component: MultiplicationComponent },
  { path: 'addition', component: AdditionComponent },
  { path: 'subtraction', component: SubtractionComponent },
  { path: 'about', component: AboutComponent },
  //{ path: 'second-component', component: SecondComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
