import Service from '@ember/service';
import { A } from '@ember/array';
import { later } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class NotificationsService extends Service {
  @tracked
  messages: any[] = [];

  notify(severity: any, message: any) {
    const logObject = { severity, message };
    this.messages = [...this.messages, logObject];

    later(() => {
      this.messages = this.messages.filter((m) => m !== logObject);
    }, 8000);
  }

  info(message: string) {
    this.notify('info', message);
  }

  warning(message: string) {
    this.notify('warning', message);
  }
}
