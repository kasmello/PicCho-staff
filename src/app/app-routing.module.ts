import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketTrackerComponent } from './ticket-tracker/ticket-tracker.component';

const routes: Routes = [
  { path: 'ticket-management', component: TicketTrackerComponent , title:'PicCho Ticket Manager'},
  { path: '', redirectTo: 'ticket-management', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
