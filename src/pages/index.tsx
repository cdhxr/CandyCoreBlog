import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { BookOpen, Lightbulb, Pencil, ArrowRight } from 'lucide-react';
import { TypographicCard } from '../components/TypographicCard';
import { HandWrittenTitle } from '../components/ui/hand-writing-text';
import lastHoliday from '../content/lastHoliday';
import docsIntro from '../content/docsIntro';
import thoughtsIntro from '../content/thoughtsIntro';

function HeroSection() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <HandWrittenTitle
            title={siteConfig.title}
            subtitle="持续创作"
          />
          <div className="flex flex-wrap gap-6 justify-center">
            <Link to="/docs/intro" className="group inline-flex items-center text-base font-medium">
              <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                <ArrowRight className="h-4 w-4" />
              </span>
              开始阅读
            </Link>
            <Link to="/thoughts/intro" className="group inline-flex items-center text-base font-medium">
              <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                <ArrowRight className="h-4 w-4" />
              </span>
              随想杂记
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoGallerySection() {
  const photos = [
    { src: useBaseUrl('/img/travel/Japan/kyoto.jpg'), alt: 'Kyoto', title: '京都' },
    { src: useBaseUrl('/img/travel/Japan/osaka.jpg'), alt: 'Osaka', title: '大阪' },
    { src: useBaseUrl('/img/travel/Japan/city.jpg'), alt: 'City', title: '城市' },
    { src: useBaseUrl('/img/travel/Japan/kumiko_bench.jpg'), alt: 'Kumiko Bench', title: '久美子长椅' },
    { src: useBaseUrl('/img/travel/Japan/dajishan.jpg'), alt: 'Dajishan', title: '大吉山' },
    { src: useBaseUrl('/img/travel/Japan/goods.jpg'), alt: 'Goods', title: '周边' },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 mb-6">
        <h2 className="text-2xl font-bold text-foreground">生活片段</h2>
        <p className="text-muted-foreground mt-2">用镜头记录的那些瞬间</p>
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
  );
}

const features = [
  {
    icon: BookOpen,
    title: '技术笔记',
    description: '深入浅出的技术笔记，涵盖前端开发、编程语言等领域的学习心得。',
    link: '/docs/intro',
    linkText: '查看文档',
  },
  {
    icon: Lightbulb,
    title: '洞察思考',
    description: '关于技术、生活和成长的思考',
    link: '/thoughts/intro',
    linkText: '',
  },
  {
    icon: Pencil,
    title: '随想杂记',
    description: '日常生活的杂谈与记录，分享生活中的点滴感悟。、',
    link: '/life',
    linkText: '浏览随想',
  },
];

function FeaturesSection() {
  return (
    <section className="px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Section Title */}
          <div className="lg:col-span-1 pr-8">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">
              What's New
            </h2>
            <p className="text-muted-foreground mb-8">
              探索最新的技术文档、生活记录和思考感悟。
            </p>
            <Link to="/blog" className="inline-flex items-center text-sm font-medium hover:underline underline-offset-4">
              查看归档 <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {/* Content Grid */}
          <div className="lg:col-span-3">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Link key={feature.title} to={feature.link} className="group block">
                  <div className="aspect-video w-full overflow-hidden mb-4">
                    <div className="h-full w-full flex items-center justify-center transition-colors">
                      {(() => {
                        const mapping: Record<string, string> = {
                          '技术笔记': docsIntro,
                          '洞察思考': thoughtsIntro,
                          '随想杂记': lastHoliday,
                        };
                        const md = mapping[feature.title];
                        if (md) {
                          return (
                            <div className="w-full h-full">
                              <TypographicCard className="w-full h-full" mdContent={md} />
                            </div>
                          );
                        }
                        return <feature.icon className="h-12 w-12 text-muted-foreground/50 group-hover:text-primary transition-colors" />;
                      })()}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {feature.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="rounded-2xl border bg-card p-8 sm:p-12">
          <blockquote className="text-xl font-medium italic text-foreground sm:text-2xl">
            "Life is a series of frames, each telling its own story."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="记录技术成长、分享生活感悟、探索思维边界">
      <main className="min-h-screen bg-background">
        <HeroSection />
        <FeaturesSection />
        <QuoteSection />
        <PhotoGallerySection />
      </main>
    </Layout>
  );
}
