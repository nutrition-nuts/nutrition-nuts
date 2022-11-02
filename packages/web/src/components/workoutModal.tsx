import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { WorkoutModel } from '../models/workoutModels'

interface Props {
  open: boolean
  handleClose: () => void
  workout: WorkoutModel
}

export default function WorkoutModal(props: Props) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: '#2a2a2b',
    color: 'white',
    border: '2px solid #506f8c',
    borderRadius: '10px',
    overflow: 'auto',
    height: '80%',
    boxShadow: 24,
    p: 4
  }

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <Box sx={{ fontWeight: 'bold' }}>{props.workout.name}</Box>
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, textTransform: 'capitalize' }}
        >
          {props.workout.category} Workout
        </Typography>
        {props.workout.youtubeID != null && (
          <iframe
            src={'https://www.youtube.com/embed/' + props.workout.youtubeID}
            title="YouTube video player"
            frameBorder="0"
            className="youtubeEmbed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        <h4>Instructions:</h4>
        <ol>
          {props.workout.instructions.map((instruction) => {
            return <li key={instruction}>{instruction}</li>
          })}
        </ol>
        <h4>Primary Muscles:</h4>
        <ul>
          {props.workout.primaryMuscles.map((muscle) => {
            return (
              <li style={{ textTransform: 'capitalize' }} key={muscle}>
                {muscle}
              </li>
            )
          })}
        </ul>
        {props.workout.secondaryMuscles.length !== 0 && (
          <div>
            <h4>Secondary Muscles:</h4>
            <ul>
              {props.workout.secondaryMuscles.map((muscle) => {
                return (
                  <li style={{ textTransform: 'capitalize' }} key={muscle}>
                    {muscle}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </Box>
    </Modal>
  )
}
