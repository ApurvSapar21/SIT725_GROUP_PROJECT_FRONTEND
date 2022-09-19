import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarcodescanComponent } from './barcodescan/barcodescan.component';
import { UserallergiesComponent } from './userallergies/userallergies.component';

const routes: Routes = [
  { path: '', component: UserallergiesComponent },
  { path: 'userallergies', component: UserallergiesComponent },
  { path: 'barcodescan', component: BarcodescanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
