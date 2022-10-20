import {
  Box,
  Grid,
  LinearProgress,
  LinearProgressProps,
  Typography
} from '@mui/material'

export default function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; label: string }
) {
  return (
    <>
      <Box sx={{ marginTop: '0.5rem' }}>
        <Grid container>
          <Grid item xs={8}>
            {props.label}
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'right' }}>
            {props.value}%
          </Grid>
        </Grid>
        <Typography></Typography>
        <LinearProgress
          variant="determinate"
          color={props.value > 100 ? 'error' : 'primary'}
          {...props}
        />
      </Box>
    </>
  )
}
