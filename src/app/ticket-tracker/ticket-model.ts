export interface TicketItem {
    number: number;
    order: number;
    colour: string;
    status: string;
    hide: boolean;
    people: number;
    queueStart: Date | null;
    sessionStart: Date | null;
    sessionEnd: Date | null;

  }