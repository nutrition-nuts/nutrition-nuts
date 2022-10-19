import { styled, TextField } from '@mui/material'

export default styled(TextField)({
  '& label.Mui-focused': {
    color: 'black'
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'black'
    }
  }
})
