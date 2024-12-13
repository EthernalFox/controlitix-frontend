import { Logger } from '../logger';

import type {
  BusEventsEmitters,
  BusEventsPool,
  BusEventName,
  BusEventListener,
} from './Bus.types';

/**
 * @class
 * @classdesc Эмиттер событий
 */
export default class Bus<
  OriginalEmitters,
  EventsEmitters extends BusEventsEmitters<OriginalEmitters> = BusEventsEmitters<OriginalEmitters>,
> {
  /**
   * Список зарегистрированных событий
   */
  private eventsPool: BusEventsPool<EventsEmitters> = <
    BusEventsPool<EventsEmitters>
  >{};

  private LoggerInstance: Logger;

  constructor(LoggerInstance: Logger = new Logger(Bus)) {
    this.LoggerInstance = LoggerInstance;
  }

  /**
   * Получить статус выполнения emit
   *
   * @param {string} event Название события, статус которого необходимо получить
   */
  public async getEventStatus(
    event: BusEventName<EventsEmitters>,
  ): Promise<unknown[] | void> {
    return (await this.eventsPool[event]?.status) || Promise.resolve();
  }

  /**
   * Подписаться на событие
   *
   * @param {string} event Событие, на которое собираемся подписаться
   * @param {BusEventListener} listener Функция, которая выполнится, при наступлении события
   */
  public on<
    EventName extends BusEventName<EventsEmitters>,
    ListenerCallback extends BusEventListener<EventsEmitters[EventName]>,
  >(event: EventName, listener: ListenerCallback): void {
    if (!this.eventsPool[event]) {
      this.eventsPool[event] = {
        listeners: [],
        status: Promise.resolve([]),
      };
    }

    this.eventsPool[event].listeners.push(listener);
  }

  /**
   * Отписаться от события
   *
   * @param {string} event Событие, от которого собираемся отписаться
   * @param {?CallbackParamsType} listener Функция, которая больше не будет выполняться, при наступлении события
   */
  public off<
    EventName extends BusEventName<EventsEmitters>,
    ListenerCallback extends BusEventListener<EventsEmitters[EventName]>,
  >(event: EventName, listener: ListenerCallback): void {
    if (!this.eventsPool[event]) {
      return;
    }

    this.eventsPool[event].listeners = listener
      ? this.eventsPool[event].listeners.filter((item) => item !== listener)
      : [];
  }

  /**
   * Триггер события. Сначала выполняется событие before-{event} (при наличии подписчиков)
   *
   * @param {string} event Название события, которое триггерим
   * @param {...Object} params Параметры триггера
   * @returns {Promise|Promise[]} Набор промисов от всех действий
   */
  public async emit<
    EventName extends BusEventName<OriginalEmitters>,
    EmitParams extends OriginalEmitters[EventName],
  >(
    event: EventName,
    ...params: [EmitParams] extends undefined ? [undefined?] : [EmitParams]
  ): Promise<unknown[]> {
    this.LoggerInstance.log(event, ...params);

    return this.emitengine(event, <EventsEmitters[EventName]>params[0]);
  }

  private async emitengine<
    EventName extends BusEventName<EventsEmitters>,
    EmitParams extends EventsEmitters[EventName],
  >(event: EventName, params: EmitParams): Promise<unknown[]> {
    if (!this.eventsPool[event]) {
      return Promise.resolve([]);
    }

    this.eventsPool[event].status = (async () => {
      const results: unknown[] = [];

      if (!event.startsWith('before')) {
        results.push(
          ...(await this.emitengine(<EventName>`before-${event}`, params)),
        );
      }

      results.push(
        ...(await Promise.all(
          this.eventsPool[event].listeners.map((callback) => {
            const result = callback(params);

            return typeof (<Promise<unknown>>result)?.then === 'function'
              ? result
              : Promise.resolve(result);
          }),
        )),
      );

      if (!event.startsWith('after')) {
        results.push(
          ...(await this.emitengine(
            <BusEventName<EventsEmitters>>`after-${event}`,
            params,
          )),
        );
      }

      return results;
    })();

    return this.eventsPool[event].status;
  }
}
