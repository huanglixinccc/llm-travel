import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
// @ts-ignore
import { Provider } from 'react-redux'
import store from '@/store'

import 'animate.css'
import './app.less'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return (
    <Provider store={store}>{children}</Provider>
  )
}
  


export default App
