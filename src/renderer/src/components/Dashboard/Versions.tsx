import { Theme } from '@emotion/react'
import { Paper, Typography } from '@mui/material'
import '../../assets/index.css'
import packageInfo from '../../../../../package.json';

function Versions(): JSX.Element {


  return (
    <Paper
      elevation={2}
      sx={{
        display: 'inline-block',
        padding: (theme: Theme) => theme.spacing(1, 2),
        borderRadius: 8,
        backgroundColor: (theme: Theme) => theme.palette.primary.dark,
        color: (theme: Theme) => theme.palette.primary.contrastText,
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 600 }}>
        الإصدار {packageInfo.version}
      </Typography>
    </Paper>
  )
}

export default Versions
