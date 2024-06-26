export interface TicketItem {
    number: number;
    name : string | null;
    order: number;
    colour: string;
    status: string;
    hide: boolean;
    people: number;
    queueStart: Date | null;
    promisedStart: Date | null;
    sessionStart: Date | null;
    sessionEnd: Date | null;

  }