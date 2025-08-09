import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

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
      "type": "doc",
      "label": "Getting Started",
      "id": "getting-started"
    },
    {
      "type": "category",
      "label": "Customization",
      "items": [
        "customization/theme"
      ]
    },
    {
      "type": "category",
      "label": "Components",
      "items": [
        "components/button",
        "components/button-group",
        "components/select",
        "components/text-field",
        "components/accordion",
        "components/avatar",
        "components/badge",
        "components/card",
        "components/chip",
        "components/icon",
        "components/image-list",
        "components/list",
        "components/popover",
        "components/table",
        "components/tooltip",
        "components/alert",
        "components/dialog",
        "components/modal",
        "components/notification",
        "components/progress",
        "components/skeleton",
        "components/snackbar",
        "components/spinner",
        "components/toast",
        "components/drawer",
        "components/menu",
        "components/tabs",
        "components/box",
        "components/grid",
        "components/stack",
        "components/typography"

      ]
    }
  ]
};

export default sidebars;
