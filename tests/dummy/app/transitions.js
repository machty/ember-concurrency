export default function() {
  this.transition(
    this.inHelper('liquid-bind'),
    this.toValue((newState, oldState) => {
      return newState.index > oldState.index;
    }),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}

