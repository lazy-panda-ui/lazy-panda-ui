import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Lazy Panda UI',
  tagline: 'Modern React Native UI Components',
  favicon: 'img/favicon.ico',
  url: 'https://lazy-panda-ui.github.io',
  baseUrl: '/lazy-panda-ui/',
  organizationName: 'lazy-panda-ui',
  projectName: 'lazy-panda-ui',
  trailingSlash: true,
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',

  markdown: {
    format: 'detect',
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/lazy-panda-ui/lazy-panda-ui/tree/main/temp-docs/',
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
          ],
          remarkPlugins: [
            require('remark-gfm'),
          ],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Lazy Panda UI',
      logo: {
        alt: 'Lazy Panda UI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Components',
        },
        {
          href: 'https://github.com/lazy-panda-ui/lazy-panda-ui',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/lazy-panda-ui/lazy-panda-ui',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Lazy Panda UI. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
