# Router

Router 是一个 **根据 URL 显示对应页面（组件）** 的机制。



## **&#x20;为什么需要 Router？**

**原因一：实现单页应用的页面切换**

* 如果没有 Router，SPA 只能靠条件渲染，比如：

* `{currentPage === 'home' && <Home />}
  {currentPage === 'about' && <About />}`

* 但这样用户刷新时，URL 永远是 `/`，不能通过地址栏直接访问 `/about`。

**原因二：用户体验更好**

* 切换页面**无需整页刷新**，只更新局部 → 更快。

* 用户可以使用浏览器的 **前进、后退** 按钮。

**原因三：SEO 和分享需求**

* `https://site.com/products/123` 这样的 URL 直观且可分享。

* 通过 Router，前端可以做到 URL 和页面内容对应。



## 核心理念：路由与渲染的绑定关系

* **传统React (CSR):** 路由（如旧版React Router）和渲染/数据获取是解耦的。路由切换后，在组件的 `useEffect` 中手动触发数据获取，然后更新状态，重新渲染。这种模式简单，但容易导致加载瀑布（loading waterfalls）。

* **现代框架:** 路由系统与数据获取和渲染策略是**深度绑定**的。当一个路由被请求时，框架的路由系统会先在**服务端**执行与该路由关联的数据加载函数（`loader` / Server Component的`async`），拿到数据后再进行渲染（SSR/RSC），最后将结果（HTML或特殊的数据流）发送给客户端。这从根本上解决了加载瀑布问题，并实现了更优的性能和用户体验。





# 渲染策略

***

[渲染策略——HTML到达你浏览器上的所有方法](./渲染策略——HTML到达浏览器的所有方法.md)

NextJS则对应Isomorphic SSR，有复杂和全面的渲染配置

Vite + React Router 对应CSR（传统SPA）

Remix(React Router v7)对应SSR's SPA

Astro对应MPA-influenced split-excution

Tanstack Start仍处于早期



简单的决策，

* **如果你的项目需要一个营销页面（marketing page），即一个静态且SEO友好的首页，同时又需要一个动态的应用程序：选择 Next.js**。

* **如果不需要静态页面，或者可以轻松地将静态内容与应用分离：选择 Vite 和 React Router**。

* Remix正在剧烈变动暂不考虑

* Tanstack Start仍处于早期暂不考虑

* Astro则相比之下较为小众，曾经主要针对静态页面
