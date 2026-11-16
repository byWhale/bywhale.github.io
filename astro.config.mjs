import { defineConfig } from 'astro/config';
import codeTheme from './src/lib/code-theme.mjs';

export default defineConfig({
  site: 'https://bywhale.github.io',
  markdown: {
    shikiConfig: { theme: codeTheme },
    remarkRehype: {
      footnoteLabel: '注释',
      footnoteBackLabel: '回到正文',
    },
  },
});
