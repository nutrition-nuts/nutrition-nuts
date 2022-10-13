import { Grid, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CircularProgressWithLabel from '../progress/CircularProgressWithLabel'

interface Props {
  name: string
  goal: number
  progress: number
  unit: string
}

export default function NutritionPercentageCard(props: Props) {
  const calculateProgress = () =>
    Math.floor((props.progress / props.goal) * 100)

  return (
    <Grid item xs={3}>
      <Card sx={{ position: 'relative', textAlign: 'center' }}>
        <CardContent>
          <Typography
            sx={{
              marginBottom: '0.5rem',
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}
          >
            {props.name}: {props.progress} {props.unit}
          </Typography>
          <CircularProgressWithLabel
            value={calculateProgress()}
            fontSize="2rem"
            size="7rem"
          />
        </CardContent>
      </Card>
    </Grid>
  )
}
