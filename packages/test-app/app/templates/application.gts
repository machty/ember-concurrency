import { service } from '@ember/service';
import Component from '@glimmer/component';
import RouteTemplate from 'ember-route-template';
import config from 'test-app/config/environment';
const versionRegExp = /\d+[.]\d+[.]\d+(?:-(?:alpha|beta|rc)\.\d+)?/;
const { emberConcurrencyVersion } = config;

class ApplicationRouteComponent extends Component {
  @service declare notifications: any;

  addonVersion = emberConcurrencyVersion.match(versionRegExp)[0];

  <template>
    <div class='container navbar'>
      <div class='row'>
        <div class='ten columns'>
          <h3 style='float:left;' {{! template-lint-disable no-inline-styles }}>
            ember-concurrency

            <span
              style='font-size: 0.5em;'
              {{! template-lint-disable no-inline-styles }}
            >
              (v
              {{this.addonVersion}})
            </span>
          </h3>
        </div>
        <div class='one columns'>
          <div class='nav-bar-link-outer'>
            <a href='/api'>API</a>
          </div>
        </div>
        <div class='one columns'>
          <div class='nav-bar-link-outer'>
            <a
              href='https://github.com/machty/ember-concurrency'
              target='_blank'
              rel='noopener noreferrer'
            >GitHub</a>
          </div>
        </div>
      </div>
    </div>

    {{outlet}}

    <div class='notifications-container'>
      {{#each this.notifications.messages as |m|}}
        <div class='notification {{m.severity}}'>
          {{m.message}}
        </div>
      {{/each}}
    </div>
  </template>
}

export default RouteTemplate(ApplicationRouteComponent);
