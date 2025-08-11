import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import CodeSnippet from './code-snippet';

interface CodeTemplateToggleSignature {
  Args: {
    codeSnippet1: string;
    codeSnippet2: string;
  };
}

export default class CodeTemplateToggle extends Component<CodeTemplateToggleSignature> {
  id = guidFor(this);
  @tracked showCodeSnippet1 = true;
  _toggleTimer = null;

  maxHeight = 0;
  resizeObserver: ResizeObserver | null = null;

  constructor(owner: unknown, args: CodeTemplateToggleSignature['Args']) {
    super(owner, args);

    // Use a micro-task to ensure DOM is ready
    Promise.resolve().then(() => {
      const element = document.getElementById(this.id);
      if (!element) {
        return;
      }

      const resizeObserver = this._createResizeObserver((maxHeight) => {
        const toggle = element.querySelector('.code-template-toggle');
        if (toggle) {
          (toggle as HTMLElement).style.height = `${maxHeight}px`;
        }
      });
      this.resizeObserver = resizeObserver;

      const sectionToggles = element.querySelectorAll(
        '.code-template-toggle-section',
      );

      sectionToggles.forEach((sectionToggle) => {
        resizeObserver.observe(sectionToggle);
      });
    });
  }

  willDestroy() {
    super.willDestroy();
    this.resizeObserver?.disconnect();
  }

  @action
  toggle() {
    this.showCodeSnippet1 = !this.showCodeSnippet1;
  }

  _createResizeObserver(onMaxHeightChange: (maxHeight: number) => void) {
    return new ResizeObserver((entries) => {
      const maxHeight = entries
        .map((entry) => entry.contentRect.height)
        .reduce((a, b) => Math.max(a, b));

      if (maxHeight > this.maxHeight) {
        this.maxHeight = maxHeight;
        onMaxHeightChange && onMaxHeightChange(maxHeight);
      }
    });
  }

  <template>
    <div id={{this.id}}>
      <div class='code-template-toggle'>
        <div
          class='code-template-toggle-section
            {{if this.showCodeSnippet1 "" "hidden"}}'
        >
          <CodeSnippet @name={{@codeSnippet1}} />
        </div>

        {{#if @codeSnippet2}}
          <div
            class='code-template-toggle-section
              {{if this.showCodeSnippet1 "hidden"}}'
          >
            <CodeSnippet @name={{@codeSnippet2}} />
          </div>

          <span
            role='button'
            class='button code-template-toggle-button'
            {{on 'click' this.toggle}}
          >
            Diff
          </span>
        {{/if}}
      </div>
    </div>
  </template>
}
