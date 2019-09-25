export function initialize() {
  let application = arguments[1] || arguments[0];
  application.inject('route', 'notify', 'service:notify');
  application.inject('controller', 'notify', 'service:notify');
}

export default {
  name: 'inject-notify-service',
  initialize: initialize
};
