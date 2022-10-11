import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CircularProgressWithLabel from '../CircularProgressWithLabel'

interface Props {
  name: string
  goal: number
  progress: number
  unit: string
}

export default function NutritionPercentageCard(props: Props) {
  const calculateProgress = () => (props.progress / props.goal) * 100

  return (
    <Card sx={{ maxWidth: '20%', position: 'relative' }}>
      <CardContent>
        <Typography>
          {props.name}: {props.progress} {props.unit}
        </Typography>
        <CircularProgressWithLabel value={calculateProgress()} />
      </CardContent>
    </Card>
  )
}
