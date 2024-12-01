
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid/themeAugmentation';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { Route, Routes } from 'react-router';
import { Checking } from './components/Checking/Checking';
import { DraggableTopBar } from './components/Dashboard';
import { Dashboard } from './pages/Dashboard';
import { Home } from './components/Home/Home';

function App() {
  return (
    <>
      <DraggableTopBar />
      <Routes>
        <Route path="/" element={<Checking />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} /> {/* Default child (e.g., Dashboard Home) */}
        </Route>
      </Routes>
    </>
  );
}

/**
 *   <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
      
<Box
  component="main"
  sx={(theme) => ({
    flexGrow: 1,
    backgroundColor: alpha(theme.palette.background.default, 1),
    overflow: 'auto',
  })}
>
  <Stack
    spacing={2}
    sx={{
      alignItems: 'center',
      mx: 3,
      pb: 5,
      mt: { xs: 8, md: 0 },
    }}
  >
    <Header />
    <MainGrid />
  </Stack>
</Box>
      </Box >
 */

export default App

/*import {

  Content,
  DraggableTopBar,
  RootLayout,
  Sidebar
} from '@/components'
import { useRef } from 'react'

function App() {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          Sidebar
        </Sidebar>

        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          ئخرفثر
        </Content>
      </RootLayout>
    </>
  )
}

export default App*/
