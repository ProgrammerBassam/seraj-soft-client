
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid/themeAugmentation';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { Route, Routes } from 'react-router';
import { Checking } from './components/Checking/Checking';
import { DraggableTopBar } from './components/Dashboard';
import { Dashboard } from './pages/Dashboard';
import { Home } from './components/Home/Home';
import { WhatsApp } from './components/Whatsapp/Whatsapp';
import { Sms } from './components/Sms/Sms';
import { Block } from './components/Block/Block';
import { Users } from './components/Users/Users';

function App() {
  return (
    <>
      <DraggableTopBar />
      <Routes>
        <Route path="/" element={<Checking />} />
        <Route path="/blocked" element={<Block />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} /> {/* Dashboard Home */}
          <Route path="messages">
            <Route path="whatsapp" element={<WhatsApp />} />
            <Route path="sms" element={<Sms />} />
            <Route path="reports" element={<div>Reports</div>} />
          </Route>
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/settings" element={<div>Settings Page</div>} />
        <Route path="/about" element={<div>About Us Page</div>} />
        <Route path="/suggestions" element={<div>Suggestions Page</div>} />
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
