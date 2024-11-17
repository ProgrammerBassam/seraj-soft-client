import {

  Content,
  DraggableTopBar,
  RootLayout,
  Sidebar
} from '@/components'
import { useRef } from 'react'

function App() {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2 font-primaryRegular">
          قائمة جانبية
        </Sidebar>

        <Content className="border-l bg-zinc-900/50 border-l-white/20 font-primaryBold">
          المحتوى
        </Content>
      </RootLayout>
    </>
  )
}

export default App
