
import * as React from 'react';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
//import AppTheme from './components/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './components/theme';
import { Content, DraggableTopBar, RootLayout, Sidebar } from './components';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function App() {
  return (
    <>
      <DraggableTopBar />
      <Box sx={{ display: 'flex' }}>
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

          </Stack>
        </Box>
      </Box>
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
