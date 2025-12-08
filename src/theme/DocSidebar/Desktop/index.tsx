import React from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import type { Props } from '@theme/DocSidebar/Desktop';

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  return (
    <div
      className={clsx(
        // 响应式: min-width: 997px
        'lg:flex lg:flex-col lg:h-full',
        // padding-top 和 width 使用 Docusaurus 变量，需要 CSS
        'doc-sidebar',
        // Aceternity Style Background and Border
        'bg-neutral-50 dark:bg-neutral-900',
        'border-r border-neutral-200 dark:border-neutral-800',
        // hideOnScroll 时去掉 padding-top
        hideOnScroll && 'lg:pt-0',
        // hidden 状态
        isHidden && 'lg:opacity-0 lg:invisible',
      )}>
      {hideable && <CollapseButton onClick={onCollapse} />}
      {hideOnScroll && (
        <Logo
          tabIndex={-1}
          className={clsx(
            // 默认隐藏
            'hidden',
            // 响应式显示
            'lg:flex! lg:items-center',
            // 高度和 margin 使用 Docusaurus 变量
            'doc-sidebar-logo',
          )}
        />
      )}
      <Content path={path} sidebar={sidebar} />
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
