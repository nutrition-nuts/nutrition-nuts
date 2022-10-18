import { styled, TextField } from '@mui/material'

export default styled(TextField)({
  '& label.Mui-focused': {
    color: '#506f8c'
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#506f8c'
    }
  }
})
