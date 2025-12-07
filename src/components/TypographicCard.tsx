import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TypographicCardProps {
  className?: string;
  rawText?: string;
  /**
   * 如果你想直接传入 Markdown 内容（.md 文件的文本），可通过此 prop 传入。
   * 组件会做简单的去标记（strip）处理，提取纯文本用于竖排排版。
   */
  mdContent?: string;
}

export function TypographicCard({
  rawText,
  className,
  mdContent,
}: TypographicCardProps) {

  // 优先使用 mdContent（如果传入），其次使用 rawText，否则使用默认文本
  function stripMarkdown(md: string) {
    if (!md) return '';
    // 去掉代码块
    let s = md.replace(/```[\s\S]*?```/g, '');
    // 去掉行内代码标记
    s = s.replace(/`([^`]*)`/g, '$1');
    // 转换链接与图片为文本（保留中括号内文本）
    s = s.replace(/!\[.*?\]\(.*?\)/g, '');
    s = s.replace(/\[(.*?)\]\(.*?\)/g, '$1');
    // 去掉标题符号
    s = s.replace(/^#{1,6}\s*/gm, '');
    // 去掉引用符号
    s = s.replace(/^>\s*/gm, '');
    // 去掉粗体/斜体标记
    s = s.replace(/\*\*(.*?)\*\*/g, '$1');
    s = s.replace(/\*(.*?)\*/g, '$1');
    s = s.replace(/__(.*?)__/g, '$1');
    s = s.replace(/_(.*?)_/g, '$1');
    // 去掉多余的多空行
    s = s.replace(/\n{2,}/g, '\n');
    return s.trim();
  }

  const text = mdContent ? stripMarkdown(mdContent) : (rawText || `这是一个示例文本。`);
  const lines = text.split('\n').filter(line => line.trim() !== '');

  // 分离标题（最后一行）和正文（其他行）
  const titleLine = lines[lines.length - 1];
  const bodyLines = lines.slice(0, -1);

  return (
    <div className={cn(
      "relative w-full aspect-video bg-[#fcfcfc] text-[#0a0861]  overflow-hidden font-['Noto_Serif_SC',serif] shadow-xl select-none",
      className
    )}
      style={{ containerType: 'size' }}
    >
      {/* 电影黑边 - 顶部 */}
      <div className="absolute top-0 left-0 right-0 h-[8%] bg-black z-30"></div>

      {/* 电影黑边 - 底部 */}
      <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-black z-30"></div>

      {/* 
        主容器：占据右半边屏幕 (left-1/2)
        writing-mode: vertical-rl (垂直排版)
        flex-col-reverse: 在 vertical-rl 下，从左向右排列
        items-start: 文字从顶部开始对齐
      */}
      <div
        className="z-10 absolute top-[8%] bottom-[8%] left-[40%] right-0 flex flex-col-reverse flex-nowrap gap-[4cqw] justify-start items-start pl-[2cqw] pt-[16cqh]"
        style={{ writingMode: 'vertical-rl', transform: 'translateX(6cqw)' }}
      >
        {/* 标题：作为第一个元素，紧贴中线 */}
        <div
          className="tracking-[0.15em] leading-relaxed transition-all whitespace-nowrap font-medium opacity-100"
          style={{ fontSize: 'clamp(0rem, 6cqw, 3rem)' }}
        >
          {titleLine}
        </div>

        {/* 正文：依次向右排列 */}
        {bodyLines.map((line, index) => (
          <div
            key={index}
            className="tracking-widest leading-relaxed transition-all whitespace-nowrap font-light opacity-85"
            style={{ fontSize: 'clamp(0rem, 6cqw, 3rem)' }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* 底部倾斜灰色卡片 — 放在文字下层 */}
      <div
        className="absolute bottom-20 left-20 right-0 w-full h-full bg-[#f1f1f1] z-5"
        style={{
          transform: 'rotate(40deg)',
          opacity: 0.6,
        }}
      ></div>

      {/* 中心区域留空，四周高斯模糊的覆盖层（backdrop-filter + mask），避免模糊中心 */}
      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.15) 30%, black 75%)',
          maskImage:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.15) 30%, black 75%)'
        }}
      />

      {/* 装饰：模拟光影/暗角 */}
      <div className="absolute inset-0 bg-linear-to-br from-white/60 via-transparent to-black/15 pointer-events-none mix-blend-multiply z-20"></div>

      {/* 细微的噪点纹理 */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* 额外的渐晕效果 */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-black/10 pointer-events-none z-20"></div>
    </div>
  );
}