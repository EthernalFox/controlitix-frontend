export type addPrefixToFields<Source, Prefix extends string> = {
    [Key in keyof Source as Key extends string ? `${Prefix}${Key}` : never]: Source[Key]
  }

export type BusEventsEmitters<EventsEmitters> = EventsEmitters & addPrefixToFields<EventsEmitters, 'before_'> & addPrefixToFields<EventsEmitters, 'after_'>

export type BusEventListener<ListenerParams = unknown> = (params: ListenerParams) => unknown

export interface BusEvent<ListenerParams> {
  listeners: BusEventListener<ListenerParams>[];
  status: Promise<unknown[]>;
}

export type BusEventsPool<EventsEmitters> = {
  [Key in keyof EventsEmitters]: BusEvent<EventsEmitters[Key]>
}

export type BusEventName<EventsEmitters> = keyof EventsEmitters & string