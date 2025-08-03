/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  componentsSidebar: [
    'getting-started',
    {
      type: 'category',
      label: 'Components',
      items: [
        {
          type: 'category',
          label: 'Data Display',
          items: [
            'components/data-display/avatar',
            'components/data-display/badge',
            'components/data-display/chip',
            'components/data-display/icon',
            'components/data-display/popover',
            'components/data-display/table',
            'components/data-display/tooltip'
          ]
        },
        {
          type: 'category',
          label: 'Feedback',
          items: [
            'components/feedback/alert',
            'components/feedback/dialog',
            'components/feedback/modal',
            'components/feedback/notification',
            'components/feedback/progress',
            'components/feedback/skeleton',
            'components/feedback/spinner',
            'components/feedback/toast'
          ]
        },
        {
          type: 'category',
          label: 'Inputs',
          items: [
            'components/inputs/button',
            'components/inputs/checkbox',
            'components/inputs/radio',
            'components/inputs/select',
            'components/inputs/text-field'
          ]
        },
        {
          type: 'category',
          label: 'Layout',
          items: [
            'components/layout/box',
            'components/layout/grid',
            'components/layout/stack'
          ]
        },
        {
          type: 'category',
          label: 'Navigation',
          items: [
            'components/navigation/drawer',
            'components/navigation/menu',
            'components/navigation/tabs'
          ]
        },
        {
          type: 'category',
          label: 'Typography',
          items: [
            'components/typography'
          ]
        }
      ]
    }
  ],
};

export default sidebars;
