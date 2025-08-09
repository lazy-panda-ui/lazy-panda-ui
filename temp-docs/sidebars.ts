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
        "components/accordion",
        "components/alert",
        "components/appbar",
        "components/autocomplete",
        "components/avatar",
        "components/badge",
        "components/box",
        "components/button",
        "components/button-group",
        "components/card",
        "components/chip",
        "components/dialog",
        "components/drawer",
        "components/grid",
        "components/icon",
        "components/image-list",
        "components/list",
        "components/menu",
        "components/modal",
        "components/notification",
        "components/popover",
        "components/progress",
        "components/select",
        "components/skeleton",
        "components/snackbar",
        "components/spinner",
        "components/stack",
        "components/table",
        "components/tabs",
        "components/text-field",
        "components/toast",
        "components/tooltip",
        "components/typography"

      ]
    }
  ]
};

export default sidebars;
