import { A } from '@ember/array';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type GeolocationService from '../services/geolocation';
import type StoreService from '../services/store';

// Re-export types for use by tutorial components
export type { FindStoresResult, StoreData } from '../services/store';

interface SharedTutorialSignature {
  Args: {};
  Blocks: {
    default: [];
  };
}

export default class SharedTutorialComponent extends Component<SharedTutorialSignature> {
  @service declare geolocation: GeolocationService;
  @service declare store: StoreService;

  logs = A();
  formData = {
    user: 'machty',
    amount: '9.99',
  };
  @tracked showTemplate = false;

  @action
  toggleTemplate() {
    this.showTemplate = !this.showTemplate;
  }

  <template>
    <div class='tutorial-example'>
      {{yield}}
      <span class='tutorial-example-label'>Example</span>
    </div>
  </template>
}
