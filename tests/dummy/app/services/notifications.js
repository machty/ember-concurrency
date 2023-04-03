import Service from '@ember/service';
import { A } from '@ember/array';
import { later } from '@ember/runloop';

export default class NotificationsService extends Service {
  messages = A();

  notify(severity, message) {
    const logObject = { severity, message };
    this.messages.pushObject(logObject);

    later(() => {
      this.messages.removeObject(logObject);
    }, 8000);
  }

  info(message) {
    this.notify('info', message);
  }

  warning(message) {
    this.notify('warning', message);
  }
}
