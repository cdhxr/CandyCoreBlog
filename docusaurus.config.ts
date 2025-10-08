import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'My StoryBoard',
  tagline: '这是标语',
  favicon: 'img/MyAvatar.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false, // 禁用默认博客
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'thoughts',
        path: 'thoughts',
        routeBasePath: 'thoughts',
        sidebarPath: './sidebars.ts',
        editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        /**
         * Required for any multi-instance plugin
         */
        id: 'life-blog',
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: 'life',
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: './life-blog',
        blogTitle: '随想',
        blogDescription: '记录日常生活的点点滴滴，分享生活中的感悟和体验',
        blogSidebarTitle: '随想',
        blogSidebarCount: 'ALL',
        showReadingTime: true,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
    colorMode: {
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "Chxr's StoryBoard",
      logo: {
        alt: 'My Site Logo',
        src: 'img/MyAvatar.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '笔记',
        },
        {
          type: 'docSidebar',
          sidebarId: 'thoughtsSidebar',
          docsPluginId: 'thoughts',
          position: 'left',
          label: '洞察',
        },
        {to: '/life', label: '随想', position: 'left'},
        {
          href: 'https://github.com/cdhxr',
          position: 'right',
          className: 'header-github-link',
        },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '笔记',
              to: '/docs/intro',
            },
            {
              label: '洞察',
              to: '/thoughts/intro',
            }
          ],
        },
        {
          title: 'Contact Me',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/cdhxr',
            },
            {
              label: 'biliblii',
              href: 'https://space.bilibili.com/244330808?spm_id_from=333.1007.0.0',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              html:`<span>althorchxr@gmail.com</span>`
            },
            {
              html:`<span>2816650923@qq.com</span>`
            }
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Created by Chxr`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    
  } satisfies Preset.ThemeConfig,
};

export default config;
