import * as React from 'react';

export type TextProps = {
  className?: string;
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view, tag, weight, children, color, maxLines }) => {
  const Tag = tag ? tag : 'p';
  const viewClass = view ? `view-${view}` : '';

  return (
    <Tag
      className={`${className} ${viewClass}`.trim()}
      style={{
        fontWeight: weight,
        color: color,
        ...(maxLines
          ? {
              display: '-webkit-box',
              WebkitLineClamp: maxLines,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }
          : {}),
      }}
    >
      {children}
    </Tag>
  );
};

export default React.memo(Text);
