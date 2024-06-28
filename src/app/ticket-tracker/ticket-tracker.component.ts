import { Component, OnInit, HostListener } from '@angular/core';
import { TicketItem } from './ticket-model';
import { Title } from '@angular/platform-browser';
import { CacheStorageService } from '../cache-storage.service';

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
  blueBlink: boolean = false;
  purpleBlink: boolean = false;
  marginConstant = 2
  invalid = false;
  noTickets = 26;
  errorMessage: string = '';
  successMessage: string = '';
  documentTitle = 'PicCho Ticket Manager'

  updateBlinkWrapper(sessionEnd: Date, colour: string) {
    var time = this.getMinuteDifference(sessionEnd);
    if (time===0) {

      if (colour==='blue') {
        this.documentTitle='🔵⚪'
        if (!this.blueBlink) {
          this.blueBlink = true
          this.sendNotification(`Blue room time limit has been reached!`)
        } 
        
      } else {
        this.documentTitle='🟣⚪' 
        if (!this.purpleBlink) {
          this.purpleBlink = true
          this.sendNotification(`Purple room time limit has been reached!`)
        }
        
      }
    } else {
      this.resetBlink(colour);
      this.documentTitle = 'PicCho Ticket Manager'
    }
    this.titleService.setTitle(this.documentTitle);
    return time
  }

  resetBlink(colour: string) {
    colour === 'blue' ? this.blueBlink = false : this.purpleBlink = false;
  }

  startConfirmationWrapper(number: number, colour: string) {
    var input = confirm(`DOUBLE CHECK: Do you want to start the session for Ticket ${number} ${colour}?`)
    if (input) {
      this.sessionStart(number, colour);
      if ('Notification' in window) {
        Notification.requestPermission();
      }
      return true
    } else {
      this.setErrorMessage('Start cancelled')
      return false
    }
  }



  dequeueConfirmationWrapper(number: number, colour: string) {
    var input = confirm(`DOUBLE CHECK: Do you want to dequeue Ticket ${number} ${colour}?`)
    if (input) {
      this.documentTitle = 'PicCho Ticket Manager'
      this.titleService.setTitle(this.documentTitle);
      this.dequeueTicket(number, colour);
      return true
    } else {
      this.setErrorMessage('Dequeue cancelled')
      return false
    }
  }

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
      {number: 0, name: null, order: 0,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 1, name: null, order: 1,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 2, name: null, order: 2,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 3, name: null, order: 3,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 4, name: null, order: 4,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 5, name: null, order: 5,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 6, name: null, order: 6,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 7, name: null, order: 7,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 8, name: null, order: 8,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 9, name: null, order: 9,colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 10, name: null, order: 10, colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 11, name: null, order: 11, colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 12, name: null, order: 12, colour: "blue", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 0, name: null, order: 0, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 1, name: null, order: 1, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 2, name: null, order: 2, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 3, name: null, order: 3, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 4, name: null, order: 4, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 5, name: null, order: 5, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 6, name: null, order: 6, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 7, name: null, order: 7, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 8, name: null, order: 8, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 9, name: null, order: 9, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 10, name: null, order: 10, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 11, name: null, order: 11, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null},
      {number: 12, name: null, order: 12, colour: "purple", status: "inactive", hide: false, people: 0, queueStart: null, promisedStart: null, sessionStart: null, sessionEnd:null}
    ]
    this.setSuccessMessage('All tickets have been reset')
  }

  inactiveFilter = {
    status: 'inactive'
  };

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
    if (isNaN(value)) {
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
    const name = prompt("What is the customer's name?");
    if (name === null) {
      this.setErrorMessage(`Ticket ${this.tickets[index].number} (${colour}) did not queue`)
    } else if (index !== -1) {
      this.tickets[index].status = 'queue';
      this.tickets[index].people = people;
      this.tickets[index].name = name;
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
    const diffInMilliseconds = Math.max(end.getTime() - start.getTime(),0);
    const diffInMinutes = Math.round(diffInMilliseconds / (1000 * 60));
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
    if (this.startConfirmationWrapper(0, colour)) {
      this.editPeople(0,colour,people)
      this.editSessionEnd(0, colour, this.getSessionTime(people));
      colour === 'blue' ? this.queueBluePeopleQuickVar=null : this.queuePurplePeopleQuickVar=null
      this.setSuccessMessage(`Customer's quick session (${colour}) has been started with ${people} people`)
    }
    
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

  editName(number:number, colour: string, name: string) {
    const index = this.tickets.findIndex(item => item.number === number && item.colour === colour);
    if (index !== -1) {
      this.tickets[index].name = name;
      this.tickets = this.tickets.map(obj => obj);
      this.setSuccessMessage(`Ticket ${number}'s (${colour}) name has been changed to ${name}`)
    } else {
      this.setErrorMessage(`Ticket ${number}'s (${colour}) name failed to change to ${name}`)
    }
  }

  editSessionEnd(number:number, colour: string, minutes: number) {
    const index = this.tickets.findIndex(item => item.number === number && item.colour === colour);
    if (index !== -1) {
      this.tickets[index].sessionEnd = this.addMinutes(minutes)
      this.tickets = this.tickets.map(obj => obj);
      this.setSuccessMessage(`Ticket ${number}'s (${colour}) session end changed to ${this.getAMPMTime(this.tickets[index].sessionEnd)}`)
    } else {
      this.setErrorMessage(`Ticket ${number}'s (${colour}) session end failed to change to ${this.getAMPMTime(this.tickets[index].sessionEnd)}`)
    } 
  }

  get24HourTime(date?:Date): string {
    !date ? date = new Date() : null;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  }

  getAMPMTime(date?:Date): string {
    !date ? date = new Date() : null;
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const newHours = hours % 12 === 0 ? 12 : hours % 12;
    const AMPM = hours >= 12 ? 'PM' : 'AM';
    return `${newHours.toString().padStart(2,'0')}:${minutes} ${AMPM}`;
  }

  dequeueTicket(number:number, colour: string) {
    const index = this.tickets.findIndex(item => item.number === number && item.colour === colour);
    if (index !== -1) {
      this.tickets[index].status = 'inactive';
      this.tickets[index].people = 0;
      this.tickets[index].name = null;
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

  constructor(private titleService: Title, private cacheStorage: CacheStorageService) { 
    
  }

  sendNotification(notiString: string) {
    if (Notification.permission === 'granted') {
      const notification = new Notification('PICCHO ALERT', {
        body: notiString,
        requireInteraction: true,
        icon: "/assets/icons/192x192.png"
        // Add more properties here if needed
      });
      // You can also add event listeners to the notification
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
      this.setSuccessMessage(notiString)
    } else {
      alert(`${notiString}\nPlease enable notifications to not miss the timer`);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.cacheStorage.saveData(this.tickets);
  }

  ngOnInit(): void {
    const cachedData = this.cacheStorage.loadData();
    if (cachedData.length > 0) {
      this.tickets = cachedData;
      console.log(cachedData)
      // this.resetTickets();
    } else {
      this.resetTickets();
    }
    
    setInterval(()=> { 
      this.tickets = this.tickets.map(obj => obj)
    }, 1000);
    
  }

}
