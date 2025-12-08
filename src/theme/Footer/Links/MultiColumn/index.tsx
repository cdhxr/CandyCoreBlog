import React, { type ReactNode, type FC } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import LinkItem from '@theme/Footer/LinkItem';
import type { Props } from '@theme/Footer/Links/MultiColumn';

type ColumnType = Props['columns'][number];
type ColumnItemType = ColumnType['items'][number];

const ColumnLinkItem: FC<{ item: ColumnItemType }> = ({ item }) => {
  return item.html ? (
    <li
      className={clsx('footer__item', item.className)}
      dangerouslySetInnerHTML={{ __html: item.html }}
    />
  ) : (
    <li className="footer__item">
      <LinkItem item={item} />
    </li>
  );
};

const Column: FC<{ column: ColumnType }> = ({ column }) => {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.footer.column,
        'col footer__col',
        column.className,
      )}>
      <div className="footer__title">{column.title}</div>
      <ul className="footer__items clean-list">
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default function FooterLinksMultiColumn({ columns }: Props): ReactNode {
  return (
    <div className="row footer__links">
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </div>
  );
}
