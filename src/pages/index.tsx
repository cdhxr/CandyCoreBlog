import type { ReactNode } from 'react';
import { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { ArrowRight } from 'lucide-react';
// import { TypographicCard } from '../components/TypographicCard';
import { HandWrittenTitle } from '../components/ui/hand-writing-text';
// import lastHoliday from '../components/ui/content/lastHoliday';
// import docsIntro from '../components/ui/content/docsIntro';
// import thoughtsIntro from '../components/ui/content/thoughtsIntro';
import { Tiles } from '../components/ui/tiles';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [activeIndex, setActiveIndex] = useState(2);

  // ============================================
  // 数据定义
  // ============================================
  const accordionItems = [
    {
      id: 1,
      title: '技术笔记',
      src: useBaseUrl('/img/travel/Japan/kyoto.jpg'),
      link: useBaseUrl('/docs/HTML渲染策略'),
    },
    {
      id: 2,
      title: '洞察思考',
      src: useBaseUrl('/img/travel/Japan/osaka.jpg'),
      link: useBaseUrl('/thoughts/RSC%20&%20Nextjs'),
    },
    {
      id: 3,
      title: '随想杂记',
      src: useBaseUrl('/img/travel/Japan/city.jpg'),
      link: useBaseUrl('/life'),
    },
  ];

  const photos = [
    {
      src: useBaseUrl('/img/travel/Japan/kyoto.jpg'),
      alt: 'Kyoto',
      title: '京都',
    },
    {
      src: useBaseUrl('/img/travel/Japan/osaka.jpg'),
      alt: 'Osaka',
      title: '大阪',
    },
    {
      src: useBaseUrl('/img/travel/Japan/city.jpg'),
      alt: 'City',
      title: '城市',
    },
    {
      src: useBaseUrl('/img/travel/Japan/kumiko_bench.jpg'),
      alt: 'Kumiko Bench',
      title: '久美子长椅',
    },
    {
      src: useBaseUrl('/img/travel/Japan/dajishan.jpg'),
      alt: 'Dajishan',
      title: '大吉山',
    },
    {
      src: useBaseUrl('/img/travel/Japan/goods.jpg'),
      alt: 'Goods',
      title: '周边',
    },
  ];

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="记录技术成长、分享生活感悟、探索思维边界"
    >
      <main className="relative min-h-screen bg-background">
        {/* 背景 Tiles 层 */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Tiles rows={50} cols={8} tileSize="md" />
        </div>

        {/* ============================================ */}
        {/* Hero Section - 左文字右手风琴 */}
        {/* ============================================ */}
        <section className="relative z-10 overflow-hidden px-6 py-4 md:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* 左侧文字 */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <HandWrittenTitle
                  title={siteConfig.title}
                  subtitle="持续创作"
                />
                <div className="md:ml-36">
                  <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
                    记录生活、分享思考
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                    <Link
                      to="/docs/HTML渲染策略"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      开始阅读 <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/life"
                      className="inline-flex items-center gap-2 border border-border font-medium px-6 py-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      随想杂记
                    </Link>
                  </div>
                </div>
              </div>

              {/* 右侧手风琴 */}
              <div className="w-full md:w-1/2">
                <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
                  {accordionItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`relative h-[450px] rounded-2xl overflow-hidden cursor-pointer bg-muted transition-all duration-700 ease-in-out ${
                        index === activeIndex ? 'w-[400px]' : 'w-[60px]'
                      }`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => {
                        if (index === activeIndex) {
                          // 已经展开：再次点击则跳转
                          window.location.href = item.link;
                        } else {
                          // 未展开：先展开，不跳转（移动端首 tap 用于展开）
                          setActiveIndex(index);
                        }
                      }}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="absolute inset-0 z-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 z-10 dark:bg-black/20 bg-white/10 pointer-events-none" />
                      <span
                        className={`absolute z-20 text-white text-lg font-semibold whitespace-nowrap transition-all duration-300 ease-in-out ${
                          index === activeIndex
                            ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0'
                            : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* Content Cards Section - What's New */}
        {/* ============================================ */}
        {/* <section className="px-6 py-16 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-3 font-serif">What's New</h2>
              <p className="text-muted-foreground">探索最新的技术文档、生活记录和思考感悟</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <Link key={card.title} to={card.link} className="group block">
                  <div className="aspect-video w-full overflow-hidden rounded-xl mb-4">
                    <TypographicCard className="w-full h-full" mdContent={card.mdContent} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{card.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section> */}

        {/* ============================================ */}
        {/* Quote Section */}
        {/* ============================================ */}
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="rounded-2xl border bg-card p-8 sm:p-12">
              <blockquote className="text-xl font-medium italic text-foreground sm:text-2xl">
                "Life is a series of frames, each telling its own story."
              </blockquote>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* Photo Gallery Section - 生活片段 */}
        {/* ============================================ */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-12 mb-6">
            <h2 className="text-2xl font-bold text-foreground">生活片段</h2>
            <p className="text-muted-foreground mt-2">拍的一些照片</p>
          </div>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-6 px-6 lg:px-12 scrollbar-hide snap-x snap-mandatory">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="shrink-0 snap-start first:pl-0 last:pr-6"
                >
                  <div className="group relative w-64 md:w-80 aspect-4/3 overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium">{photo.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
