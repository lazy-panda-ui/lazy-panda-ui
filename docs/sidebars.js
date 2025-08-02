/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation', 'getting-started/usage'],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/accordion',
        'components/button',
        'components/button-group',
        'components/card',
        'components/image-list',
        'components/stack',
        'components/text-field',
      ],
    },
    {
      type: 'category',
      label: 'Customization',
      items: ['customization/theming'],
    },
  ],
};

module.exports = sidebars;
