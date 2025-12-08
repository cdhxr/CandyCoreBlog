/**
 * Tailwind config: include all source paths used by Docusaurus and project
 * so that production build不会错误地 purge 响应式类（如 md:, lg:）。
 */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,md,mdx,css}',
    './docs/**/*.{md,mdx}',
    './theme/**/*.{js,ts,jsx,tsx,md,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './*.html',
    './build/**/*.html',
  ],
  theme: {
    extend: {},
  },
  // 如果你在代码里动态生成类名（模板字符串 / 变量），请把常见模式加入 safelist
  safelist: [
    // 简单列出一些常见的响应式变体模式，确保 md:, lg: 等变体生成对应类
    {
      pattern: /^bg-(red|blue|green|gray|amber|purple)-\d{3}$/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    { pattern: /^prose(-.*)?$/, variants: ['sm', 'md', 'lg'] },
  ],
  plugins: [
    require('tailwindcss-animate'),
    // 支持自定义 variant 的示例（如果需要）
    plugin(function ({ addVariant }) {
      addVariant('data-theme-dark', '&[data-theme="dark"]');
    }),
  ],
};
