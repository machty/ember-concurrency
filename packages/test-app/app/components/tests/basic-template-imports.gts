import type { TOC } from '@ember/component/template-only';

interface Signature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

export const BasicTemplateImports: TOC<Signature> = <template>
  <div>
    hello
  </div>
</template>;

export default BasicTemplateImports;
