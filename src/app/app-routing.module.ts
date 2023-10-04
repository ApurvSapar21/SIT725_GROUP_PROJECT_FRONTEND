import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarcodescanComponent } from './barcodescan/barcodescan.component';
import { UserallergiesComponent } from './userallergies/userallergies.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'userallergies', component: UserallergiesComponent },
  { path: 'barcodescan', component: BarcodescanComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to 'home' by default
  { path: '**', redirectTo: '/home' }, // Redirect to 'home' for any other unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }