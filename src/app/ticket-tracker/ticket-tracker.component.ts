import { Component, OnInit } from '@angular/core';
import { TicketItem } from './ticket-model';

@Component({
  selector: 'app-ticket-tracker',
  templateUrl: './ticket-tracker.component.html',
  styleUrls: ['./ticket-tracker.component.css']
})
export class TicketTrackerComponent implements OnInit {
  unhidden: Record<string, number> = {blue: 12, purple: 12};
  tickets: TicketItem[] = [];
  inactiveBluePeopleVar: number;
  inactivePurplePeopleVar: number;
  queueBluePeopleQuickVar: number;
  queuePurplePeopleQuickVar: number;
  marginConstant = 2
  invalid = false;
  errorMessage: string = '';
  successMessage: string = '';

  shuffleDown(colour: string, order: number) {
    this.tickets = this.tickets.map(obj => {
      if (obj.colour === colour && obj.order > order) {
        obj.order--;
      }
      return obj
    })
  }


  resetTickets() {
    this.tickets = [
      {number: 0, order: 0,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 1, order: 1,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 2, order: 2,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 3, order: 3,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 4, order: 4,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 5, order: 5,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 6, order: 6,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 7, order: 7,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 8, order: 8,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 9, order: 9,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 10, order: 10, colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 11, order: 11, colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 12, order: 12, colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 0, order: 0, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 1, order: 1, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 2, order: 2, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 3, order: 3, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 4, order: 4, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 5, order: 5, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 6, order: 6, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 7, order: 7, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 8, order: 8, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 9, order: 9, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 10, order: 10, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 11, order: 11, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 12, order: 12, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null}
    ]
    this.setSuccessMessage('All tickets have been reset')
  }

  inactiveBlueFilter = {
    status: 'inactive',
    colour: 'blue',
    zeroFilter: true,
    hiddenFilter: true
  };

  inactiveBlueHiddenFilter = {
    status: 'inactive',
    colour: 'blue',
    zeroFilter: true,
    hiddenFilter: false
  }

  queueBlueFilter = {
    status: 'queue',
    colour: 'blue',
    zeroFilter: true,
    hiddenFilter: true
  };

  activeBlueFilter = {
    status: 'active',
    colour: 'blue',
    zeroFilter: false,
    hiddenFilter: true
  };

  inactivePurpleFilter = {
    status: 'inactive',
    colour: 'purple',
    zeroFilter: true,
    hiddenFilter: true
  };

  inactivePurpleHiddenFilter = {
    status: 'inactive',
    colour: 'purple',
    zeroFilter: true,
    hiddenFilter: false
  }

  queuePurpleFilter = {
    status: 'queue',
    colour: 'purple',
    zeroFilter: true,
    hiddenFilter: true
  };

  activePurpleFilter = {
    status: 'active',
    colour: 'purple',
    zeroFilter: false,
    hiddenFilter: true
  };

  setErrorMessage(error: string) {
    this.successMessage = '';
    this.errorMessage = error;
  }

  setSuccessMessage(success: string) {
    this.errorMessage = '';
    this.successMessage = success;
  }

  checkToProceed(value: number, min: number, max: number) {
    this.errorMessage='';
    if (!value) {
      this.setErrorMessage('ERROR: You must enter a number')
    } else if (value < min || value > max) {
      this.setErrorMessage(`ERROR: Number must be in between ${min} and ${max}`)
    }

  }

  toggleHideTicket(number:number, colour: string) {
    const index = this.tickets.findIndex(item => item.number === number && item.colour === colour);
    if (index !== -1) {
      this.tickets[index].hide = !this.tickets[index].hide;
      if (this.tickets[index].order === -1) {
        this.unhidden[colour]++;
        this.tickets[index].order = this.unhidden[colour];
        this.setSuccessMessage(`Ticket ${number} (${colour}) has been unhidden`)
      } else {
        this.shuffleDown(colour, this.tickets[index].order);
        this.tickets[index].order = -1;
        this.unhidden[colour]--;
        this.setSuccessMessage(`Ticket ${number} (${colour}) has been hidden`)
      }
      this.tickets = this.tickets.map(obj => obj);
    } else {
      this.setErrorMessage(`Ticket ${number} (${colour}) has failed to be hidden/unhidden`)
    }

  }
  
  resetInput(event: FocusEvent, input: any): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = input; // Clear the input field
  }

  queueTicket(colour: string, people: number) {
    const tempArr = this.tickets.filter(obj => !obj.hide && obj.colour===colour && obj.order>0 && obj.status==='inactive')
    const smallestOrder = tempArr.reduce((min, obj) => (obj.order < min ? obj.order : min), tempArr[0].order);
    const index = this.tickets.findIndex(item => item.order === smallestOrder && item.colour === colour);
    if (index !== -1) {
      this.tickets[index].status = 'queue';
      this.tickets[index].people = people;
      this.tickets[index].queueStart = new Date();
      this.tickets[index].promisedStart = this.addMinutes(this.getEstimatedWaitTime(this.tickets[index].number, colour),this.tickets[index].queueStart)
      this.tickets = this.tickets.map(obj => obj);
      colour==='blue' ? this.inactiveBluePeopleVar=null : this.inactivePurplePeopleVar=null;
      this.setSuccessMessage(`Ticket ${this.tickets[index].number} (${colour}) has been queued`)
    } else {
      this.setErrorMessage(`Ticket ${this.tickets[index].number} (${colour}) failed to queue`)
    }
    
    


  }

  getTotalWaitTime(colour: string) {
    const tempArr = this.tickets.filter(obj => obj.status!=='inactive' && obj.colour === colour)
    var totalTime = 0
    tempArr.forEach(obj => {
      if (obj.status==='active') {
        totalTime += this.marginConstant + Math.max(this.getMinuteDifference(obj.sessionEnd),0)
      } else {
        totalTime += this.getSessionTime(obj.people)+this.marginConstant
      }
    })
    return totalTime
  }

  getNewStartingTime(colour: string){
    return this.addMinutes(this.getTotalWaitTime(colour));
  }

  getSessionTime(people: number) {
    if (people <= 2) {
      return 12
    }
    return Math.min(12+2*(people-2),24);
  }

  getMinuteDifference(end?: Date, start?: Date) {
    !start ? start = new Date() : null;
    !end ? end = new Date() : null;
    const diffInMilliseconds = end.getTime() - start.getTime();
    const diffInMinutes = Math.ceil(diffInMilliseconds / (1000 * 60));
    return diffInMinutes;
  }

  addMinutes(time: number, date?: Date) {
    !date ? date=new Date() : null;
    var newDate = new Date()
    newDate.setMinutes(date.getMinutes()+time);
    return newDate
  }

  getEstimatedStartTime(number: number, colour: string) {
    const index = this.tickets.findIndex(item => item.number === number && item.colour === colour);
    if (index !== -1) {
      const estimatedTime = this.getEstimatedWaitTime(number, colour);
      var est = this.addMinutes(estimatedTime)
    }
    return est
  }

  getEstimatedWaitTime(number: number, colour: string) {
    const index = this.tickets.findIndex(item => item.number === number && item.colour === colour);
    if (index !== -1) {
      var totalTime = 0;
      this.tickets.forEach(obj => {
        if (obj.order < this.tickets[index].order && obj.colour===colour && obj.status === 'queue') {
          totalTime += this.marginConstant + this.getSessionTime(obj.people)
        } else if (obj.order < this.tickets[index].order && obj.colour===colour && obj.status === 'active') {
          totalTime += this.marginConstant + this.getMinuteDifference(obj.sessionEnd);
        }
      })
    }
    return totalTime;
  }

  sessionStart(number:number, colour: string) {
    const index = this.tickets.findIndex(item => item.number === number && item.colour === colour);
    if (index !== -1) {
      this.tickets[index].status = 'active';
      this.tickets[index].sessionStart = new Date();
      var end = this.addMinutes(this.getSessionTime(this.tickets[index].people));
      this.tickets[index].sessionEnd = end;
      this.tickets = this.tickets.map(obj => obj);
      this.setSuccessMessage(`Ticket ${number}'s (${colour}) session has been started`)
    } else {
      this.setErrorMessage(`Ticket ${number}'s (${colour}) session has failed to start`)
    }
  }

  quickSessionStart(colour: string, people: number) {
    this.sessionStart(0, colour);
    this.editPeople(0, colour, people);
    colour === 'blue' ? this.queueBluePeopleQuickVar=null : this.queuePurplePeopleQuickVar=null
    this.setSuccessMessage(`Customer's quick session (${colour}) has been started`)
  }

  editPeople(number:number, colour: string, people: number) {
    const index = this.tickets.findIndex(item => item.number === number && item.colour === colour);
    if (index !== -1) {
      this.tickets[index].people = people;
      this.tickets = this.tickets.map(obj => obj);
      this.setSuccessMessage(`Ticket ${number}'s (${colour}) people has been changed to ${people}`)
    } else {
      this.setErrorMessage(`Ticket ${number}'s (${colour}) people failed to change to ${people}`)
    }
  }

  editSessionEnd(number:number, colour: string, minutes: number) {
    const index = this.tickets.findIndex(item => item.number === number && item.colour === colour);
    if (index !== -1) {
      this.tickets[index].sessionEnd = this.addMinutes(minutes)
      this.tickets = this.tickets.map(obj => obj);
      this.setSuccessMessage(`Ticket ${number}'s (${colour}) session end changed to ${this.get24HourTime(this.tickets[index].sessionEnd)}`)
    } else {
      this.setErrorMessage(`Ticket ${number}'s (${colour}) session end failed to change to ${this.get24HourTime(this.tickets[index].sessionEnd)}`)
    } 
  }

  get24HourTime(date?:Date): string {
    !date ? date = new Date() : null;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  }

  dequeueTicket(number:number, colour: string) {
    const index = this.tickets.findIndex(item => item.number === number && item.colour === colour);
    if (index !== -1) {
      this.tickets[index].status = 'inactive';
      this.tickets[index].people = 0;
      this.tickets[index].queueStart = null;
      this.tickets[index].promisedStart = null;
      this.tickets[index].sessionStart = null;
      this.tickets[index].sessionEnd = null;
      if (number===0) {
        this.tickets[index].order = 0
      }
      else {
        this.shuffleDown(colour, this.tickets[index].order);
        this.tickets[index].order = this.unhidden[colour];
      }
      this.tickets = this.tickets.map(obj => obj);
      this.setSuccessMessage(`Ticket ${number} successfully dequeued`)
    } else {
      this.setErrorMessage(`Ticket ${number} failed to dequeue`)
    }
  }

  constructor() { 
    
  }


  ngOnInit(): void {
    this.resetTickets();
    setInterval(()=> { this.tickets = this.tickets.map(obj => obj)}, 1000);
    // this.toggleHideTicket(3,"purple");
    // this.toggleHideTicket(5,"purple");
    // this.toggleHideTicket(7,"purple");
    // this.queueTicket(1,"blue",3);
    // this.sessionStart(1,"blue");
    // this.queueTicket(2,"purple",10);
    // this.sessionStart(2,"purple");
    // this.dequeueTicket(2,"purple");
    // this.toggleHideTicket(3,"purple");
    // this.queueTicket(10,"purple",20);
    // this.queueTicket(2,"blue",2);
    // this.queueTicket(3,"blue",2);
    // this.getEstimatedStartTime(2,"blue");
    // console.log(this.getEstimatedStartTime(2,"blue"));
    // console.log(this.getEstimatedWaitTime(2,"blue"));
    // console.log(this.getEstimatedStartTime(3,"blue"));
    // console.log(this.getEstimatedWaitTime(3,"blue"));
    // this.quickSessionStart("purple",3);
    // this.dequeueTicket(0,"purple")

    // console.log(this.tickets)
  }

}
