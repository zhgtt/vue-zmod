/**
 * 创建 & 获取上下文的 hooks，用于嵌套组件之间获取数据，也就是不管是父组件，还是子组件，都能共享状态
 */
import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

/**
 * @description: 创建上下文，包含 提供和注入（获取） 两个方法
 * @param contextName - 上下文名称
 */
function createContext<T>(contextName: string) {
  // 使用 Symbol 函数来创建一个唯一的符号（symbol），并用作上下文的键（key）；Symbol 可以保证键的唯一性，防止命名冲突
  const injectKey: InjectionKey<T> = Symbol(contextName)

  // 提供上下文，向子组件提供数据
  function useProvide(context: T) {
    provide(injectKey, context)

    return context
  }

  // 获取上下文
  function useInject() {
    return inject(injectKey) as T
  }

  return { useProvide, useInject }
}

/**
 * @description: 使用上下文的 hooks
 * @param contextName - 上下文名称
 * @param fn - 上下文函数，返回上下文对象
 */
export default function useContext<T extends (...args: any[]) => any>(contextName: string, fn: T) {
  // 定义一个类型，它代表 函数 fn 的返回值类型
  type Context = ReturnType<T>

  const { useProvide, useInject: useStore } = createContext<Context>(contextName)

  function setupStore(...args: Parameters<T>) {
    const context: Context = fn(...args)
    return useProvide(context)
  }

  return {
    /** 在父组件使用 & 提供数据 */
    setupStore,
    /** 在子组件使用 & 获取数据 */
    useStore,
  }
}
