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
        {
          "type": "category",
          "label": "Inputs",
          "items": [
            "components/inputs/button",
            "components/inputs/button-group",
            "components/inputs/select",
            "components/inputs/text-field"
          ]
        },
        {
          "type": "category",
          "label": "Data Display",
          "items": [
            "components/data-display/accordion",
            "components/data-display/avatar",
            "components/data-display/badge",
            "components/data-display/card",
            "components/data-display/chip",
            "components/data-display/icon",
            "components/data-display/image-list",
            "components/data-display/list",
            "components/data-display/popover",
            "components/data-display/table",
            "components/data-display/tooltip"
          ]
        },
        {
          "type": "category",
          "label": "Feedback",
          "items": [
            "components/feedback/alert",
            "components/feedback/dialog",
            "components/feedback/modal",
            "components/feedback/notification",
            "components/feedback/progress",
            "components/feedback/skeleton",
            "components/feedback/snackbar",
            "components/feedback/spinner",
            "components/feedback/toast"
          ]
        },
        {
          "type": "category",
          "label": "Navigation",
          "items": [
            "components/navigation/drawer",
            "components/navigation/menu",
            "components/navigation/tabs"
          ]
        },
        {
          "type": "category",
          "label": "Layout",
          "items": [
            "components/layout/box",
            "components/layout/grid",
            "components/layout/stack"
          ]
        },
        {
          "type": "category",
          "label": "Typography",
          "items": [
            "components/typography"
          ]
        }
      ]
    }
  ]
};

export default sidebars;
