import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/lazy-panda-ui/__docusaurus/debug',
    component: ComponentCreator('/lazy-panda-ui/__docusaurus/debug', 'e24'),
    exact: true
  },
  {
    path: '/lazy-panda-ui/__docusaurus/debug/config',
    component: ComponentCreator('/lazy-panda-ui/__docusaurus/debug/config', 'ec8'),
    exact: true
  },
  {
    path: '/lazy-panda-ui/__docusaurus/debug/content',
    component: ComponentCreator('/lazy-panda-ui/__docusaurus/debug/content', 'aca'),
    exact: true
  },
  {
    path: '/lazy-panda-ui/__docusaurus/debug/globalData',
    component: ComponentCreator('/lazy-panda-ui/__docusaurus/debug/globalData', 'e63'),
    exact: true
  },
  {
    path: '/lazy-panda-ui/__docusaurus/debug/metadata',
    component: ComponentCreator('/lazy-panda-ui/__docusaurus/debug/metadata', '537'),
    exact: true
  },
  {
    path: '/lazy-panda-ui/__docusaurus/debug/registry',
    component: ComponentCreator('/lazy-panda-ui/__docusaurus/debug/registry', 'bc1'),
    exact: true
  },
  {
    path: '/lazy-panda-ui/__docusaurus/debug/routes',
    component: ComponentCreator('/lazy-panda-ui/__docusaurus/debug/routes', '05a'),
    exact: true
  },
  {
    path: '/lazy-panda-ui/docs',
    component: ComponentCreator('/lazy-panda-ui/docs', '846'),
    routes: [
      {
        path: '/lazy-panda-ui/docs',
        component: ComponentCreator('/lazy-panda-ui/docs', '2dc'),
        routes: [
          {
            path: '/lazy-panda-ui/docs',
            component: ComponentCreator('/lazy-panda-ui/docs', 'a7e'),
            routes: [
              {
                path: '/lazy-panda-ui/docs/getting-started',
                component: ComponentCreator('/lazy-panda-ui/docs/getting-started', '6b1'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
