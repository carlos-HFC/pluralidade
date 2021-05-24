export interface ICreateEvent {
  title: string;
  description: string;
  date: string;
  initHour: string;
  endHour: string;
}

export interface IUpdateEvent extends Partial<ICreateEvent> { }