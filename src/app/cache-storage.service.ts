import { Injectable } from '@angular/core';
import { TicketItem } from './ticket-tracker/ticket-model';

@Injectable({
  providedIn: 'root'
})
export class CacheStorageService {

  private storageKey = 'ticketArray';

  constructor() { }

  saveData(data: TicketItem[]): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(this.storageKey, jsonData);
  }

  loadData(): TicketItem[] {
    const jsonData = localStorage.getItem(this.storageKey);
    if (jsonData) {
      return JSON.parse(jsonData, this.checkDataBeforeLoad) as TicketItem[];
    }
    return [];
  }

  checkDataBeforeLoad(key: string, value: any) {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    if (typeof value === 'string' && dateFormat.test(value)) {
      return new Date(value);
    }
    return value;
  }

  clearData(): void {
    localStorage.removeItem(this.storageKey);
  }
}
