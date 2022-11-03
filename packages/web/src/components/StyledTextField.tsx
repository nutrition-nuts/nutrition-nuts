import { styled, TextField } from '@mui/material'

export default styled(TextField)({
  '& label': {
    color: 'white'
  },
  '& label.Mui-focused': {
    color: 'white'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#617c93 !important'
    },
    '&:hover fieldset': {
      borderColor: '#617c93 !important'
    }
  },
  '& .MuiSvgIcon-root': {
    color: 'white'
  }
})
