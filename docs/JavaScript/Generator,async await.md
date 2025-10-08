# Generator,async await

# Generator从哪来:

![](https://rx2wn2pd1qk.feishu.cn/space/api/box/stream/download/asynccode/?code=NzE5NjU4MTM3ODQ1MzAzYzhiZTAyNjcwNjVjYWY1OWNfUHNxdFJqNzhKdlE1YnJJekdxZmpSemVrbnhiVG0zeUNfVG9rZW46QUd5SGJZSEhpb3VXMnV4SzZOb2Nlb2VHbnhjXzE3NTk4OTcyMzg6MTc1OTkwMDgzOF9WNA)



# Generator的行为

![](https://rx2wn2pd1qk.feishu.cn/space/api/box/stream/download/asynccode/?code=MGExMDEyNWJmY2Y3MDIxODQyZjQ5MTU4YTcyNGNjNDNfWTBPaG9FdnpaeVRrSU92SEJzWmFGYzFHQ3F1WGhvRURfVG9rZW46Sjl0RGIwRTRtb21Jd0N4MHlqOGN0SWI2bnpmXzE3NTk4OTcyMzg6MTc1OTkwMDgzOF9WNA)



总结一下 **Generator（生成器）在调用栈中的行为**，并结合一个例子说明 `yield` 相关语法的作用。

***

## 一、Generator 在堆栈中的行为

1. **调用生成器函数时**

   * 普通函数会立即执行，生成返回值。

   * 生成器函数（带 `yield`）调用时并不会执行函数体，而是返回一个 **生成器对象**。

   * 这个生成器对象内部保存了函数的 **执行上下文**（代码位置、局部变量、调用栈帧等）。

2. **执行到 `yield` 时**

   * 函数挂起（暂停执行），当前调用栈帧保持不动，不会销毁。

   * `yield` 会把一个值返回给调用方。

   * 下次恢复时，继续从 `yield` 之后的语句执行。

3. **恢复执行的方式**

   * **`next(gen)` / `gen.__next__()`**：恢复执行到下一个 `yield`，并返回该 `yield` 的值。

   * **`gen.send(value)`**：不仅恢复执行，还会把 `value` 作为 `yield` 表达式的结果注入生成器内部。

   * **`gen.throw(exc)`**：在挂起的地方抛出异常。

   * **`gen.close()`**：终止生成器，抛出 `GeneratorExit`。

4. **执行完成时**

   * 如果函数执行完毕或者遇到 `return`，会抛出 `StopIteration`，其中携带 `return` 的值。

   * 生成器的栈帧随即销毁。

***

## 二、例子：生成器堆栈的运行过程

```python
def my_gen():
    print("Start generator")
    x = yield 1       # 挂起，返回 1
    print("Received:", x)
    y = yield 2       # 挂起，返回 2
    print("Received:", y)
    return "Done"     # 抛出 StopIteration("Done")

gen = my_gen()        # 1️⃣ 创建生成器对象，还没执行
print(next(gen))      # 2️⃣ 启动执行，直到第一个 yield，返回 1
print(gen.send(10))   # 3️⃣ 向生成器注入 10，继续执行，返回 2
try:
    print(next(gen))  # 4️⃣ 继续执行，遇到 return 抛 StopIteration
except StopIteration as e:
    print("Generator return:", e.value)
```

***

## 三、运行结果 + 栈行为分析

```plain&#x20;text
Start generator
1
Received: 10
2
Received: None
Generator return: Done
```

### 栈行为拆解：

1. **`gen = my_gen()`**

   * 调用 `my_gen`，创建生成器对象。

   * 此时函数体未执行，栈中没有 `my_gen` 的帧。

2. **`next(gen)`**

   * 生成器入栈，执行到 `yield 1` 挂起。

   * 栈帧冻结，保存局部变量 `x`，返回 `1`。

3. **`gen.send(10)`**

   * 恢复栈帧，`x = 10`。

   * 打印 `Received: 10`，然后继续到 `yield 2` 挂起，返回 `2`。

4. **`next(gen)`**

   * 恢复栈帧，此时 `y = None`。

   * 打印 `Received: None`，遇到 `return "Done"`，抛 `StopIteration("Done")`。

   * 栈帧销毁。

***

## 四、总结

* `yield` 会 **挂起执行**，保存当前函数的栈帧。

* `next()` / `send()` 会 **恢复执行**，继续从上次挂起处运行。

* 生成器就是一种 **可控的栈帧冻结/恢复机制**，比一次性调用的普通函数更灵活。

***

# async、await



## 模拟生成



### 核心思想

`async/await` 实际上是 Generator 函数和 Promise 的语法糖。\[[1](https://www.google.com/url?sa=E\&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQE5x6mgso3aB1XtjHoYvdtRR8b8eWEbek63AFdH5G8Y5tZ-xt13gwsPvkuKLODDhFF5fomkNQ0pPmOtP0nJPNHyL_u0gDNYrORTpyjBqAvBcJABWGJ0BF8BVTCK6KwdIQAekQdd4MDIFaAZVyb9vhntZk6P0IASMZj01qWpcr2P5CtHqNcLQ5zJcR5C)]\[[2](https://www.google.com/url?sa=E\&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQGqdBpePwE1hYWWiVJTQRkZX0cnHHIUh9ZAWHNbkbZObWGx8dzfowszQg6WLd18taeyHK27HDNT3Px-qfoHDQ74_f2FABZlPnGvHhvtg0LCu2eSpqf7kkS_07cS0oTpzgIlUERWmVdRHxrYRnQ%3D)]\[[3](https://www.google.com/url?sa=E\&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQFe9ii327zEl7hKUITqFhV5rEHZeUHPGI3YWhDbclJfVNs7meLdBabLJ4c00tXDBDgmjAPUHYaVYLa1ynpBwlDvEby7Vttzu70CGBeYsXqdgdyjvpw5zrO4umL592mVrGuSXFJ9N0kZ8_zL5nuikrJo2VXzDgE%3D)] 它的实现原理可以概括为：

1. **`async` 函数** 对应的是一个 **Generator 函数**。

2. **`await` 关键字** 对应的是 Generator 函数中的 **`yield` 表达式**。

3. 需要一个**自动执行器（Runner）**&#x6765;自动执行 Generator 函数。当遇到 `yield` 后面跟着一个 Promise 时，执行器会等待这个 Promise 完成，然后将 Promise 的结果作为参数传回给 Generator 函数，继续执行下一步。

下面我们将分步实现这个过程。

### 1. 准备一个返回 Promise 的异步函数

首先，我们需要一个模拟异步操作的函数。这里我们用 `setTimeout` 来模拟一个延时任务，它会返回一个 Promise。

```plain&#x20;text
/**
 * 模拟一个异步任务，在指定时间后返回结果
 * @param {any} data - 想要返回的数据
 * @param {number} delay - 延迟的毫秒数
 * @returns {Promise}
 */function fetchUserData(data, delay) {
  return new Promise(resolve => {
    console.log(`开始请求数据: ${data}...`);
    setTimeout(() => {
      console.log(`数据请求完成: ${data}`);
      resolve(data);
    }, delay);
  });
}
```

### 2. 创建 Generator 函数 (我们的 "async" 函数)

接下来，我们创建一个 Generator 函数。它的写法和 `async` 函数非常相似，只是把 `async` 换成了 `function*`，把 `await` 换成了 `yield`。



```plain&#x20;text
// 这是我们想要实现的 "async" 流程
function* main() {
  try {
    console.log("流程开始");

    // "await fetchUserData('用户A', 1000)"
    const userA = yield fetchUserData('用户A', 1000);
    console.log("接收到:", userA);

    // "await fetchUserData('用户B', 500)"
    const userB = yield fetchUserData('用户B', 500);
    console.log("接收到:", userB);

    console.log("流程结束");
    return userA + ' 和 ' + userB;
  } catch (error) {
    console.error("捕获到错误:", error);
  }
}
```

注意，直接调用 `main()` 并不会执行里面的代码，而是返回一个迭代器对象。\[[4](https://www.google.com/url?sa=E\&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQHa45nxRLnAxjERSWKeugprWryT8WVhJdYkAsSDRTeg739bka-8M6_2kueJXqU8ra0yKUR09yRmesRishE3aaXeypWpc0e5FDSGhZ6gq4gvpFQk07FVoHOBURXzMxM8RpEeODW_Ya5iTuPa5QF4dWc2Q7TefCgUpJlvvk-1no2T0OWmzjoTZcC5AbAVsxgI1b7-A5yQiK4CW3CF6XgMVfWDNTl5dlffass%3D)]\[[5](https://www.google.com/url?sa=E\&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQFa4Luu-4yEIc3RNUnMtGVYdKCru-gFJCriX-N3vhOgaX0kAD8KfsyzOqC6rJ151ApjTY6PmxTDIs_FeYFy3WT6z4cMlpIGqF0axbKKf4rn7d0e5f6Frw0xouK60H-8iK5u0Qdxzy84sg%3D%3D)] 我们需要手动调用 `.next()` 方法来逐步执行。

### 3. 实现核心：自动执行器 (Runner)

这是最关键的一步。我们需要一个函数来自动执行上面创建的 Generator 函数。这个执行器会处理 `yield` 出来的 Promise，并在 Promise 完成后自动调用 `.next()` 将结果传回去。\[[6](https://www.google.com/url?sa=E\&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQH3n9DYgiEdUlkbe7XQp6cmmO_JN_M97RkHjgnG6Gbeu_QCKrKX-PBS27bEu64Q7DjIOG04GeB0kCAxsV6LCmC6_1eV8XWvI5MK0t2NbfqqU3IaRxgFe7QmFs-NzzZQ4Uv9C4sXZG4QzkQS9tAga6mshg%3D%3D)]\[[7](https://www.google.com/url?sa=E\&q=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fgrounding-api-redirect%2FAUZIYQF4_XSxbCJWSM4lmXuuxtcbv6-V-RBuKGQUMPRmm9pT6ASit9-scVXWzplE8wAIDf7PCmbUNJQc8Z1UgoeW_PlGtlqweh9dnZ6dnzpITg8IItOswg7s0MN5_E13KXhEOPt7RqlA5AdljeRmznUDZSTRFMQXiMlc7m2mOJ9u_UbdBpFoQmIoU0sg1eYFHDmUz8E32EV2l8ww_5yir5Oa82OZVRlHy3--900ZP9Jn5v7L_CXBjg_W3EMUhPt8JCQLhIXjvR9cg1r3Y6QWLmGXjY0XyyFcpG3Kz-dMT9aX10Mp)]

```javascript
/**
 * 简易的 async/await 执行器
 * @param {GeneratorFunction} generatorFunc - 一个 Generator 函数
 */
 function asyncRunner(generatorFunc) {
  // 1. 调用 Generator 函数，获取迭代器
  const iterator = generatorFunc();

  // 2. 返回一个新的 Promise，因为整个 async 函数本身就是返回一个 Promise
  return new Promise((resolve, reject) => {
    // 3. 定义一个递归函数来处理每一步
    function step(nextResult) {
      let result;
      try {
        // 4. 从迭代器获取下一步的结果 { value, done }
        result = iterator.next(nextResult);
      } catch (error) {
        // 如果 Generator 内部出错，直接 reject
        return reject(error);
      }

      const { value, done } = result;

      // 5. 检查 Generator 是否已经执行完毕
      if (done) {
        // 如果完成，就用最终的返回值 
        resolve Promise
        return resolve(value);
      }

      // 6. 如果 value 不是 Promise，将其包装成 Promise
      // 这样可以统一处理，`await` 后面可以跟任何值
      Promise.resolve(value)
        .then(res => {
          // 7. 当 Promise 成功时，递归调用 step，并将结果传回 Generator
          step(res);
        })
        .catch(err => {
          // 8. 如果 Promise 失败，调用 iterator.throw() 将错误抛入 Generator// 这样 Generator 内部的 try...catch 就能捕获到try {
            iterator.throw(err);
          } catch (error) {
            reject(error);
          }
        });
    }

    // 第一次启动执行器
    step();
  });
}
```

### 4. 整合并运行

现在，我们将所有部分组合起来，使用我们的 `asyncRunner` 来运行 `main` 这个 Generator 函数。

```plain&#x20;text
// 运行我们的 "async" 函数
asyncRunner(main).then(finalResult => {
  console.log("Runner 完成，最终结果:", finalResult);
});
```

### 完整代码示例

```javascript
// 1. 异步任务
function fetchUserData(data, delay) {
  return new Promise(resolve => {
    console.log(`开始请求数据: ${data}...`);
    setTimeout(() => {
      console.log(`数据请求完成: ${data}`);
      resolve(data);
    }, delay);
  });
}

// 2. "async" 函数 (用 Generator 实现)
function* main() {
  try {
    console.log("流程开始");
    const userA = yield fetchUserData('用户A', 1000);
    console.log("接收到:", userA);
    const userB = yield fetchUserData('用户B', 500);
    console.log("接收到:", userB);
    console.log("流程结束");
    return userA + ' 和 ' + userB;
  } catch (error) {
    console.error("捕获到错误:", error);
  }
}

// 3. 核心执行器
function asyncRunner(generatorFunc) {
  const iterator = generatorFunc();

  return new Promise((resolve, reject) => {
    function step(nextResult) {
      let result;
      try {
        result = iterator.next(nextResult);
      } catch (error) {
        return reject(error);
      }
      
      const { value, done } = result;

      if (done) {
        return resolve(value);
      }

      Promise.resolve(value)
        .then(res => {
          step(res);
        })
        .catch(err => {
          try {
             iterator.throw(err);
          } catch(e) {
             reject(e);
          }
        });
    }
    step();
  });
}

// 4. 运行
asyncRunner(main).then(finalResult => {
  console.log("Runner 完成，最终结果:", finalResult);
});

/*
预期输出:
流程开始
开始请求数据: 用户A...
(等待 1 秒)
数据请求完成: 用户A
接收到: 用户A
开始请求数据: 用户B...
(等待 0.5 秒)
数据请求完成: 用户B
接收到: 用户B
流程结束
Runner 完成，最终结果: 用户A 和 用户B
*/
```



### 语法参考



`step` 这个函数的作用就是：

* 执行一次 generator，拿到 `yield` 出来的 Promise；

* 等这个 Promise 完成后，再次调用 `step`（递归），把结果传回 generator；

* 如此循环，直到 generator 执行完毕。



在 JavaScript 里，**迭代器协议（Iterator Protocol）** 规定：

* 每次调用 `next()`，都会返回一个对象，格式固定为：

`{ value: any, done: boolean }`

* `value`：当前 `yield` 表达式产出的值（或最终 `return` 的值）。

* `done`：布尔值，表示是否执行完毕。



`done` 的语义

* `done: false` → 说明 **还没结束**，后面可能还有更多 `yield`。

* `done: true` → 说明 **生成器函数已经运行到结尾**（遇到 `return` 或执行完最后一行），不会再 `yield` 新值了。



## 对比



下面是两段功能完全等价的代码。左边是我们手动实现的，右边是使用原生 `async/await` 语法糖的。



### 我们手动实现的 (Generator + Runner)

```plain&#x20;text
// "async" 函数用 Generator 定义
function* main() {
  console.log("流程开始");
  
  // "await" 用 yield 实现
  const userA = yield fetchUserData('用户A', 1000);
  console.log("接收到:", userA);
  
  const userB = yield fetchUserData('用户B', 500);
  console.log("接收到:", userB);
  
  console.log("流程结束");
  return userA + ' 和 ' + userB;
}

// 需要一个“执行器”来启动和管理流程
asyncRunner(main).then(result => {
  console.log("最终结果:", result);
});
```



### 原生语法糖 (`async/await`)

```plain&#x20;text
// async 关键字直接定义异步函数
async function main() {
  console.log("流程开始");
  
  // await 关键字直接等待 Promiseconst userA = await fetchUserData('用户A', 1000);
  console.log("接收到:", userA);
  
  const userB = await fetchUserData('用户B', 500);
  console.log("接收到:", userB);
  
  console.log("流程结束");
  return userA + ' 和 ' + userB;
}

// async 函数本身返回一个 Promise，直接调用即可
main().then(result => {
  console.log("最终结果:", result);
});
```





## EventLoop中的行为



`async/await` 的本质（也就是我们 `asyncRunner` 所模拟的）就是这样一个**利用 Event Loop 进行的“接力跑”**：

* **`await` (yield)**: 交出执行权，暂停执行，等待一个异步任务。

* **异步任务 (setTimeout/fetch)**: 在后台执行，完成后将一个**宏任务**（如`setTimeout`回调）或**微任务**（如`fetch`成功后）放入相应的队列。

* **Promise 的 `.then`**: 异步任务完成后，通过 `resolve` 将真正处理结果的 `step` 函数作为一个**微任务**放入队列。

* **Event Loop**: 调度这一切。它先执行高优先级的微任务（即我们的 `step` 函数），在 `step` 中唤醒 Generator 并启动下一个异步任务，然后再次暂停。如此循环，直到 Generator 执行完毕。



## 总结



* JS引擎内置asnycRunner的解释器

* asnycRunner的作用

  * 将async标记的函数解释为一个Generator函数

  * 将await的部分对应的使用yield来处理

  * 对这个Generator进行tongt

* asyncRunner的流程

  * 传入main函数，首先执行main函数并拿到generator返回的iterator

  * callstack同步的执行main函数

  * 遇到yield异步操作

    1. **暂停与交出 (Generator -> `asyncRunner`)**

       * `fetchUserData` 函数被调用，它立即返回一个处于 *pending* 状态的 Promise。

       * `yield` 关键字执行。它的核心作用有两个：

         1. **暂停** `main` 函数的执行。`main` 函数的所有状态（包括局部变量）都被冻结了。

         2. **交出** `yield` 右侧的值（那个 pending 状态的 Promise）给外部。

       * 此时，**调用栈 (Call Stack) 中的 `main` 函数被弹出**，控制权立即返回到了 `iterator.next()` 被调用的地方，也就是我们的 `asyncRunner` 函数内部。

    2. **调度与等待 (`asyncRunner` -> Event Loop)**

       * `asyncRunner` 现在拿到了那个 Promise。

       * 它做的最关键的一件事就是调用 `.then()`: `Promise.resolve(value).then(res => { step(res); })`。

       * 这个 `.then()` 操作并不是立即执行回调，而是向 **微任务队列 (Microtask Queue)** 注册了一个回调函数。这相当于 `asyncRunner` 对 Event Loop 说：“嘿，我这里有个任务（`step`函数），请在这个 Promise 完成时，把它放进微任务队列里准备执行。”

       * `asyncRunner` 的同步代码执行完毕，也从调用栈中弹出。此刻，**调用栈变空了**。

    3. **唤醒与恢复 (Event Loop -> Generator)**

       * 现在，主线程空闲了，Event Loop 开始工作。它就在后台等待，直到 `fetchUserData` 里的 `setTimeout` 完成。

       * 当 `setTimeout` 的回调执行 `resolve()` 时，它会把之前在 `.then()` 中注册的那个回调函数（也就是 `step` 函数）正式放入微任务队列。

       * Event Loop 检测到调用栈为空，并且微任务队列中有任务。它立即取出 `step` 函数，将其压入**调用栈**并执行。

       * `step` 函数内部调用 `iterator.next(result)`，这里的 `result` 就是 Promise 完成后的值（例如 '用户A'）。

       * `iterator.next(result)` 会做两件事：

         1. **恢复** `main` 函数的执行，回到它上次暂停的地方。

         2. 将传入的 `result` 作为 `yield` 表达式的最终结果，赋值给 `const userA`。

  * 至此，`main` 函数拿到了异步操作的结果，仿佛是同步等待得到的一样，然后继续往下执行，直到遇到下一个 `yield` 或者 `return`。



1. **启动调用：`step()`**

   * 在 `asyncRunner` 的最后，我们调用了 `step()`，没有传递任何参数。

   * 在 `step` 函数内部，`nextResult` 的值是 `undefined`。

   * 执行 `iterator.next(nextResult)`，也就是 `iterator.next(undefined)`。

   * `main` 函数开始执行，打印 "流程开始"，然后遇到第一个 `yield fetchUserData(...)`。

   * 它返回一个 Promise，`main` 函数在此暂停。

2. **后续调用：`step(res)`**

   * 当第一个 Promise 完成后（比如值为 `'用户A'`），`.then` 回调被触发。

   * 这时，我们调用 `step('用户A')`。

   * 在 `step` 函数内部，`nextResult` 的值是 `'用户A'`。

   * 执行 `iterator.next(nextResult)`，也就是 `iterator.next('用户A')`。

   * `main` 函数从上次暂停的 `yield` 处恢复，并将 `'用户A'` 这个值作为 `yield` 表达式的结果，赋值给 `const userA`。

   * 流程继续，直到遇到下一个 `yield`。



* **`yield` 实现了暂停，将调用栈的控制权暂时交还给了 `asyncRunner`。**

* **`asyncRunner` 利用 Promise 的 `.then` 方法向 Event Loop 的微任务队列中“预约”了一个未来的任务。**

* **因为控制权在asyncRunner，而asyncRunner中.then()，已经没有同步代码，所以只能等待异步操作了**

* **当异步操作完成，会向step中传入结果**

* **Event Loop 就会执行这个微任务，微任务再通过迭代器的 `.next()` 方法将控制权交还给 Generator 函数并传入结果，从而实现了对异步操作的“等待”。**

* 流程继续，直到遇到下一个 `yield`

