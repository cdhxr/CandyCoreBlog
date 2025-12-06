import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { Button } from '@site/src/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@site/src/components/ui/card';
import { BookOpen, Lightbulb, Pencil, ArrowRight, Github } from 'lucide-react';

function HeroSection() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-24">
      {/* 背景装饰 - 使用静态渐变代替模糊效果 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5" />
      </div>
      
      <div className="mx-auto max-w-4xl text-center">
        {/* 标签 */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          欢迎来到我的数字花园 🌱
        </div>

        {/* 主标题 */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {siteConfig.title}
        </h1>

        {/* 副标题 */}
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          记录技术成长、分享生活感悟、探索思维边界
        </p>

        {/* 按钮组 */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/docs/intro">
              开始阅读
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="https://github.com/cdhxr/CandyCoreBlog">
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </Button>
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
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            探索内容
          </h2>
          <p className="text-muted-foreground">
            这里有技术、有思考、有生活
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="group relative overflow-hidden transition-shadow duration-200 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="gap-2 p-0 hover:bg-transparent hover:text-primary">
                  <Link to={feature.link}>
                    {feature.linkText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
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
