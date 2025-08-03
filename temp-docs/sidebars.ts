import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/accordion',
        'components/alert',
        'components/button-group',
        'components/card',
        'components/image-list',
        'components/list',
        'components/notification',
        'components/popover',
        'components/progress',
        'components/skeleton',
        'components/snackbar',
        'components/spinner',
        'components/stack',
        'components/table',
        'components/tabs',
        'components/toast'
      ],
    }
  ]
};

export default sidebars;
