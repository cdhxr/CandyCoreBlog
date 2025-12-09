import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "CdCore's Blog",
  tagline: '这是标语',
  favicon: 'img/MyAvatar.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    experimental_faster: true, // Enable Docusaurus Faster
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://cdhxr.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/CandyCoreBlog/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cdhxr', // Usually your GitHub org/user name.
  projectName: 'CandyCoreBlog', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs/notes',
          sidebarPath: './sidebars.ts',
        },
        blog: {
          path: 'docs/blogs',
          routeBasePath: 'life',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    ['./src/plugins/webpack-alias.js', {}],
    ['./src/plugins/tailwind-config.js', {}],
    // Temporarily disabled due to sharp module issue
    // [
    //   'ideal-image',
    //   {
    //     quality: 70,
    //     max: 1030,
    //     min: 640,
    //     steps: 2,
    //     // Use false to debug, but it incurs huge perf costs
    //     disableInDev: true,
    //   },
    // ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'thoughts',
        path: 'docs/thoughts',
        routeBasePath: 'thoughts',
        sidebarPath: './sidebars.ts',
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
      title: "CdCore's Blog",
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
        { to: '/life', label: '随想', position: 'left' },
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
              to: '/docs/HTML渲染策略',
            },
            {
              label: '洞察',
              to: '/thoughts/RSC%20&%20Nextjs',
            },
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
              html: `<span>althorchxr@gmail.com</span>`,
            },
            {
              html: `<span>2816650923@qq.com</span>`,
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Created by CdCore`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexPages: true,
        docsRouteBasePath: ['/docs', '/thoughts'],
        hashed: true,
        language: ['en', 'zh'],
        highlightSearchTermsOnTargetPage: false,
        searchResultContextMaxLength: 50,
        searchResultLimits: 8,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      },
    ],
  ],
};

export default config;
