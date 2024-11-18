import { alpha, Box, Stack } from "@mui/material";
import AppNavbar from "@renderer/components/Dashboard/AppNavbar";
import Header from "@renderer/components/Dashboard/Header";
import SideMenu from "@renderer/components/Dashboard/SideMenu";

export function Dashboard() {
    return (
        <>
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