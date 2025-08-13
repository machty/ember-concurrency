import type Router from '@ember/routing/router';
import { service } from '@ember/service';
import Component from '@glimmer/component';

interface GithubEditSignature {
  Args: {};
}

export default class GithubEditComponent extends Component<GithubEditSignature> {
  @service declare router: Router;

  get href() {
    let path = this.router.currentRouteName;
    if (!path) {
      // `routing` doesn't exist for old ember versions via ember-try
      return '#';
    }
    path = path.replace(/\./g, '/');
    return `https://github.com/machty/ember-concurrency/edit/master/packages/test-app/app/${path}/template.hbs`;
  }

  <template>
    <a class='github-edit' href={{this.href}} title='Edit on GitHub'>
      <i class='icon-pencil'></i>
    </a>
  </template>
}
