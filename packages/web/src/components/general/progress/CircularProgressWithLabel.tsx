import * as React from 'react'
import CircularProgress, {
  CircularProgressProps
} from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number, fontSize: string }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        color={props.value > 100 ? 'error' : 'primary'}
        {...props}
        value={Math.min(100, props.value)}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
          fontSize={props.fontSize}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}
