import React, { type ReactNode, type FC } from 'react';
import Link from '@docusaurus/Link';
import FooterLinkItem from '@theme/Footer/LinkItem';
import Tape from '@/components/ui/Tape';

// 定义 LinkItem 类型
type FooterLinkItemType = {
  label?: string;
  to?: string;
  href?: string;
  html?: string;
  prependBaseUrlToHref?: boolean;
  className?: string;
};

// 定义 ColumnItem 类型
type FooterColumnItem = {
  title: string;
  items: FooterLinkItemType[];
};

// 自定义 Props 类型，links 为数据类型
type CustomProps = {
  style?: 'dark' | 'light';
  links?: FooterColumnItem[] | FooterLinkItemType[];
  logo?: ReactNode;
  copyright?: ReactNode;
};

// 渲染单个链接项的组件
const LinkItemRenderer: FC<{ item: FooterLinkItemType }> = ({ item }) => {
  if (item.html) {
    return (
      <span
        className={item.className}
        dangerouslySetInnerHTML={{ __html: item.html }}
      />
    );
  }
  return <FooterLinkItem item={item} />;
};

// 判断是否为多列格式的辅助函数
function isMultiColumn(
  links: FooterColumnItem[] | FooterLinkItemType[] | undefined
): links is FooterColumnItem[] {
  if (!links || links.length === 0) return false;
  return 'items' in links[0] && 'title' in links[0];
}

// 获取指定列的链接项
function getColumnItems(
  links: FooterColumnItem[] | FooterLinkItemType[] | undefined,
  columnIndex: number
): FooterLinkItemType[] {
  if (!links) return [];
  if (isMultiColumn(links)) {
    return links[columnIndex]?.items || [];
  }
  return links as FooterLinkItemType[];
}

// 获取指定列的标题
function getColumnTitle(
  links: FooterColumnItem[] | FooterLinkItemType[] | undefined,
  columnIndex: number
): string | undefined {
  if (!links) return undefined;
  if (isMultiColumn(links)) {
    return links[columnIndex]?.title;
  }
  return undefined;
}

export default function FooterLayout({
  links,
  logo,
  copyright,
}: CustomProps): ReactNode {
  // 获取各列的数据
  const column0Title = getColumnTitle(links, 0) || 'Resources';
  const column0Items = getColumnItems(links, 0);
  const column1Title = getColumnTitle(links, 1) || 'Company';
  const column1Items = getColumnItems(links, 1);
  const column2Title = getColumnTitle(links, 2) || 'Compare';
  const column2Items = getColumnItems(links, 2);

  return (
    <footer className="my-8 max-w-5xl mx-auto">
      <div className="relative bg-card text-card-foreground rounded-3xl max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="hidden md:block absolute -top-4 -left-8 w-20 h-9 scale-75">
          <Tape />
        </div>
        <div className="hidden md:block absolute -top-4 -right-8 rotate-90 w-20 h-9 scale-75">
          <Tape />
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between  gap-4 md:gap-10 px-2 md:px-8 flex-1">
          <div className="flex flex-col items-start gap-2">
            <Link
              to="/"
              className="flex flex-row gap-1 items-center justify-start text-2xl font-display font-extrabold text-card-foreground"
            >
              StoryBoard
            </Link>
            <p className="text-muted-foreground font-medium text-base w-full md:w-4/5">
              这是我持续创作，记录生活，分享成长的一个小角落，谢谢你来到这里。
            </p>
          </div>
          {/* 第一列 - Resources / Docs */}
          <div className="flex flex-col md:mx-4 md:flex-row gap-2 md:gap-20 items-start md:items-start">
            <div className="flex flex-col gap-1 md:gap-4">
              <h4 className="uppercase font-display text-md text-muted-foreground font-semibold">
                {column0Title}
              </h4>
              <div className="flex flex-wrap md:flex-col gap-2 text-sm text-foreground items-start ">
                {column0Items.map((item, i) => (
                  <LinkItemRenderer key={i} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* 第二列 - Company / Contact Me */}
          <div className="hidden md:flex flex-col gap-1 md:gap-4">
            <h4 className="uppercase whitespace-nowrap font-display text-md text-muted-foreground font-semibold">
              {column1Title}
              {column1Items.length === 0 && (
                <span className="inline-flex  ml-1 py-0.5 px-3 bg-muted text-xs rounded-xl rotate-3">
                  soon
                </span>
              )}
            </h4>
            <div className="flex gap-2 flex-wrap md:flex-col text-sm text-foreground items-start ">
              {column1Items.map((item, i) => (
                <LinkItemRenderer key={i} item={item} />
              ))}
            </div>
          </div>

          {/* 第三列 - Compare / More */}
          <div className="hidden md:flex flex-col gap-4">
            <h4 className="uppercase whitespace-nowrap font-display text-md text-muted-foreground font-semibold">
              {column2Title}
              {column2Items.length === 0 && (
                <span className="inline-flex  ml-1 py-0.5 px-3 bg-muted text-xs rounded-xl rotate-3">
                  soon
                </span>
              )}
            </h4>
            <div className="flex flex-col gap-2 text-sm text-foreground items-start ">
              {column2Items.map((item, i) => (
                <LinkItemRenderer key={i} item={item} />
              ))}
            </div>
          </div>

          {(logo || copyright) && (
            <div className="absolute bottom-4 right-4 text-right text-xs text-muted-foreground">
              {logo && <div className="mb-1">{logo}</div>}
              {copyright}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
