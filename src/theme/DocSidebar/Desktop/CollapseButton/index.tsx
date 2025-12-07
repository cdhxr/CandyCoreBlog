import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import IconArrow from '@theme/Icon/Arrow';
import type { Props } from '@theme/DocSidebar/Desktop/CollapseButton';

export default function CollapseButton({ onClick }: Props): ReactNode {
  return (
    <button
      type="button"
      title={translate({
        id: 'theme.docs.sidebar.collapseButtonTitle',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      aria-label={translate({
        id: 'theme.docs.sidebar.collapseButtonAriaLabel',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      className={clsx(
        'button button--secondary button--outline',
        // 基础样式
        'hidden m-0',
        // 响应式: min-width: 997px (lg breakpoint)
        'lg:block! lg:sticky lg:bottom-0 lg:h-10 lg:rounded-none lg:border lg:border-solid',
        // hover/focus 通过 CSS 变量控制颜色
        'collapse-sidebar-button',
      )}
      onClick={onClick}>
      <IconArrow
        className={clsx(
          // 响应式旋转
          'lg:rotate-180 lg:mt-1',
          // RTL 支持需要在 CSS 中处理
          'collapse-sidebar-button-icon',
        )}
      />
    </button>
  );
}
