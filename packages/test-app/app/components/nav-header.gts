import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';

interface NavHeaderSignature {
  Args: {
    prevTopic?: { route: string; title: string };
    nextTopic?: { route: string; title: string };
  };
}

export default class NavHeaderComponent extends Component<NavHeaderSignature> {
  <template>
    <div class='row'>
      {{#if @prevTopic}}
        <p class='u-pull-left'>
          Previous:
          <LinkTo @route={{@prevTopic.route}}>{{@prevTopic.title}}</LinkTo>
        </p>
      {{/if}}

      {{#if @nextTopic}}
        <p class='u-pull-right'>
          Next:
          <LinkTo @route={{@nextTopic.route}}>{{@nextTopic.title}}</LinkTo>
        </p>
      {{/if}}
    </div>
  </template>
}
