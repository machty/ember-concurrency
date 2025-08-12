import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { service } from '@ember/service';

export const TABLE_OF_CONTENTS = [
  { route: 'docs.introduction', title: 'Home' },
  { route: 'docs.installation', title: 'Installation' },
  { route: 'docs.v4-upgrade', title: 'Upgrading to V4' },
  { route: 'docs.older-versions', title: 'Older Version Docs' },

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
  { route: 'docs.advanced.lifecycle-events', title: 'Lifecycle Events' },
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

export default class DocsController extends Controller {
  @service router;

  tableOfContents = TABLE_OF_CONTENTS;

  @computed('router.currentRouteName')
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

  @computed('currentIndex', 'flatContents')
  get nextTopic() {
    return this.findNext(+1);
  }

  @computed('currentIndex', 'flatContents')
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
}
