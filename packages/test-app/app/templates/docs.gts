import { LinkTo } from '@ember/routing';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import GithubEdit from '../components/github-edit';
import NavHeader from '../components/nav-header';
import RouteTemplate from 'ember-route-template';

export const TABLE_OF_CONTENTS = [
  { route: 'docs.introduction', title: 'Home' },
  { route: 'docs.installation', title: 'Installation' },
  { route: 'docs.v4-upgrade', title: 'Upgrading to V4' },

  { section: 'Introduction' },
  { route: 'docs.tutorial.index', title: 'Writing Code Without Tasks' },
  { route: 'docs.tutorial.discussion', title: 'Post-Mortem' },
  { route: 'docs.tutorial.refactor', title: 'Refactoring With Tasks' },

  { section: 'Reference' },
  { route: 'docs.task-function-syntax', title: 'Defining Tasks' },
  { route: 'docs.task-concurrency', title: 'Task Modifiers' },
  { route: 'docs.cancelation', title: 'Cancellation' },
  { route: 'docs.error-vs-cancelation', title: 'Handling Errors' },
  { route: 'docs.child-tasks', title: 'Child Tasks' },
  { route: 'docs.derived-state', title: 'Derived State' },
  { route: 'docs.testing-debugging', title: 'Testing & Debugging' },
  { route: 'docs.typescript', title: 'TypeScript / Glint' },
  { route: 'docs.faq', title: 'FAQ & Fact Sheet' },

  { section: 'Advanced' },
  { route: 'docs.task-concurrency-advanced', title: 'Using maxConcurrency' },
  { route: 'docs.advanced.task-modifiers', title: 'Task Modifiers' },
  {
    route: 'docs.advanced.yieldables',
    title: 'Yieldables / Controlling Execution',
  },

  { section: 'Examples' },
  { route: 'docs.examples.loading-ui', title: 'Loading UI' },
  { route: 'docs.examples.autocomplete', title: 'Type-Ahead Search' },
  {
    route: 'docs.examples.increment-buttons',
    title: 'Accelerating Increment Buttons',
  },
  { route: 'docs.examples.ajax-throttling', title: 'AJAX Throttling' },
  { route: 'docs.examples.route-tasks', title: 'Route Tasks' },
];

export const FLATTENED_TABLE_OF_CONTENTS = TABLE_OF_CONTENTS.reduce(
  (flattened, entry) => {
    flattened.push(entry);
    if (entry.children) {
      flattened = flattened.concat(entry.children);
    }

    return flattened;
  },
  [],
);

class DocsRouteComponent extends Component {
  @service declare router: any;

  tableOfContents = TABLE_OF_CONTENTS;

  get currentIndex() {
    let contents = FLATTENED_TABLE_OF_CONTENTS,
      current = this.router.currentRouteName,
      bestMatch,
      entry;

    for (let i = 0; i < contents.length; i++) {
      entry = contents[i];
      if (
        entry.route &&
        new RegExp('^' + entry.route.replace(/\./g, '\\.')).test(current)
      ) {
        if (
          typeof bestMatch === 'undefined' ||
          contents[bestMatch].route.length < entry.route.length
        ) {
          bestMatch = i;
        }
      }
    }
    return bestMatch;
  }

  get nextTopic() {
    return this.findNext(+1);
  }

  get prevTopic() {
    return this.findNext(-1);
  }

  findNext(inc) {
    let currentIndex = this.currentIndex;
    if (typeof currentIndex === 'undefined') {
      return;
    }

    let contents = FLATTENED_TABLE_OF_CONTENTS;
    for (let i = currentIndex + inc; i >= 0 && i < contents.length; i += inc) {
      let value = contents[i];
      if (value.route) {
        return value;
      }
    }
  }

  <template>
    <div class='container'>
      <div class='docs row'>
        <div class='three columns'>
          <div class='side-menu'>
            {{#each this.tableOfContents as |entry|}}
              {{#if entry.section}}
                <div class='toc-section-title'>
                  {{entry.section}}
                </div>
              {{else}}
                <div class='toc-entry'>
                  {{#if entry.route}}
                    <LinkTo @route={{entry.route}}>{{entry.title}}</LinkTo>
                  {{else}}
                    {{entry.title}}
                  {{/if}}
                </div>

                {{#if entry.children}}
                  {{#each entry.children as |child|}}
                    <div class='toc-entry toc-subentry'>
                      <LinkTo @route={{child.route}}>{{child.title}}</LinkTo>
                    </div>
                  {{/each}}
                {{/if}}
              {{/if}}
            {{/each}}
          </div>
        </div>
        <div class='nine columns'>
          <NavHeader
            @nextTopic={{this.nextTopic}}
            @prevTopic={{this.prevTopic}}
          />
          <GithubEdit />

          {{outlet}}

          <br />
          <br />
          <br />
          <br />

          <NavHeader
            @nextTopic={{this.nextTopic}}
            @prevTopic={{this.prevTopic}}
          />
        </div>
      </div>
    </div>
  </template>
}

export default RouteTemplate(DocsRouteComponent);
