import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { BookOpen, Lightbulb, Pencil, ArrowRight } from 'lucide-react';

function HeroSection() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-start text-left">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6 leading-tight">
              {siteConfig.title}
              <br />
              <span className="text-muted-foreground text-3xl sm:text-4xl font-normal">
                Digital Garden
              </span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl mb-10 max-w-lg leading-relaxed">
              记录技术成长、分享生活感悟、探索思维边界。
              <br />
              这里是我的数字花园，欢迎光临。
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/docs/intro" className="group inline-flex items-center text-base font-medium">
                <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <ArrowRight className="h-4 w-4" />
                </span>
                开始阅读
              </Link>
              <Link to="/thoughts/intro" className="group inline-flex items-center text-base font-medium">
                <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform group-hover:scale-110">
                  <ArrowRight className="h-4 w-4" />
                </span>
                随想杂记
              </Link>
            </div>
          </div>

          {/* Right Image Grid - Collage Style */}
          <div className="relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-8">
                   <div className="aspect-3/4 w-full overflow-hidden rounded-2xl bg-muted">
                      <img src="/img/undraw_docusaurus_mountain.svg" alt="Collage 1" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
                   </div>
                   <div className="aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted">
                      <img src="/img/undraw_docusaurus_react.svg" alt="Collage 2" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted">
                      <img src="/img/undraw_docusaurus_tree.svg" alt="Collage 3" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
                   </div>
                   <div className="aspect-3/4 w-full overflow-hidden rounded-2xl bg-muted">
                      <img src="/img/docusaurus-social-card.jpg" alt="Collage 4" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: BookOpen,
    title: '技术文档',
    description: '深入浅出的技术笔记，涵盖前端开发、编程语言等领域的学习心得。',
    link: '/docs/intro',
    linkText: '查看文档',
  },
  {
    icon: Lightbulb,
    title: '随想杂记',
    description: '关于技术、生活和成长的思考，记录灵感闪现的瞬间。',
    link: '/thoughts/intro',
    linkText: '浏览随想',
  },
  {
    icon: Pencil,
    title: '生活记录',
    description: '日常生活的点滴记录，分享生活中的美好与感悟。',
    link: '/life',
    linkText: '阅读博客',
  },
];

function FeaturesSection() {
  return (
    <section className="px-6 py-20 lg:px-12 border-t border-border/50">
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
                  <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-muted mb-4">
                    <div className="h-full w-full flex items-center justify-center bg-muted/50 group-hover:bg-muted transition-colors">
                       <feature.icon className="h-12 w-12 text-muted-foreground/50 group-hover:text-primary transition-colors" />
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
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
          <blockquote className="text-xl font-medium italic text-foreground sm:text-2xl">
            "学而不思则罔，思而不学则殆。"
          </blockquote>
          <p className="mt-4 text-muted-foreground">
            — 《论语·为政》
          </p>
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
      </main>
    </Layout>
  );
}
