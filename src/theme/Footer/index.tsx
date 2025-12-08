import React, { type ReactNode } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';

function Footer(): ReactNode {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  const { copyright, links, logo, style } = footer;

  return (
    <FooterLayout
      style={style}
      // @ts-expect-error - 我们自定义了 FooterLayout 的 links prop 为数据类型
      links={links}
      logo={logo && <FooterLogo logo={logo} />}
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
  );
}

export default React.memo(Footer);
