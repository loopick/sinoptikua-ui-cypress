import { getCurrentTimeHHMMSS } from './common';

export class Log {
  static msg(msg) {
    if (typeof msg !== 'string') {
      throw new Error(`Wrong '${msg}' argument passed. Use only 'string' data type. Cannot use Log.msg(${msg})`);
    } else {
      return cy.log(`**${msg.trim()} ${getCurrentTimeHHMMSS()}**`);
    }
  }
}
