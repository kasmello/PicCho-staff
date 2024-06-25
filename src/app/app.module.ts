import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketTrackerComponent } from './ticket-tracker/ticket-tracker.component';
import { FilterTicketsPipe } from './filter-tickets.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TicketTrackerComponent,
    FilterTicketsPipe
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
