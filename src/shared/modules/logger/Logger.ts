/* eslint-disable no-console */

const Reset = '\x1b[0m';

const FgBlack = '\x1b[30m';
const FgWhite = '\x1b[37m';

const BgRed = '\x1b[41m';
const BgYellow = '\x1b[43m';
const BgWhite = '\x1b[47m';

export class Logger {
  private instanceName: string = '';

  constructor(instance?: (new () => unknown) | string) {
    if (instance) {
      this.instanceName =
        typeof instance === 'string' ? instance : instance.name;
    }
  }

  run(...params: unknown[]) {
    if (import.meta.env.VITE_DEBUG) {
      console.log(...params);
    }
  }

  log(...params: unknown[]) {
    this.run(
      `${BgWhite}${FgBlack}%s:${Reset} %s\n`,
      this.instanceName,
      ...params,
    );
  }

  warn(...params: unknown[]) {
    this.run(
      `${BgYellow}${FgBlack}%s:${Reset} %s\n`,
      this.instanceName,
      ...params,
    );
  }

  error(...params: unknown[]) {
    this.run(
      `${BgRed}${FgWhite}%s:${Reset} %s\n`,
      this.instanceName,
      ...params,
    );
  }
}
