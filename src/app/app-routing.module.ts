import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultiplicationComponent } from './multiplication/multiplication.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/multiplication', pathMatch: 'full' },
  { path: 'multiplication', component: MultiplicationComponent },
  { path: 'about', component: AboutComponent },
  //{ path: 'second-component', component: SecondComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
