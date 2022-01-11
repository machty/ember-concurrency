import { modifier } from 'ember-modifier';

export default modifier(function autofocus(element) {
  const childElement = element.querySelector('input');
  childElement.focus();
});
